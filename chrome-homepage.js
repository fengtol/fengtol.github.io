const CLIENT_ID = 'Ov23lifw4crbtBHZ1ZMH';
const REDIRECT_URI = window.location.origin + '/callback.html';
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_EXCHANGE_URL = '/exchange-token'; // 改为你的 Cloudflare Pages 后端路径，例如 /api/exchange-token
const SCOPES = ['read:user', 'user:email', 'repo'];
const GITHUB_REPO_OWNER = 'fengtol';
const GITHUB_REPO_NAME = 'fengtol.github.io';
const GITHUB_REPO = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
const ISSUE_TITLE = 'Chrome Homepage Shortcuts';
const STORAGE_ENGINE_KEY = 'chrome_homepage_search_engine';
const STORAGE_HISTORY_KEY = 'chrome_homepage_visit_history';
const STORAGE_SHORTCUTS_KEY = 'chrome_homepage_shortcuts';
const STORAGE_ISSUE_NUMBER_KEY = 'chrome_homepage_issue_number';
const STORAGE_GITHUB_TOKEN_KEY = 'chrome_homepage_github_token';
const GITHUB_API_BASE = 'https://api.github.com';

const SEARCH_ENGINES = [
    { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
    { id: 'bing', name: 'Bing', url: 'https://cn.bing.com/search?q=' },
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' },
    { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' }
];

const DEFAULT_SHORTCUTS = [
    { title: 'Google', url: 'https://www.google.com', description: '全球最常用搜索引擎' },
    { title: 'GitHub', url: 'https://github.com', description: '开源代码托管与社区' },
    { title: 'YouTube', url: 'https://www.youtube.com', description: '视频与娱乐' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com', description: '开发者问答社区' },
    { title: '腾讯会议', url: 'https://meeting.tencent.com', description: '在线会议工具' },
    { title: 'Notion', url: 'https://www.notion.so', description: '笔记与知识管理' },
    { title: 'Google Drive', url: 'https://drive.google.com', description: '云端文件存储' },
    { title: 'Gmail', url: 'https://mail.google.com', description: '电子邮件服务' }
];

let currentShortcuts = [];

function loadShortcuts() {
    const raw = localStorage.getItem(STORAGE_SHORTCUTS_KEY);
    if (!raw) return [...DEFAULT_SHORTCUTS];
    try {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length) return data;
    } catch {
    }
    return [...DEFAULT_SHORTCUTS];
}

function saveShortcuts(shortcuts) {
    currentShortcuts = shortcuts;
    localStorage.setItem(STORAGE_SHORTCUTS_KEY, JSON.stringify(shortcuts));
}

function getShortcuts() {
    if (!currentShortcuts.length) currentShortcuts = loadShortcuts();
    return currentShortcuts;
}

function getStoredSearchEngine() {
    const saved = localStorage.getItem(STORAGE_ENGINE_KEY);
    return SEARCH_ENGINES.find(engine => engine.id === saved) || SEARCH_ENGINES[0];
}

function setStoredSearchEngine(id) {
    const engine = SEARCH_ENGINES.find(item => item.id === id);
    if (engine) {
        localStorage.setItem(STORAGE_ENGINE_KEY, engine.id);
        renderSearchEngineSelector();
    }
}

function getVisitHistory() {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveVisitHistory(history) {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function recordVisit(url, title) {
    const history = getVisitHistory();
    const normalizedUrl = url.replace(/#.*$/, '');
    const existing = history.find(item => item.url === normalizedUrl);

    const now = new Date().toISOString();
    if (existing) {
        existing.count += 1;
        existing.lastVisited = now;
    } else {
        history.push({
            title: title || normalizedUrl,
            url: normalizedUrl,
            count: 1,
            lastVisited: now
        });
    }

    const sorted = history.sort((a, b) => b.count - a.count || new Date(b.lastVisited) - new Date(a.lastVisited));
    saveVisitHistory(sorted);
    renderHistoryCards();
}

function renderSearchEngineSelector() {
    const container = document.getElementById('searchEngineSelector');
    const engine = getStoredSearchEngine();
    container.innerHTML = `
        <span class="search-engine-selected">${engine.name}</span>
        <span class="search-engine-arrow">▾</span>
        <div class="search-engine-dropdown" id="searchEngineDropdown" style="display:none;">
            ${SEARCH_ENGINES.map(item => `
                <div class="search-engine-option" data-engine="${item.id}">${item.name}</div>
            `).join('')}
        </div>
    `;

    const dropdown = container.querySelector('.search-engine-dropdown');
    const options = container.querySelectorAll('.search-engine-option');

    container.addEventListener('click', event => {
        event.stopPropagation();
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', event => {
            event.stopPropagation();
            setStoredSearchEngine(option.dataset.engine);
            if (dropdown) dropdown.style.display = 'none';
        });
    });

    updateSearchPlaceholder();
}
function getSearchSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    const shortcuts = getShortcuts().map(item => ({
        title: item.title,
        url: item.url,
        description: item.description || '快捷网站'
    }));
    const history = getVisitHistory().map(item => ({
        title: item.title,
        url: item.url,
        description: `${item.count} 次访问`
    }));

    const combined = [...shortcuts, ...history];
    const filtered = combined.filter(item => {
        if (!query) return true;
        return item.title.toLowerCase().includes(lowerQuery) || item.url.toLowerCase().includes(lowerQuery);
    });

    return filtered.slice(0, MAX_SEARCH_SUGGESTIONS);
}

function renderSearchSuggestions(query) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;

    const suggestions = getSearchSuggestions(query);
    activeSuggestions = suggestions;
    currentSuggestionIndex = -1;

    if (!suggestions.length) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="suggestion-header">匹配到 ${suggestions.length} 条推荐结果，使用 ↑↓ 选择，回车打开。</div>
        ${suggestions.map((item, index) => `
            <div class="search-suggestion-item" data-index="${index}" tabindex="0">
                <div>
                    <strong>${item.title}</strong>
                    <div class="search-suggestion-meta">${item.description}</div>
                </div>
                <span class="search-suggestion-meta">${item.url}</span>
            </div>
        `).join('')}
    `;

    container.querySelectorAll('.search-suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = Number(item.dataset.index);
            selectSearchSuggestion(index);
        });
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const index = Number(item.dataset.index);
                selectSearchSuggestion(index);
            }
        });
    });
}

function hideSearchSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    container.style.display = 'none';
}

function selectSearchSuggestion(index) {
    const suggestion = activeSuggestions[index];
    if (!suggestion) return;
    recordVisit(suggestion.url, suggestion.title);
    window.open(suggestion.url, '_blank');
}

function highlightSuggestion(index) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    const items = container.querySelectorAll('.search-suggestion-item');
    items.forEach((item, itemIndex) => {
        item.classList.toggle('active', itemIndex === index);
    });
}
function updateSearchPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const engine = getStoredSearchEngine();
    searchInput.placeholder = `搜索或输入网址 · ${engine.name} · 按 Ctrl+K 或 / 聚焦`;
}

function getSearchSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    const shortcuts = getShortcuts().map(item => ({
        title: item.title,
        url: item.url,
        description: item.description || '快捷网站'
    }));
    const history = getVisitHistory().map(item => ({
        title: item.title,
        url: item.url,
        description: `${item.count} 次访问`
    }));

    const combined = [...shortcuts, ...history];
    const filtered = combined.filter(item => {
        if (!query) return true;
        return item.title.toLowerCase().includes(lowerQuery) || item.url.toLowerCase().includes(lowerQuery);
    });

    return filtered.slice(0, MAX_SEARCH_SUGGESTIONS);
}

function renderSearchSuggestions(query) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;

    const suggestions = getSearchSuggestions(query);
    activeSuggestions = suggestions;
    currentSuggestionIndex = -1;

    if (!suggestions.length) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="suggestion-header">匹配到 ${suggestions.length} 条推荐结果，使用 ↑↓ 选择，回车打开。</div>
        ${suggestions.map((item, index) => `
            <div class="search-suggestion-item" data-index="${index}" tabindex="0">
                <div>
                    <strong>${item.title}</strong>
                    <div class="search-suggestion-meta">${item.description}</div>
                </div>
                <span class="search-suggestion-meta">${item.url}</span>
            </div>
        `).join('')}
    `;

    container.querySelectorAll('.search-suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = Number(item.dataset.index);
            selectSearchSuggestion(index);
        });
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const index = Number(item.dataset.index);
                selectSearchSuggestion(index);
            }
        });
    });
}

function hideSearchSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    container.style.display = 'none';
}

function selectSearchSuggestion(index) {
    const suggestion = activeSuggestions[index];
    if (!suggestion) return;
    recordVisit(suggestion.url, suggestion.title);
    window.open(suggestion.url, '_blank');
}

function highlightSuggestion(index) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    const items = container.querySelectorAll('.search-suggestion-item');
    items.forEach((item, itemIndex) => {
        item.classList.toggle('active', itemIndex === index);
    });
}

function renderShortcuts() {
    const grid = document.getElementById('shortcutGrid');
    const shortcuts = getShortcuts();
    grid.innerHTML = shortcuts.map(link => `
        <div class="shortcut-card">
            <a href="${link.url}" target="_blank" rel="noreferrer" data-title="${link.title}">${link.title}</a>
            <p>${link.description}</p>
        </div>
    `).join('');
    grid.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', event => {
            recordVisit(anchor.href, anchor.dataset.title || anchor.textContent);
        });
    });
}

function renderShortcutEditor() {
    const container = document.getElementById('shortcutEditor');
    const shortcuts = getShortcuts();
    container.innerHTML = `
        <div class="editor-actions">
            <button class="secondary-btn" id="addShortcutEntryButton" type="button">新增一项</button>
            <button class="primary-btn" id="saveShortcutChangesButton" type="button">保存修改</button>
            <button class="secondary-btn" id="cancelShortcutEditButton" type="button">关闭编辑</button>
        </div>
        <div class="editor-list">
            ${shortcuts.map((item, index) => `
                <div class="shortcut-editor-item" data-index="${index}">
                    <div class="editor-field">
                        <label>名称</label>
                        <input class="editor-input-title" type="text" value="${item.title}" placeholder="网站名称">
                    </div>
                    <div class="editor-field">
                        <label>链接</label>
                        <input class="editor-input-url" type="text" value="${item.url}" placeholder="https://example.com">
                    </div>
                    <div class="editor-field">
                        <label>说明</label>
                        <input class="editor-input-desc" type="text" value="${item.description}" placeholder="简短说明">
                    </div>
                    <button class="delete-btn" type="button" data-index="${index}">删除</button>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('addShortcutEntryButton').addEventListener('click', () => {
        currentShortcuts.push({ title: '', url: '', description: '' });
        renderShortcutEditor();
    });
    document.getElementById('saveShortcutChangesButton').addEventListener('click', saveShortcutChanges);
    document.getElementById('cancelShortcutEditButton').addEventListener('click', hideShortcutEditor);
    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = Number(btn.dataset.index);
            currentShortcuts.splice(index, 1);
            renderShortcutEditor();
        });
    });
}

function saveShortcutChanges() {
    const editorItems = document.querySelectorAll('.shortcut-editor-item');
    const updated = [];

    editorItems.forEach(item => {
        const title = item.querySelector('.editor-input-title').value.trim();
        const url = item.querySelector('.editor-input-url').value.trim();
        const description = item.querySelector('.editor-input-desc').value.trim();
        if (!title || !url) return;
        updated.push({ title, url, description });
    });

    if (!updated.length) {
        alert('请至少保留一条有效常用网站。');
        return;
    }

    saveShortcuts(updated);
    renderShortcuts();
    hideShortcutEditor();
}

function hideShortcutEditor() {
    const container = document.getElementById('shortcutEditor');
    container.style.display = 'none';
}

function showShortcutEditor() {
    const container = document.getElementById('shortcutEditor');
    container.style.display = 'block';
    renderShortcutEditor();
}

// GitHub Issue 同步相关函数
function getIssueNumber() {
    return localStorage.getItem(STORAGE_ISSUE_NUMBER_KEY);
}

function setIssueNumber(issueNumber) {
    localStorage.setItem(STORAGE_ISSUE_NUMBER_KEY, issueNumber);
}

async function githubApiRequest(endpoint, options = {}) {
    const token = await getAccessToken();
    if (!token) {
        throw new Error('未获取到 GitHub Access Token，请先完成 GitHub 登录');
    }

    const url = `${GITHUB_API_BASE}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: '未知错误' }));
        throw new Error(`GitHub API 错误: ${response.status} ${error.message}`);
    }

    return response.json();
}

async function getAccessToken() {
    // 先检查是否已存储 token
    const storedToken = localStorage.getItem(STORAGE_GITHUB_TOKEN_KEY);
    if (storedToken) {
        return storedToken;
    }

    // 检查 URL 中是否有授权码
    const params = parseQueryParams();
    if (params.code) {
        try {
            // 调用 Cloudflare Pages Function 进行 token 交换
            const response = await fetch(TOKEN_EXCHANGE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: params.code,
                    client_id: CLIENT_ID,
                    redirect_uri: REDIRECT_URI
                })
            });

            const data = await response.json();
            if (data.access_token) {
                // 存储 token 并清理 URL
                localStorage.setItem(STORAGE_GITHUB_TOKEN_KEY, data.access_token);
                window.history.replaceState({}, document.title, window.location.pathname);
                return data.access_token;
            } else {
                alert('获取访问令牌失败：' + (data.error_description || data.error || '未知错误'));
            }
        } catch (error) {
            console.error('Token exchange failed:', error);
            alert('获取访问令牌时发生错误：' + error.message);
        }
    }

    return null;
}

async function syncShortcutsToGithub() {
    try {
        const token = await getAccessToken();
        if (!token) {
            // 如果没有 token，开始登录流程
            startGithubLogin();
            return;
        }

        const shortcuts = getShortcuts();
        const issueBody = JSON.stringify({
            shortcuts: shortcuts,
            lastSync: new Date().toISOString(),
            version: '1.0'
        }, null, 2);

        const issueData = {
            title: ISSUE_TITLE,
            body: issueBody
        };

        let issueNumber = getIssueNumber();
        let response;

        if (issueNumber) {
            // 更新现有 Issue
            response = await githubApiRequest(`/repos/${GITHUB_REPO}/issues/${issueNumber}`, {
                method: 'PATCH',
                body: JSON.stringify(issueData)
            });
        } else {
            // 创建新 Issue
            response = await githubApiRequest(`/repos/${GITHUB_REPO}/issues`, {
                method: 'POST',
                body: JSON.stringify(issueData)
            });
            setIssueNumber(response.number);
        }

        alert(`常用网站数据已成功同步到 GitHub Issue！\nIssue 号: ${response.number}\nURL: ${response.html_url}`);

    } catch (error) {
        console.error('GitHub sync error:', error);
        if (error.message.includes('Bad credentials')) {
            alert('GitHub 授权已过期，请重新登录');
            sessionStorage.removeItem('github_access_token');
            startGithubLogin();
        } else {
            alert('同步失败：' + error.message);
        }
    }
}

async function loadShortcutsFromIssue() {
    try {
        const issueNumber = getIssueNumber();
        if (!issueNumber) {
            return false;
        }

        const issueData = await githubApiRequest(`/repos/${GITHUB_REPO}/issues/${issueNumber}`);
        if (issueData && issueData.body) {
            const data = JSON.parse(issueData.body);
            if (data.shortcuts && Array.isArray(data.shortcuts)) {
                saveShortcuts(data.shortcuts);
                renderShortcuts();
                return true;
            }
        }
    } catch (error) {
        console.error('从 Issue 加载数据失败:', error.message);
    }

    return false;
}

function startGithubLogin() {
    const authUrl = `${AUTH_URL}?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&allow_signup=true`;
    window.location.href = authUrl;
}

function showGithubSettings() {
    const settingsHtml = `
        <div class="github-settings-modal">
            <div class="github-settings-content">
                <h3>GitHub 设置</h3>
                <div class="setting-field">
                    <p>使用 GitHub OAuth 登录，一次登录后 token 将保存到浏览器本地存储中。</p>
                </div>
                <div class="setting-field">
                    <label>Issue 号 (可选):</label>
                    <input type="text" id="issueNumberInput" placeholder="现有 Issue 号" value="${getIssueNumber() || ''}">
                    <small>如果已有 Issue，可以手动输入号码以继续编辑</small>
                </div>
                <div class="setting-actions">
                    <button class="primary-btn" id="saveGithubSettings">保存设置</button>
                    <button class="secondary-btn" id="testGithubConnection">测试连接</button>
                    <button class="secondary-btn" id="closeGithubSettings">关闭</button>
                </div>
            </div>
        </div>
    `;

    // 创建模态框
    const modal = document.createElement('div');
    modal.innerHTML = settingsHtml;
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    `;
    document.body.appendChild(modal);

    // 绑定事件
    document.getElementById('saveGithubSettings').addEventListener('click', () => {
        const issueNumber = document.getElementById('issueNumberInput').value.trim();
        if (issueNumber) {
            setIssueNumber(issueNumber);
        }
        document.body.removeChild(modal);
        updateLoginStatus();
    });

    document.getElementById('testGithubConnection').addEventListener('click', async () => {
        const token = localStorage.getItem(STORAGE_GITHUB_TOKEN_KEY);
        if (!token) {
            alert('未登录。请先点击"连接 GitHub"进行登录。');
            return;
        }

        try {
            const user = await githubApiRequest('/user');
            alert(`连接成功！用户: ${user.login}`);
        } catch (error) {
            alert('连接测试失败：' + error.message);
        }
    });

    document.getElementById('closeGithubSettings').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function renderHistoryCards() {
    const historyGrid = document.getElementById('historyGrid');
    const history = getVisitHistory();
    if (!history.length) {
        historyGrid.innerHTML = '<p style="color: var(--muted);">尚未访问任何网站，点击上方卡片即可开始记录。</p>';
        return;
    }
    historyGrid.innerHTML = history.map(item => `
        <div class="history-card-item">
            <a href="${item.url}" target="_blank" rel="noreferrer">${item.title}</a>
            <div class="visit-meta">
                <span>${item.count} 次访问</span>
                <span>${new Date(item.lastVisited).toLocaleString()}</span>
            </div>
            <p>${item.url}</p>
        </div>
    `).join('');
}

function parseQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

async function updateLoginStatus() {
    const params = parseQueryParams();
    const profileStatus = document.getElementById('profileStatus');
    const oauthContent = document.getElementById('oauthContent');
    const profileAvatar = document.getElementById('profileAvatar');
    const loginButton = document.getElementById('githubLoginButton');

    const token = await getAccessToken();
    const issueNumber = getIssueNumber();

    if (token) {
        let user = null;
        try {
            user = await githubApiRequest('/user');
        } catch (error) {
            console.warn('无法获取 GitHub 用户信息：', error);
        }

        if (profileAvatar) {
            if (user && user.avatar_url) {
                profileAvatar.querySelector('img').src = user.avatar_url;
                profileAvatar.style.display = 'block';
            } else {
                profileAvatar.style.display = 'none';
            }
        }

        if (loginButton) {
            loginButton.style.display = 'none';
        }

        profileStatus.textContent = user ? `已登录：${user.login}` : 'GitHub 已连接';
        oauthContent.innerHTML = `
            <div class="oauth-badge">已连接到 GitHub</div>
            <p>认证方式: OAuth 应用</p>
            <p>数据将同步到 GitHub Issue</p>
            ${issueNumber ? `<p>Issue 号: <strong>${issueNumber}</strong></p>` : '<p>尚未创建 Issue</p>'}
            <div class="sync-actions">
                <button class="github-sync-button" id="syncGithubButton" type="button">同步到 Issue</button>
                <button class="secondary-btn" id="loadFromIssueButton" type="button">从 Issue 加载</button>
                <button class="secondary-btn" id="logoutGithubButton" type="button">断开连接</button>
            </div>
        `;
    } else if (params.code) {
        if (profileAvatar) profileAvatar.style.display = 'none';
        if (loginButton) loginButton.style.display = 'none';

        profileStatus.textContent = '正在获取访问令牌...';
        oauthContent.innerHTML = `
            <div class="oauth-badge">正在处理授权</div>
            <p>正在交换访问令牌，请稍候...</p>
        `;
        // 尝试获取 token
        setTimeout(() => updateLoginStatus(), 1000);
    } else {
        if (profileAvatar) profileAvatar.style.display = 'none';
        if (loginButton) loginButton.style.display = 'inline-flex';

        profileStatus.textContent = '未连接';
        oauthContent.innerHTML = `
            <p>连接 GitHub 账号以同步常用网站数据到 Issue。</p>
            <p>一次登录后，token 将保存到浏览器中，下次打开时自动连接。</p>
            <div class="sync-actions">
                <button class="secondary-btn" id="githubSettingsButton" type="button">设置</button>
            </div>
        `;
    }

    bindGithubSyncButton();
}

function bindGithubSyncButton() {
    const syncButton = document.getElementById('syncGithubButton');
    const loadButton = document.getElementById('loadFromIssueButton');
    const logoutButton = document.getElementById('logoutGithubButton');
    const loginButton = document.getElementById('githubLoginButton');
    const settingsButton = document.getElementById('githubSettingsButton');

    if (syncButton) {
        syncButton.addEventListener('click', syncShortcutsToGithub);
    }

    if (loadButton) {
        loadButton.addEventListener('click', async () => {
            const success = await loadShortcutsFromIssue();
            if (success) {
                alert('已从 GitHub Issue 加载常用网站数据！');
            } else {
                alert('从 Issue 加载数据失败，请检查 Issue 号和网络连接。');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem(STORAGE_GITHUB_TOKEN_KEY);
            localStorage.removeItem(STORAGE_ISSUE_NUMBER_KEY);
            updateLoginStatus();
        });
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', showGithubSettings);
    }
}

function initSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    function performSearch(query) {
        const engine = getStoredSearchEngine();
        const isUrl = /^https?:\/\//i.test(query) || /^[^\s]+\.[^\s]+$/i.test(query);
        const targetUrl = isUrl
            ? (query.startsWith('http://') || query.startsWith('https://') ? query : `https://${query}`)
            : `${engine.url}${encodeURIComponent(query)}`;

        recordVisit(targetUrl, query);
        window.open(targetUrl, '_blank');
    }

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;
        performSearch(query);
        hideSearchSuggestions();
    });

    searchInput.addEventListener('input', () => {
        updateSearchPlaceholder();
        renderSearchSuggestions(searchInput.value.trim());
    });

    searchInput.addEventListener('focus', () => {
        renderSearchSuggestions(searchInput.value.trim());
    });

    searchInput.addEventListener('keydown', event => {
        const suggestions = document.querySelectorAll('.search-suggestion-item');
        if (event.key === 'Escape') {
            hideSearchSuggestions();
            return;
        }

        if (suggestions.length) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, suggestions.length - 1);
                highlightSuggestion(currentSuggestionIndex);
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, 0);
                highlightSuggestion(currentSuggestionIndex);
                return;
            }
            if (event.key === 'Enter' && currentSuggestionIndex >= 0) {
                event.preventDefault();
                selectSearchSuggestion(currentSuggestionIndex);
                hideSearchSuggestions();
                return;
            }
        }
    });

    document.addEventListener('click', event => {
        const target = event.target;
        if (suggestionsContainer && !suggestionsContainer.contains(target) && target !== searchInput) {
            hideSearchSuggestions();
        }
    });

    document.addEventListener('keydown', event => {
        const active = document.activeElement;
        const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
        if (isTyping) return;

        if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            searchInput.focus();
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            searchInput.focus();
        }
    });
}

async function initPage() {
    currentShortcuts = loadShortcuts();
    renderSearchEngineSelector();
    renderShortcuts();
    renderHistoryCards();
    await updateLoginStatus();
    initSearch();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }

    const loginButton = document.getElementById('githubLoginButton');
    if (loginButton) {
        loginButton.addEventListener('click', startGithubLogin);
    }

    // 尝试从 GitHub Issue 加载数据
    await loadShortcutsFromIssue();

    document.getElementById('editShortcutsButton').addEventListener('click', showShortcutEditor);
    document.getElementById('addShortcutButton').addEventListener('click', () => {
        currentShortcuts = getShortcuts();
        showShortcutEditor();
        currentShortcuts.push({ title: '', url: '', description: '' });
        renderShortcutEditor();
    });

    document.addEventListener('click', () => {
        const dropdown = document.getElementById('searchEngineDropdown');
        if (dropdown) dropdown.style.display = 'none';
    });
}

window.addEventListener('DOMContentLoaded', initPage);
