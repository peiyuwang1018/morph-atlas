# 将机器人本体图鉴部署到 GitHub Pages

当前网站是纯静态 HTML / CSS / JavaScript，数据和图片已包含在 `dist/` 中。无需服务器、数据库、ChatGPT 登录或额外构建步骤。

## 首次部署

1. 在 GitHub 创建空仓库，建议名称为 `morph-atlas`。GitHub Free 用户使用公开仓库即可使用 Pages。不要预先添加 README、License 或 `.gitignore`，避免与导入文件冲突。
2. 将准备好的发布包解压。在 GitHub Desktop 中选择 **File → Clone repository → URL**，填入新仓库链接并下载到一个新目录；将发布包内的 `dist/`、`.github/`、`README.md` 复制到这个仓库目录。提交更改后 **Push origin**，分支使用 `main`。也可以直接将新仓库链接交给维护者继续上传。
3. 仓库中必须同时有 `dist/index.html` 和 `.github/workflows/pages.yml`。`.github` 是隐藏目录，上传时请保留它。勿只上传 ZIP 文件本身。
4. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
5. 打开 **Actions → Deploy MorphAtlas → Run workflow → main**，运行一次。后续向 `main` 推送 `dist/` 更新会自动部署。
6. 等部署任务成功，从任务的 `github-pages` 环境或 Settings → Pages 打开站点。默认项目地址是 `https://你的GitHub用户名.github.io/morph-atlas/`。仓库改名时，以 GitHub 返回的实际地址为准。

若使用其他仓库名，现有相对路径同样适用。GitHub Pages 与本机地址各自保存浏览器收藏，不会自动同步。使用公开 Pages 后，访客可直接浏览目录；它不沿用原 Sites 的私人登录入口。

## 后续更新

在原研究项目中更新数据并生成 `dist/`，将新的 `dist/` 同步到这个 GitHub 仓库，提交并推送即可。仓库中的工作流仅发布现成 `dist/`，不重新抓取厂商网站，也不自动修改指标。

## 发布包范围

- `dist/`：网站页面、图鉴数据、图片、CSV、手册和说明页。
- `.github/workflows/pages.yml`：GitHub Pages 自动部署流程。
- `README.md`：本说明。

导出不包含原项目的 `.git/`、`.openai/`、账号连接、日志、临时抓取文件或个人工作台。

维护者重新导出命令：

```sh
python3 scripts/prepare-github-pages.py --output /一个尚不存在的目录 --zip /发布包.zip
```

## 官方说明

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
