# Chrome 风格主页 · GitHub Issue 数据同步

> **🎯 重要提示**: 普通用户请使用 **Personal Access Token** 方式，最简单无需配置OAuth应用！

一个类似 Chrome 新标签页的主页，支持搜索引擎切换、访问记录和可编辑常用网站，并可通过 GitHub Issue 同步数据。

## 认证方式说明

### 📋 配置要求

| 认证方式 | 需要用户配置OAuth应用 | 需要Client Secret | 推荐指数 |
|----------|----------------------|------------------|----------|
| **Personal Access Token** | ❌ 不需要 | ❌ 不需要 | ⭐⭐⭐⭐⭐ |
| **OAuth 应用** | ⚠️ 需要网站开发者配置 | ✅ 需要（由开发者提供） | ⭐⭐⭐ |

**结论**: 普通用户推荐使用 Personal Access Token，无需任何OAuth配置！

## 🚀 推荐使用方式

### Personal Access Token（最简单，无需配置）

这是**强烈推荐**的方式，普通用户**无需配置任何OAuth应用**：

1. 直接去 [GitHub Personal Access Tokens](https://github.com/settings/tokens) 创建 token
2. 选择 `repo` 或 `public_repo` 权限（如果仓库公开，可仅选择 `public_repo`）
3. 在页面设置中粘贴 token 即可使用

**优势**:
- ✅ 完全不需要 OAuth 应用配置
- ✅ 设置最简单（3步完成）
- ✅ 安全可靠
- ✅ 功能完整

---

## 其他方式（仅供参考）

### OAuth 应用方式

需要网站开发者预先配置 OAuth 应用，普通用户需要获取 Client Secret。

> 注意：GitHub 的 `https://github.com/login/oauth/access_token` 接口不支持浏览器直接跨域请求。对于纯静态页面，OAuth 登录流程通常需要一个后端代理来完成令牌交换。

**不推荐普通用户使用**，因为配置较为复杂且静态页面下可能会出现“Failed to fetch”错误。请优先使用 Personal Access Token。
## 数据存储

数据以 JSON 格式存储在当前仓库的 GitHub Issue 中：

```
Issue: "Chrome Homepage Shortcuts"
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
2. 授权后返回 → 自动创建仓库 Issue
3. 点击"同步到 Issue" → 上传数据到新创建的 Issue

### 后续同步
1. 直接点击"同步到 Issue" → 更新现有 Issue
2. 或"从 Issue 加载" → 从云端下载数据

### 跨设备同步
1. 在新设备上连接 GitHub
2. 点击"从 Issue 加载" → 获取云端数据

## 安全注意

- Issue 存储在当前仓库中，任何有访问权限的用户都可查看
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
- 验证 OAuth 权限包含 `repo` 或 `public_repo`

### 无法加载数据
- 确认 Issue 号已存储
- 检查 Issue 是否被关闭或删除
- 验证网络连接

## 关于 Access Token

### OAuth Access Token vs Personal Access Token

**OAuth Access Token**（通过登录流程获得）：
- ✅ 可以直接操作 Issue，无需额外创建 token
- ✅ 权限范围可精确控制
- ✅ 可以设置过期时间
- ❌ 需要配置 OAuth 应用

**Personal Access Token**（手动创建）：
- ✅ 设置最简单
- ✅ 不需要 OAuth 应用配置
- ❌ 需要手动管理 token
- ❌ 权限相对固定

**结论**: 两种方式都可以直接操作 Issue，选择你觉得更方便的一种！