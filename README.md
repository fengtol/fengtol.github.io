# Chrome 风格主页 · GitHub Issue 数据同步

> **🎯 特点**: 一次登录，自动保存 token，支持多设备同步！

一个类似 Chrome 新标签页的主页，支持搜索引擎切换、访问记录和可编辑常用网站，通过 GitHub Issue 同步数据到云端。

## 🔐 认证方式

仅使用 **OAuth 应用**，一次登录后 token 自动保存在浏览器本地：

- ✅ 一次登录即可使用
- ✅ Token 保存在浏览器本地存储中
- ✅ 下次打开时自动连接
- ✅ 完全不需要手动配置 token

## 🚀 快速开始

### 前置要求

1. GitHub 账号
2. Cloudflare Pages 账号（用于托管后端服务）
3. GitHub OAuth App（详见部署指南）

### 使用流程

1. **首次打开**
   - 点击 "连接 GitHub" 按钮
   - 跳转到 GitHub 授权页面
   - 授权后自动返回，token 保存到浏览器

2. **同步数据**
   - 编辑常用网站后点击 "同步到 Issue"
   - 数据自动上传到 GitHub Issue
   - 其他设备打开时点击 "从 Issue 加载" 即可获取

3. **断开连接**
   - 点击 "断开连接" 清除浏览器中的 token

## 📋 工作流程

### 首次同步
1. 点击"连接 GitHub" → 授权
2. 授权后自动返回主页
3. 点击"同步到 Issue" → 创建新 Issue 并上传数据

### 后续同步
1. 直接点击"同步到 Issue" → 更新现有 Issue
2. 或"从 Issue 加载" → 从云端下载数据

### 跨设备同步
1. 在新设备上打开主页
2. 点击"连接 GitHub" → 授权
3. 点击"从 Issue 加载" → 获取云端数据

## 🏗️ 架构设计

```
前端 (index.html)
    ↓
OAuth 授权 (GitHub)
    ↓ callback.html
Cloudflare Pages Function
    ↓ /api/exchange-token
GitHub OAuth API
    ↓ access_token
浏览器本地存储
    ↓
GitHub API (操作 Issue)
```

## 💾 数据存储

数据以 JSON 格式存储在当前仓库的 GitHub Issue 中：

**Issue 标题**: "Chrome Homepage Shortcuts"

**Issue Body** 内容示例：
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

## 🌐 部署指南

### 本地测试

使用 Python 内置服务器：
```bash
python -m http.server 8000
```

访问 `http://localhost:8000/index.html`

**注意**: 本地测试需要配置 GitHub OAuth 的本地回调 URL（可能需要代理）

### 生产部署

详见 [DEPLOYMENT-CLOUDFLARE.md](./DEPLOYMENT-CLOUDFLARE.md)

部署步骤：
1. 创建 GitHub OAuth App
2. 部署到 Cloudflare Pages
3. 配置环境变量
4. 更新前端配置
5. 完成！

## 🔒 安全注意

- ✅ Client Secret 安全保存在 Cloudflare 环境变量中
- ✅ Token 保存在浏览器本地存储中，关闭浏览器不会清除
- ✅ 使用 HTTPS 加密传输
- ✅ Issue 存储在仓库中（建议仓库设为私有）

## 🆘 故障排除

### "获取访问令牌失败"
- 检查 Cloudflare Pages Function 的环境变量配置
- 确保 Client Secret 正确
- 查看函数日志获取详细错误信息

### "无法同步到 Issue"
- 确保已完成 GitHub 授权
- 检查仓库是否设为私有
- 验证 GitHub API 权限

### 跨域错误
- 确保 `TOKEN_EXCHANGE_URL` 正确指向 Cloudflare Pages Function
- 检查 Cloudflare 的 CORS 配置

## 📚 技术栈

- **前端**: 原生 HTML/CSS/JavaScript
- **后端**: Cloudflare Pages Functions
- **存储**: GitHub Issue
- **认证**: GitHub OAuth 2.0

## 📝 文件说明

- `index.html` - 主页面
- `callback.html` - OAuth 回调页面
- `chrome-homepage.js` - 核心逻辑
- `chrome-homepage.html` - 页面模板
- `css/` - 样式文件
- `functions/exchange-token.js` - Cloudflare Worker
- `DEPLOYMENT-CLOUDFLARE.md` - 详细部署指南

## 🎯 后续改进

- [ ] 支持多个 Gist 同时管理
- [ ] 导入/导出功能
- [ ] 网站分类功能
- [ ] 深色模式支持

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
