const CLIENT_ID = 'Ov23lifw4crbtBHZ1ZMH';
const REDIRECT_URI = window.location.origin + window.location.pathname;
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPES = ['read:user', 'user:email'];
const STORAGE_ENGINE_KEY = 'chrome_homepage_search_engine';
const STORAGE_HISTORY_KEY = 'chrome_homepage_visit_history';
const STORAGE_SHORTCUTS_KEY = 'chrome_homepage_shortcuts';
const GITHUB_SYNC_ENDPOINT = '';

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

function syncShortcutsToGithub() {
    const params = parseQueryParams();
    const code = params.code;
    if (!code) {
        alert('请先使用 GitHub 登录，然后再同步常用网站数据。');
        return;
    }

    const shortcuts = getShortcuts();
    if (!GITHUB_SYNC_ENDPOINT) {
        alert('已检测到 GitHub 登录，但当前页面尚未配置同步后端。如果你想真正同步到 GitHub，请在 chrome-homepage.js 中配置 GITHUB_SYNC_ENDPOINT，并在后端实现使用授权码交换 access token 后保存数据。');
        return;
    }

    fetch(GITHUB_SYNC_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, shortcuts })
    }).then(response => response.json())
      .then(result => {
          if (result.success) alert('常用网站数据已提交到 GitHub 同步后端。');
          else alert('同步失败：' + (result.message || '未知错误'));
      }).catch(error => {
          alert('同步请求失败：' + error.message);
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

function updateLoginStatus() {
    const params = parseQueryParams();
    const profileStatus = document.getElementById('profileStatus');
    const oauthContent = document.getElementById('oauthContent');

    if (params.code) {
        profileStatus.textContent = 'GitHub 授权完成';
        oauthContent.innerHTML = `
            <div class="oauth-badge">授权码已生成</div>
            <p>授权码（code）：<strong>${params.code}</strong></p>
            <p>请将该授权码发送到后端服务器，使用 GitHub OAuth 服务器端交换 Access Token。</p>
            <p>当前页面仅完成授权跳转。若已配置服务器，请在服务器端向</p>
            <p><code>https://github.com/login/oauth/access_token</code> 发送请求。</p>
            <button class="github-sync-button" id="syncGithubButton" type="button">同步常用网站</button>
        `;
    } else {
        profileStatus.textContent = '未登录';
        oauthContent.innerHTML = `
            <p>点击按钮开始 GitHub 登录流程。</p>
            <p>此页面为独立静态示例页面，登录后将会返回授权码。</p>
            <p>请先在 GitHub 应用中配置 Redirect URI 为：</p>
            <p><code>${REDIRECT_URI}</code></p>
        `;
    }
}

function bindGithubSyncButton() {
    const button = document.getElementById('syncGithubButton');
    if (!button) return;
    button.addEventListener('click', syncShortcutsToGithub);
}

function bindLoginButton() {
    const button = document.getElementById('githubLoginButton');
    button.addEventListener('click', () => {
        if (!CLIENT_ID || CLIENT_ID === 'YOUR_GITHUB_CLIENT_ID_HERE') {
            alert('请先将 chrome-homepage.js 中的 CLIENT_ID 替换为你自己的 GitHub OAuth App Client ID。');
            return;
        }

        const authUrl = `${AUTH_URL}?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&allow_signup=true`;
        window.location.href = authUrl;
    });
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

function initPage() {
    currentShortcuts = loadShortcuts();
    renderSearchEngineSelector();
    renderShortcuts();
    renderHistoryCards();
    updateLoginStatus();
    initSearch();
    bindLoginButton();
    bindGithubSyncButton();

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
