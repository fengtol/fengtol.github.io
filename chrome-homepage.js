const CLIENT_ID = 'Ov23lifw4crbtBHZ1ZMH';
const REDIRECT_URI = window.location.origin + window.location.pathname;
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPES = ['read:user', 'user:email', 'gist'];
const STORAGE_ENGINE_KEY = 'chrome_homepage_search_engine';
const STORAGE_HISTORY_KEY = 'chrome_homepage_visit_history';
const STORAGE_SHORTCUTS_KEY = 'chrome_homepage_shortcuts';
const STORAGE_GIST_ID_KEY = 'chrome_homepage_gist_id';
const STORAGE_CLIENT_SECRET_KEY = 'chrome_homepage_client_secret';
const STORAGE_GITHUB_TOKEN_KEY = 'chrome_homepage_github_token';
const STORAGE_AUTH_METHOD_KEY = 'chrome_homepage_auth_method';
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
    container.addEventListener('click', event => {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    container.querySelectorAll('.search-engine-option').forEach(option => {
        option.addEventListener('click', event => {
            event.stopPropagation();
            setStoredSearchEngine(option.dataset.engine);
            dropdown.style.display = 'none';
        });
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

// GitHub Gist 同步相关函数
function getGistId() {
    return localStorage.getItem(STORAGE_GIST_ID_KEY);
}

function setGistId(gistId) {
    localStorage.setItem(STORAGE_GIST_ID_KEY, gistId);
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
    const authMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';

    if (authMethod === 'pat') {
        // 使用 Personal Access Token
        return localStorage.getItem(STORAGE_GITHUB_TOKEN_KEY);
    } else {
        // 使用 OAuth 流程
        const params = parseQueryParams();
        if (params.code) {
            const clientSecret = localStorage.getItem(STORAGE_CLIENT_SECRET_KEY);
            if (!clientSecret) {
                alert('请先配置 GitHub Client Secret。点击"设置"按钮进行配置。');
                return null;
            }

            try {
                const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_id: CLIENT_ID,
                        client_secret: clientSecret,
                        code: params.code,
                        redirect_uri: REDIRECT_URI
                    })
                });

                const tokenData = await tokenResponse.json();
                if (tokenData.access_token) {
                    // 存储 token 并清理 URL
                    sessionStorage.setItem('github_access_token', tokenData.access_token);
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return tokenData.access_token;
                } else {
                    alert('获取访问令牌失败：' + (tokenData.error_description || tokenData.error));
                }
            } catch (error) {
                console.error('Token exchange failed:', error);
                alert('获取访问令牌时发生错误：' + error.message);
            }
        }

        // 从 sessionStorage 获取已存储的 token
        return sessionStorage.getItem('github_access_token');
    }
}

async function syncShortcutsToGithub() {
    try {
        const token = await getAccessToken();
        if (!token) {
            const authMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';
            if (authMethod === 'pat') {
                alert('请先配置 Personal Access Token。点击"设置"按钮进行配置。');
                showGithubSettings();
            } else {
                // 如果没有 token，开始登录流程
                startGithubLogin();
            }
            return;
        }

        const shortcuts = getShortcuts();
        const gistData = {
            description: 'Chrome Homepage Shortcuts',
            public: false,
            files: {
                'shortcuts.json': {
                    content: JSON.stringify({
                        shortcuts: shortcuts,
                        lastSync: new Date().toISOString(),
                        version: '1.0'
                    }, null, 2)
                }
            }
        };

        let gistId = getGistId();
        let response;

        if (gistId) {
            // 更新现有 Gist
            response = await githubApiRequest(`/gists/${gistId}`, {
                method: 'PATCH',
                body: JSON.stringify(gistData)
            });
        } else {
            // 创建新 Gist
            response = await githubApiRequest('/gists', {
                method: 'POST',
                body: JSON.stringify(gistData)
            });
            setGistId(response.id);
        }

        alert(`常用网站数据已成功同步到 GitHub Gist！\nGist ID: ${response.id}\nURL: ${response.html_url}`);

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

async function loadShortcutsFromGist() {
    try {
        const gistId = getGistId();
        if (!gistId) {
            return false;
        }

        const gistData = await githubApiRequest(`/gists/${gistId}`);
        const shortcutsFile = gistData.files['shortcuts.json'];

        if (shortcutsFile && shortcutsFile.content) {
            const data = JSON.parse(shortcutsFile.content);
            if (data.shortcuts && Array.isArray(data.shortcuts)) {
                saveShortcuts(data.shortcuts);
                renderShortcuts();
                return true;
            }
        }
    } catch (error) {
        console.error('从 Gist 加载数据失败:', error.message);
    }

    return false;
}

function startGithubLogin() {
    const authMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';

    if (authMethod === 'pat') {
        alert('当前使用 Personal Access Token 模式，无需登录。请在设置中配置 PAT。');
        showGithubSettings();
        return;
    }

    const clientSecret = localStorage.getItem(STORAGE_CLIENT_SECRET_KEY);
    if (!clientSecret) {
        alert('请先配置 GitHub Client Secret。点击"设置"按钮进行配置。');
        showGithubSettings();
        return;
    }

    const authUrl = `${AUTH_URL}?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&allow_signup=true`;
    window.location.href = authUrl;
}

function showGithubSettings() {
    const currentAuthMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';

    const settingsHtml = `
        <div class="github-settings-modal">
            <div class="github-settings-content">
                <h3>GitHub 设置</h3>
                <div class="setting-field">
                    <label>认证方式:</label>
                    <select id="authMethodSelect">
                        <option value="pat" ${currentAuthMethod === 'pat' ? 'selected' : ''}>Personal Access Token (推荐)</option>
                        <option value="oauth" ${currentAuthMethod === 'oauth' ? 'selected' : ''}>OAuth 应用</option>
                    </select>
                    <small>Personal Access Token 更简单，无需配置 OAuth 应用</small>
                </div>
                <div class="setting-field" id="patField" style="${currentAuthMethod === 'pat' ? '' : 'display:none'}">
                    <label>Personal Access Token:</label>
                    <input type="password" id="patInput" placeholder="ghp_xxxxxxxxxxxx" value="${localStorage.getItem(STORAGE_GITHUB_TOKEN_KEY) || ''}">
                    <small>去 <a href="https://github.com/settings/tokens" target="_blank">GitHub Settings > Developer settings > Personal access tokens</a> 创建 token，需要 gist 权限</small>
                </div>
                <div class="setting-field" id="oauthField" style="${currentAuthMethod === 'oauth' ? '' : 'display:none'}">
                    <label>Client Secret:</label>
                    <input type="password" id="clientSecretInput" placeholder="GitHub OAuth App Client Secret" value="${localStorage.getItem(STORAGE_CLIENT_SECRET_KEY) || ''}">
                    <small>从 <a href="https://github.com/settings/developers" target="_blank">GitHub OAuth Apps</a> 获取 Client Secret</small>
                </div>
                <div class="setting-field">
                    <label>Gist ID (可选):</label>
                    <input type="text" id="gistIdInput" placeholder="现有 Gist ID" value="${getGistId() || ''}">
                    <small>如果已有 Gist，可以手动输入 ID</small>
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

    // 认证方式切换
    const authMethodSelect = document.getElementById('authMethodSelect');
    const patField = document.getElementById('patField');
    const oauthField = document.getElementById('oauthField');

    authMethodSelect.addEventListener('change', () => {
        if (authMethodSelect.value === 'pat') {
            patField.style.display = '';
            oauthField.style.display = 'none';
        } else {
            patField.style.display = 'none';
            oauthField.style.display = '';
        }
    });

    // 绑定事件
    document.getElementById('saveGithubSettings').addEventListener('click', () => {
        const authMethod = document.getElementById('authMethodSelect').value;
        localStorage.setItem(STORAGE_AUTH_METHOD_KEY, authMethod);

        if (authMethod === 'pat') {
            const pat = document.getElementById('patInput').value.trim();
            if (pat) {
                localStorage.setItem(STORAGE_GITHUB_TOKEN_KEY, pat);
            }
        } else {
            const clientSecret = document.getElementById('clientSecretInput').value.trim();
            if (clientSecret) {
                localStorage.setItem(STORAGE_CLIENT_SECRET_KEY, clientSecret);
            }
        }

        const gistId = document.getElementById('gistIdInput').value.trim();
        if (gistId) {
            setGistId(gistId);
        }

        document.body.removeChild(modal);
        updateLoginStatus();
    });

    document.getElementById('testGithubConnection').addEventListener('click', async () => {
        const authMethod = document.getElementById('authMethodSelect').value;
        let token = null;

        if (authMethod === 'pat') {
            token = document.getElementById('patInput').value.trim();
        } else {
            // 对于OAuth，需要先登录，这里只是测试配置是否正确
            alert('OAuth 模式请先保存设置，然后点击"连接 GitHub"进行测试。');
            return;
        }

        if (!token) {
            alert('请输入访问令牌');
            return;
        }

        try {
            // 临时设置 token 来测试
            const originalToken = localStorage.getItem(STORAGE_GITHUB_TOKEN_KEY);
            localStorage.setItem(STORAGE_GITHUB_TOKEN_KEY, token);

            const user = await githubApiRequest('/user');
            alert(`连接成功！用户: ${user.login}`);
            localStorage.setItem(STORAGE_GITHUB_TOKEN_KEY, originalToken);

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

    const authMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';
    const token = await getAccessToken();
    const gistId = getGistId();

    if (token) {
        profileStatus.textContent = 'GitHub 已连接';
        oauthContent.innerHTML = `
            <div class="oauth-badge">已连接到 GitHub</div>
            <p>认证方式: ${authMethod === 'pat' ? 'Personal Access Token' : 'OAuth 应用'}</p>
            <p>数据将同步到 GitHub Gist</p>
            ${gistId ? `<p>Gist ID: <strong>${gistId}</strong></p>` : '<p>尚未创建 Gist</p>'}
            <div class="sync-actions">
                <button class="github-sync-button" id="syncGithubButton" type="button">同步到 Gist</button>
                <button class="secondary-btn" id="loadFromGistButton" type="button">从 Gist 加载</button>
                <button class="secondary-btn" id="logoutGithubButton" type="button">断开连接</button>
            </div>
        `;
    } else if (params.code && authMethod === 'oauth') {
        profileStatus.textContent = '正在获取访问令牌...';
        oauthContent.innerHTML = `
            <div class="oauth-badge">正在处理授权</div>
            <p>正在交换访问令牌，请稍候...</p>
        `;
        // 尝试获取 token
        setTimeout(() => updateLoginStatus(), 1000);
    } else {
        profileStatus.textContent = '未连接';
        oauthContent.innerHTML = `
            <p>连接 GitHub 账号以同步常用网站数据到 Gist。</p>
            <p>Gist 是 GitHub 提供的代码片段存储服务。</p>
            <div class="sync-actions">
                ${authMethod === 'oauth' ? '<button class="github-login-button" id="githubLoginButton" type="button">连接 GitHub</button>' : ''}
                <button class="secondary-btn" id="githubSettingsButton" type="button">设置</button>
            </div>
        `;
    }
}

function bindGithubSyncButton() {
    const syncButton = document.getElementById('syncGithubButton');
    const loadButton = document.getElementById('loadFromGistButton');
    const logoutButton = document.getElementById('logoutGithubButton');
    const loginButton = document.getElementById('githubLoginButton');
    const settingsButton = document.getElementById('githubSettingsButton');

    if (syncButton) {
        syncButton.addEventListener('click', syncShortcutsToGithub);
    }

    if (loadButton) {
        loadButton.addEventListener('click', async () => {
            const success = await loadShortcutsFromGist();
            if (success) {
                alert('已从 GitHub Gist 加载常用网站数据！');
            } else {
                alert('从 Gist 加载数据失败，请检查 Gist ID 和网络连接。');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const authMethod = localStorage.getItem(STORAGE_AUTH_METHOD_KEY) || 'pat';
            if (authMethod === 'pat') {
                localStorage.removeItem(STORAGE_GITHUB_TOKEN_KEY);
            } else {
                sessionStorage.removeItem('github_access_token');
            }
            localStorage.removeItem(STORAGE_GIST_ID_KEY);
            updateLoginStatus();
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', startGithubLogin);
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', showGithubSettings);
    }
}

function initSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        const engine = getStoredSearchEngine();
        const isUrl = /^https?:\/\//i.test(query) || /^[^\s]+\.[^\s]+$/i.test(query);
        const targetUrl = isUrl
            ? (query.startsWith('http://') || query.startsWith('https://') ? query : `https://${query}`)
            : `${engine.url}${encodeURIComponent(query)}`;

        recordVisit(targetUrl, query);
        window.open(targetUrl, '_blank');
    });
}

async function initPage() {
    currentShortcuts = loadShortcuts();
    renderSearchEngineSelector();
    renderShortcuts();
    renderHistoryCards();
    await updateLoginStatus();
    initSearch();
    bindGithubSyncButton();

    // 尝试从 GitHub Gist 加载数据
    await loadShortcutsFromGist();

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
