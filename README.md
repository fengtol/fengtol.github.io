# Chrome 风格主页 · GitHub Gist 数据同步

一个类似 Chrome 新标签页的主页，支持搜索引擎切换、访问记录和可编辑常用网站，并可通过 GitHub Gist 同步数据。

## 功能特性

- 🔍 **搜索引擎切换**: 支持 Google、Bing、百度、DuckDuckGo
- 📊 **访问记录**: 自动记录最近访问的网站
- ✏️ **可编辑常用网站**: 本地编辑和管理快捷卡片
- 🔐 **GitHub Gist 同步**: 通过 OAuth 授权直接同步数据到 GitHub Gist
- ☁️ **数据持久化**: 数据存储为私有 Gist，便于跨设备同步

## 快速开始

### 1. 配置 GitHub OAuth 应用

1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 创建新应用：
   - **Application name**: Chrome 主页
   - **Homepage URL**: `https://yourusername.github.io`
   - **Authorization callback URL**: `https://yourusername.github.io/index.html`
3. 记录 `Client ID`

### 2. 配置前端

在页面上点击"设置"按钮，输入：
- **Client Secret**: 从 GitHub OAuth 应用获取
- **Gist ID**: (可选) 如果已有 Gist 可以手动输入

### 3. 部署和使用

1. **部署前端**: 将文件上传到 GitHub Pages 或其他静态托管服务
2. **连接 GitHub**: 点击"连接 GitHub"按钮完成 OAuth 授权
3. **同步数据**: 编辑常用网站后点击"同步到 Gist"

## 数据存储

数据以 JSON 格式存储在 GitHub Gist 中：

```
Gist: "Chrome Homepage Shortcuts"
├── shortcuts.json (私有 Gist)
```

文件内容示例：
```json
{
  "shortcuts": [
    {
      "title": "Google",
      "url": "https://www.google.com",
      "description": "全球最常用搜索引擎"
    }
  ],
  "lastSync": "2024-01-15T10:30:00.000Z",
  "version": "1.0"
}
```

## 工作流程

### 首次同步
1. 点击"连接 GitHub" → 跳转到 GitHub 授权
2. 授权后返回 → 自动创建私有 Gist
3. 点击"同步到 Gist" → 上传数据到新创建的 Gist

### 后续同步
1. 直接点击"同步到 Gist" → 更新现有 Gist
2. 或"从 Gist 加载" → 从云端下载数据

### 跨设备同步
1. 在新设备上连接 GitHub
2. 点击"从 Gist 加载" → 获取云端数据

## 安全注意

- Gist 设为私有，只有你能访问
- Access Token 存储在浏览器会话中，关闭浏览器后清除
- 建议定期检查 GitHub 应用的权限设置

## 本地开发

使用 Python 内置服务器：
```bash
python -m http.server 8000
```

访问 `http://localhost:8000/index.html`

## 故障排除

### 同步失败
- 检查网络连接
- 确认 GitHub 应用配置正确
- 验证 OAuth 权限包含 `gist`

### 无法加载数据
- 确认 Gist ID 已存储
- 检查 Gist 是否被删除
- 验证网络连接

## 许可证

MIT License