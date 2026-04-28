# Cloudflare Pages 部署指南

本项目使用 GitHub OAuth 进行认证，需要一个后端来处理 token 交换（因为浏览器无法直接跨域访问 GitHub 的 token 交换接口）。

## 快速部署

### 1. GitHub OAuth App 创建

1. 打开 [GitHub Settings > OAuth Apps](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写以下信息：
   - **Application name**: Chrome Homepage
   - **Homepage URL**: `https://yourdomain.com` (你的 Cloudflare Pages 域名)
   - **Authorization callback URL**: `https://yourdomain.com/callback.html`
4. 创建后，保存 **Client ID** 和 **Client Secret**

### 2. Cloudflare Pages 部署

#### 方式 A：连接 Git 仓库（推荐）

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 中选择 **Pages**
2. 选择 "Create a project" → "Connect to Git"
3. 连接你的 GitHub 仓库（fengtol.github.io）
4. 填写构建信息：
   - **Framework**: None
   - **Build command**: (留空)
   - **Build output directory**: (留空)
5. 点击 "Save and Deploy"

#### 方式 B：手动上传

如果你还没有设置 Git，可以手动部署：

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 在项目目录下，创建 wrangler.toml
cat > wrangler.toml << 'EOF'
name = "chrome-homepage"
main = "functions/exchange-token.js"
compatibility_date = "2024-01-01"

[env.production]
name = "chrome-homepage"
route = "yourdomain.com/*"
zone_id = "YOUR_ZONE_ID"
EOF

# 部署
wrangler publish
```

### 3. 环境变量配置

在 Cloudflare Pages 中配置环境变量：

1. 打开 **Pages** → 你的项目 → **Settings** → **Environment variables**
2. 添加以下环境变量：
   - **GITHUB_CLIENT_SECRET**: `your-client-secret-here`

### 4. 更新前端配置

修改 `chrome-homepage.js` 中的常量：

```javascript
// 如果部署在自己的域名下
const TOKEN_EXCHANGE_URL = '/api/exchange-token';

// 或者如果使用 Cloudflare Pages 的默认域名
const TOKEN_EXCHANGE_URL = 'https://your-project.pages.dev/api/exchange-token';
```

### 5. 更新 index.html 中的 OAuth 设置

```javascript
const CLIENT_ID = 'your-github-client-id'; // 从 GitHub OAuth App 获取
const REDIRECT_URI = 'https://yourdomain.com/callback.html';
```

## 验证部署

1. 打开 `https://yourdomain.com/index.html`
2. 点击 "连接 GitHub"
3. 应该能够成功授权并看到 token 保存

## 故障排除

### 提示 "获取访问令牌失败"

- 检查环境变量 `GITHUB_CLIENT_SECRET` 是否正确设置
- 确保 Client Secret 与 GitHub OAuth App 中的一致
- 查看 Cloudflare Pages Function 的日志

### 跨域问题

- 确保 `TOKEN_EXCHANGE_URL` 指向正确的 Cloudflare Pages 函数
- 检查 Cloudflare Pages 的 CORS 配置

### Authorization callback URL 不匹配

- 在 GitHub OAuth App 中更新 **Authorization callback URL** 为你的实际域名
- 确保 `callback.html` 路径正确

## 安全建议

1. **不要在浏览器中存储 Client Secret** ✓（本项目已完成）
2. **使用 HTTPS** ✓（Cloudflare Pages 自动支持）
3. **定期检查 GitHub 应用权限**
4. **使用环境变量管理敏感数据** ✓（已配置）

## 本地测试

如果要在本地测试，可以使用 Wrangler 的本地开发服务器：

```bash
# 安装 Wrangler
npm install -g wrangler

# 启动本地服务器
wrangler dev
```

然后更新 `chrome-homepage.js` 中的 `TOKEN_EXCHANGE_URL`:

```javascript
const TOKEN_EXCHANGE_URL = 'http://localhost:8787/api/exchange-token';
```

## 生产环境检查清单

- [ ] GitHub OAuth App 已创建并配置
- [ ] Cloudflare Pages 已部署
- [ ] 环境变量 `GITHUB_CLIENT_SECRET` 已设置
- [ ] `callback.html` 路径正确
- [ ] `TOKEN_EXCHANGE_URL` 指向正确的后端
- [ ] GitHub OAuth App 中的 `Authorization callback URL` 正确
- [ ] HTTPS 已启用
- [ ] 功能测试已完成

## 更多资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
