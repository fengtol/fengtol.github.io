# Copilot Instructions for fengtol.github.io

## 项目概览
本项目为静态网站，主要文件结构如下：
- `index.html`、`version.html`：主页面及版本信息页面
- `css/`、`js/`、`images/`：前端资源目录，分别存放样式、脚本和图片
- `push.py`：自动化脚本，可能用于内容推送或同步
- `requirements.txt`：Python依赖列表（仅用于脚本）
- `.github/workflows/`：CI/CD相关GitHub Actions配置

## 关键开发流程
- **前端开发**：直接编辑 `index.html`、`css/`、`js/` 目录下文件，无需构建步骤，修改后即可生效。
- **自动化脚本**：如需运行 `push.py`，请先安装 `requirements.txt` 中的依赖。
  示例命令：
  ```powershell
  pip install -r requirements.txt
  python push.py
  ```
- **CI/CD**：GitHub Actions 自动处理同步、清理日志等任务，相关配置见 `.github/workflows/`。

## 项目约定与模式
- 所有页面为静态HTML，无后端服务。
- 资源引用路径均为相对路径，便于本地预览和远程部署。
- 版本信息通过 `version.json`、`version.html` 管理，自动化脚本可能会更新这些文件。
- 不使用现代前端框架（如React/Vue），仅原生HTML/CSS/JS。
- 主要交互逻辑集中在 `js/home.js`，如需扩展功能建议在此文件中实现。

## 重要文件说明
- `push.py`：自动化推送脚本，需配合 `requirements.txt`。
- `.github/workflows/*.yml`：CI/CD流程，包含同步、日志清理等自动化任务。
- `list.txt`：可能用于内容索引或批量处理，具体格式请参考现有内容。

## 示例：添加新页面
1. 在根目录创建 `newpage.html`，并添加所需内容。
2. 在 `css/` 和 `js/` 目录下添加对应样式和脚本（如有需要）。
3. 在主页面或导航栏（如 `index.html` 或 `js/home.js`）中添加跳转链接。

## 其他说明
- 本项目适合直接在本地预览，或通过GitHub Pages等静态托管服务发布。
- 所有自动化和同步流程均通过GitHub Actions实现，无需手动干预。

---

## 前端现代化与界面优化建议

- 推荐使用 CSS3 的圆角（border-radius）、阴影（box-shadow）、渐变（linear-gradient）等属性美化导航、卡片、按钮等元素。
- 建议主色调采用蓝紫渐变，辅以白色卡片和柔和阴影，提升整体视觉层次。
- 悬停、点击等交互建议加动画（transition），提升用户体验。
- 图标可用 Font Awesome 或 SVG，保证清晰度和兼容性。
- 页面布局建议采用弹性盒（flex）或网格（grid），适配不同屏幕宽度。
- 推荐所有新样式集中在对应 CSS 文件，命名规范统一，便于维护。
- 交互逻辑建议集中在 `js/home.js`，如需扩展，采用模块化结构。

### 示例：现代导航栏样式