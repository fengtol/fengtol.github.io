const CLIENT_ID = 'Ov23lifw4crbtBHZ1ZMH';
const REDIRECT_URI = window.location.origin + '/callback.html';
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_EXCHANGE_URL = '/exchange-token'; // Cloudflare Pages 后端函数路径
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
const STORAGE_CUSTOM_ENGINES_KEY = 'chrome_homepage_custom_engines';
const STORAGE_BING_BACKGROUND_KEY = 'chrome_homepage_bing_background';
const GITHUB_API_BASE = 'https://api.github.com';
const MAX_SEARCH_SUGGESTIONS = 8;

const BING_SEARCH_URL = 'https://cn.bing.com/search?q=';
const BING_PROXY_SUGGEST_URL = '/bing-proxy?suggest=';
const BING_PROXY_BACKGROUND_URL = '/bing-proxy?background=1';

const DEFAULT_SEARCH_ENGINES = [
    { id: 'bing', name: 'Bing', url: BING_SEARCH_URL, icon: 'B' },
    { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=', icon: 'G' },
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=', icon: '百' },
    { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🦆' }
];

let SEARCH_ENGINES = [...DEFAULT_SEARCH_ENGINES];


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
let activeSuggestions = [];
let currentSuggestionIndex = -1;

function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));

    setTimeout(() => {
        toast.classList.remove('visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
}

function showSuccessToast(message) {
    showToast(message, 'success');
}

function showErrorToast(message) {
    showToast(message, 'error');
}

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

function loadCustomEngines() {
    const raw = localStorage.getItem(STORAGE_CUSTOM_ENGINES_KEY);
    if (!raw) return [];
    try {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) return data;
    } catch {
    }
    return [];
}

function saveCustomEngines(engines) {
    localStorage.setItem(STORAGE_CUSTOM_ENGINES_KEY, JSON.stringify(engines));
}

function updateSearchEngines() {
    const customEngines = loadCustomEngines();
    SEARCH_ENGINES = [...DEFAULT_SEARCH_ENGINES, ...customEngines];
}

function showEditCustomEngineDialog(id) {
    const customEngines = loadCustomEngines();
    const engine = customEngines.find(e => e.id === id);
    if (!engine) return;

    const dialogHtml = `
        <div class="custom-engine-dialog">
            <div class="custom-engine-content">
                <h3>编辑自定义搜索引擎</h3>
                <div class="custom-engine-field">
                    <label>名称</label>
                    <input type="text" id="editEngineName" placeholder="搜索引擎名称" value="${engine.name}">
                </div>
                <div class="custom-engine-field">
                    <label>URL</label>
                    <input type="text" id="editEngineUrl" placeholder="https://example.com/search?q=%s" value="${engine.url}">
                    <small>用 %s 替换搜索关键词</small>
                </div>
                <div class="custom-engine-field">
                    <label>图标</label>
                    <input type="text" id="editEngineIcon" placeholder="图标字符或 Emoji" maxlength="2" value="${engine.icon}">
                </div>
                <div class="custom-engine-actions">
                    <button class="secondary-btn" id="cancelEditEngine">取消</button>
                    <button class="primary-btn" id="saveEditEngine">保存</button>
                </div>
            </div>
        </div>
    `;

    const dialog = document.createElement('div');
    dialog.innerHTML = dialogHtml;
    dialog.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    `;
    document.body.appendChild(dialog);

    document.getElementById('saveEditEngine').addEventListener('click', () => {
        const name = document.getElementById('editEngineName').value.trim();
        const url = document.getElementById('editEngineUrl').value.trim();
        const icon = document.getElementById('editEngineIcon').value.trim() || name.charAt(0);

        if (!name || !url) {
            alert('名称和 URL 不能为空');
            return;
        }

        const customEngines = loadCustomEngines();
        const index = customEngines.findIndex(e => e.id === id);
        if (index !== -1) {
            customEngines[index] = { ...customEngines[index], name, url, icon };
            saveCustomEngines(customEngines);
            updateSearchEngines();
            renderSearchEngineSelector();
        }
        document.body.removeChild(dialog);
    });

    document.getElementById('cancelEditEngine').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
}

function deleteCustomEngine(id) {
    const customEngines = loadCustomEngines();
    const filtered = customEngines.filter(engine => engine.id !== id);
    saveCustomEngines(filtered);
    updateSearchEngines();
    renderSearchEngineSelector();

    // 如果当前选择的引擎被删除了，重置为默认
    const current = getStoredSearchEngine();
    if (current.id === id) {
        localStorage.removeItem(STORAGE_ENGINE_KEY);
        renderSearchEngineSelector();
    }
}

function getStoredSearchEngine() {
    const saved = localStorage.getItem(STORAGE_ENGINE_KEY);
    return SEARCH_ENGINES.find(engine => engine.id === saved) || SEARCH_ENGINES[0];
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
        <span class="search-engine-icon">${engine.icon}</span>
        <span class="search-engine-selected">${engine.name}</span>
        <span class="search-engine-arrow">▾</span>
        <div class="search-engine-dropdown" id="searchEngineDropdown" style="display:none;">
            ${SEARCH_ENGINES.map(item => `
                <div class="search-engine-option" data-engine="${item.id}">
                    <span class="search-engine-icon">${item.icon}</span>
                    <span>${item.name}</span>
                    ${item.id.startsWith('custom_') ? `
                        <span class="engine-action edit-engine" data-engine="${item.id}" title="编辑">✏️</span>
                        <span class="engine-action delete-engine" data-engine="${item.id}" title="删除">🗑️</span>
                    ` : ''}
                </div>
            `).join('')}
            <div class="search-engine-divider"></div>
            <div class="search-engine-option" id="addCustomEngine">
                <span class="search-engine-icon">+</span>
                <span>添加自定义搜索引擎</span>
            </div>
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
        const editBtn = option.querySelector('.edit-engine');
        const deleteBtn = option.querySelector('.delete-engine');

        if (editBtn) {
            editBtn.addEventListener('click', event => {
                event.stopPropagation();
                showEditCustomEngineDialog(event.target.dataset.engine);
                if (dropdown) dropdown.style.display = 'none';
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', event => {
                event.stopPropagation();
                if (confirm('确定要删除这个搜索引擎吗？')) {
                    deleteCustomEngine(event.target.dataset.engine);
                }
                if (dropdown) dropdown.style.display = 'none';
            });
        }

        if (option.id === 'addCustomEngine') {
            option.addEventListener('click', event => {
                event.stopPropagation();
                showAddCustomEngineDialog();
                if (dropdown) dropdown.style.display = 'none';
            });
        } else if (!editBtn && !deleteBtn) {
            option.addEventListener('click', event => {
                event.stopPropagation();
                setStoredSearchEngine(option.dataset.engine);
                if (dropdown) dropdown.style.display = 'none';
            });
        }
    });

    updateSearchPlaceholder();
}


async function loadBingBackground() {
    const cacheKey = STORAGE_BING_BACKGROUND_KEY;
    const cached = localStorage.getItem(cacheKey);
    const now = Date.now();
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

    if (cached) {
        try {
            const { url, timestamp } = JSON.parse(cached);
            if (now - timestamp < CACHE_DURATION) {
                document.body.style.backgroundImage = `url('${url}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
                return;
            }
        } catch (e) {
            // 忽略解析错误
        }
    }

    try {
        const response = await fetch(BING_PROXY_BACKGROUND_URL);
        const data = await response.json();
        if (data && Array.isArray(data.images) && data.images[0] && data.images[0].url) {
            const imageUrl = `https://www.bing.com${data.images[0].url}`;
            document.body.style.backgroundImage = `url('${imageUrl}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';

            // 缓存URL
            localStorage.setItem(cacheKey, JSON.stringify({ url: imageUrl, timestamp: now }));
        }
    } catch (error) {
        console.warn('Bing 背景获取失败：', error);
    }
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

async function getBingSearchSuggestions(query) {
    if (!query || !query.trim()) return [];

    try {
        const response = await fetch(`${BING_PROXY_SUGGEST_URL}${encodeURIComponent(query)}`);
        const data = await response.json();
        if (Array.isArray(data) && Array.isArray(data[1])) {
            return data[1].slice(0, MAX_SEARCH_SUGGESTIONS).map(suggestion => ({
                title: suggestion,
                url: `${BING_SEARCH_URL}${encodeURIComponent(suggestion)}`,
                description: 'Bing 推荐'
            }));
        }
    } catch (error) {
        console.warn('Bing 搜索建议获取失败：', error);
    }

    return [];
}

async function getSearchSuggestions(query) {
    if (!query || !query.trim()) return [];

    const bingSuggestions = await getBingSearchSuggestions(query);
    if (bingSuggestions.length) {
        return bingSuggestions;
    }

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
        return item.title.toLowerCase().includes(lowerQuery) || item.url.toLowerCase().includes(lowerQuery);
    });

    return filtered.slice(0, MAX_SEARCH_SUGGESTIONS);
}

async function renderSearchSuggestions(query) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;

    const suggestions = await getSearchSuggestions(query);
    activeSuggestions = suggestions;
    currentSuggestionIndex = -1;

    if (!suggestions.length) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="suggestion-header">匹配到 ${suggestions.length} 条 Bing 推荐结果，使用 ↑↓ 选择，回车打开。</div>
        ${suggestions.map((item, index) => `
            <div class="search-suggestion-item" data-index="${index}" tabindex="0">
                <div>
                    <strong>${item.title}</strong>
                    <div class="search-suggestion-meta">${item.description}</div>
                </div>

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

function renderShortcuts() {
    const grid = document.getElementById('shortcutGrid');
    const shortcuts = getShortcuts();
    grid.innerHTML = shortcuts.map(link => {
        const domain = new URL(link.url).hostname;
        const faviconUrl = `/favicon-proxy?domain=${domain}`;
        return `
        <div class="shortcut-card">
            <a href="${link.url}" target="_blank" rel="noreferrer" data-title="${link.title}">
                <div class="shortcut-icon">
                    <img src="${faviconUrl}" alt="" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOUI5QkE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vPC90ZXh0Pgo8L3N2Zz4='">
                </div>
                <div class="shortcut-title">${link.title}</div>
            </a>
        </div>
    `}).join('');
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

function showAddShortcutDialog() {
    const dialogHtml = `
        <div class="custom-engine-dialog">
            <div class="custom-engine-content">
                <h3>添加常用网站</h3>
                <div class="custom-engine-field">
                    <label>网站名称</label>
                    <input type="text" id="shortcutName" placeholder="网站名称">
                </div>
                <div class="custom-engine-field">
                    <label>网站链接</label>
                    <input type="text" id="shortcutUrl" placeholder="https://example.com">
                </div>
                <div class="custom-engine-field">
                    <label>网站说明</label>
                    <input type="text" id="shortcutDesc" placeholder="简短说明">
                </div>
                <div class="custom-engine-actions">
                    <button class="secondary-btn" id="cancelAddShortcut">取消</button>
                    <button class="primary-btn" id="saveAddShortcut">保存</button>
                </div>
            </div>
        </div>
    `;

    const dialog = document.createElement('div');
    dialog.innerHTML = dialogHtml;
    dialog.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    `;
    document.body.appendChild(dialog);

    document.getElementById('saveAddShortcut').addEventListener('click', () => {
        const name = document.getElementById('shortcutName').value.trim();
        const url = document.getElementById('shortcutUrl').value.trim();
        const desc = document.getElementById('shortcutDesc').value.trim();

        if (!name || !url) {
            alert('名称和链接不能为空');
            return;
        }

        const shortcuts = getShortcuts();
        shortcuts.push({ title: name, url: url, description: desc });
        saveShortcuts(shortcuts);
        renderShortcuts();
        document.body.removeChild(dialog);
    });

    document.getElementById('cancelAddShortcut').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
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
                showErrorToast('获取访问令牌失败：' + (data.error_description || data.error || '未知错误'));
            }
        } catch (error) {
            console.error('Token exchange failed:', error);
            showErrorToast('获取访问令牌时发生错误：' + error.message);
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

        showSuccessToast(`常用网站已成功同步到 GitHub Issue #${response.number}`);
    } catch (error) {
        console.error('GitHub sync error:', error);
        if (error.message.includes('Bad credentials')) {
            showErrorToast('GitHub 授权已过期，请重新登录');
            sessionStorage.removeItem('github_access_token');
            startGithubLogin();
        } else {
            showErrorToast('同步失败：' + error.message);
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
            showErrorToast('未登录。请先点击“连接 GitHub”进行登录。');
            return;
        }

        try {
            const user = await githubApiRequest('/user');
            showSuccessToast(`连接成功！用户: ${user.login}`);
        } catch (error) {
            showErrorToast('连接测试失败：' + error.message);
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
    historyGrid.innerHTML = history.map(item => {
        const domain = new URL(item.url).hostname;
        const faviconUrl = `/favicon-proxy?domain=${domain}`;
        return `
        <div class="history-card-item">
            <a href="${item.url}" target="_blank" rel="noreferrer" title="${item.title}">
                <div class="history-icon">
                    <img src="${faviconUrl}" alt="" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOUI5QkE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vPC90ZXh0Pgo8L3N2Zz4='">
                </div>
                <div class="history-title">${item.title}</div>
                <div class="history-meta">${item.count} 次</div>
            </a>
        </div>
    `}).join('');
}

function parseQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

async function updateLoginStatus() {
    const params = parseQueryParams();
    const profileStatus = document.getElementById('profileStatus');
    const profileDropdownText = document.getElementById('profileDropdownText');
    const oauthContent = document.getElementById('oauthContent');
    const profileAvatar = document.getElementById('profileAvatar');
    const loginButton = document.getElementById('githubLoginButton');
    const logoutButton = document.getElementById('logoutGithubButton');

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
        if (logoutButton) {
            logoutButton.style.display = 'inline-flex';
        }

        profileStatus.textContent = user ? '已登录' : '已连接';
        if (profileDropdownText) {
            profileDropdownText.textContent = user ? `当前账号：${user.login}` : issueNumber ? `Issue 号 ${issueNumber}` : '已连接 GitHub，尚未创建 Issue。';
        }
        oauthContent.innerHTML = `
            <div class="oauth-badge">已连接到 GitHub</div>
            <p>${user ? `账号：${user.login}` : 'GitHub 已连接'}</p>
            ${issueNumber ? `<p>Issue 号：<strong>${issueNumber}</strong></p>` : '<p>尚未创建 Issue</p>'}
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
        if (logoutButton) logoutButton.style.display = 'none';

        profileStatus.textContent = '未连接';
        if (profileDropdownText) {
            profileDropdownText.textContent = '点击登录 GitHub 同步常用网站。';
        }
        oauthContent.innerHTML = `
            <p>当前状态：未连接</p>
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
                showSuccessToast('已从 GitHub Issue 加载常用网站数据！');
            } else {
                showErrorToast('从 Issue 加载数据失败，请检查 Issue 号和网络连接。');
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
            : engine.url.replace('%s', encodeURIComponent(query));

        recordVisit(targetUrl, query);
        window.open(targetUrl, '_blank');
    }

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        if (activeSuggestions.length > 0 && currentSuggestionIndex >= 0) {
            selectSearchSuggestion(currentSuggestionIndex);
        } else {
            const query = searchInput.value.trim();
            if (query) performSearch(query);
        }
        hideSearchSuggestions();
    });

    searchInput.addEventListener('input', async () => {
        updateSearchPlaceholder();
        await renderSearchSuggestions(searchInput.value.trim());
    });

    searchInput.addEventListener('focus', async () => {
        const query = searchInput.value.trim();
        if (query) await renderSearchSuggestions(query);
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
            if (event.key === 'Enter') {
                event.preventDefault();
                if (activeSuggestions.length > 0) {
                    const index = currentSuggestionIndex >= 0 ? currentSuggestionIndex : 0;
                    selectSearchSuggestion(index);
                } else {
                    const query = searchInput.value.trim();
                    if (query) performSearch(query);
                }
                hideSearchSuggestions();
                return;
            }
        }
    });

    document.addEventListener('click', event => {
        const target = event.target;
        const profileDropdown = document.getElementById('profileDropdown');
        const profileToggle = document.getElementById('profileToggle');
        if (suggestionsContainer && !suggestionsContainer.contains(target) && target !== searchInput) {
            hideSearchSuggestions();
        }
        if (profileDropdown && profileToggle && !profileDropdown.contains(target) && target !== profileToggle) {
            profileDropdown.style.display = 'none';
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
    updateSearchEngines();
    currentShortcuts = loadShortcuts();
    renderSearchEngineSelector();
    await loadBingBackground();
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

    const profileToggle = document.getElementById('profileToggle');
    if (profileToggle) {
        profileToggle.addEventListener('click', event => {
            event.stopPropagation();
            const profileDropdown = document.getElementById('profileDropdown');
            if (profileDropdown) {
                profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    // 尝试从 GitHub Issue 加载数据
    await loadShortcutsFromIssue();

    document.getElementById('editShortcutsButton').addEventListener('click', showShortcutEditor);
    document.getElementById('addShortcutButton').addEventListener('click', showAddShortcutDialog);

    document.addEventListener('click', () => {
        const dropdown = document.getElementById('searchEngineDropdown');
        if (dropdown) dropdown.style.display = 'none';
    });
}

window.addEventListener('DOMContentLoaded', initPage);
