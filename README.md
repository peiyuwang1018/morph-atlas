# MorphAtlas · 机器人本体图鉴

A bilingual atlas of robot hardware. Explore specifications, compare performance, and trace original sources.

**[打开图鉴 / Explore the atlas](https://peiyuwang1018.github.io/morph-atlas/)** · **[CubeMars 产品矩阵](https://peiyuwang1018.github.io/morph-atlas/docs/cubemars.html?lang=zh)**

从关节驱动器到机器人整机，按型号、配置和原始证据整理本体性能。支持中文 / English、卡片与列表、指标筛选，以及驱动器收藏与性能散点对比。

## Catalogue

| Section | Current coverage |
| --- | --- |
| 关节驱动器 / Actuators | 163 model / voltage / feedback configurations, 12 brands |
| CubeMars matrix | 74 configurations across AK, AKA, AKH, AKE, RI, RI-PH, RO, GL II, GL and G |
| 四足机器人 / Quadrupeds | 61 configurations |
| 人形机器人 / Humanoids | 56 records, including 38 with primary-source specifications |
| 机械臂 / Robot arms | Planned: single-arm and dual-arm platforms |
| 灵巧手 / Dexterous hands | 19 records |

Catalogue release: **v0.2.2**. CubeMars data review: **2026-11-03**. Record-specific sources and review dates appear in the profiles; this deployment does not imply a new specification review.

## Features

- Filter actuators by manufacturer, family, integration level, driver, encoder, torque, ratio, mass, power and speed.
- Keep rated, peak and stall torque separate, with original operating conditions and sources.
- Distinguish motor-shaft values from geared-output values and bare motors from complete modules.
- Save favorites in the current browser; choose scatter-plot axes and export SVG or coordinate CSV.
- Explore model profiles, original evidence and structured data; switch between Chinese and English.

Missing or conflicting specifications stay explicit. The AKE90-8 KV35 knee entry is a user-reported planned selection, with installation and external-controller details still unconfirmed.

## Run locally

No dependency installation is needed. From this repository:

```sh
python3 -m http.server 8781 --bind 127.0.0.1 --directory dist
```

Open <http://127.0.0.1:8781/>. Serve the files over HTTP rather than opening `index.html` directly.

## Publishing and updates

The workflow in `.github/workflows/pages.yml` publishes the existing `dist/` folder to GitHub Pages on updates to `main`. In **Settings → Pages**, set the source to **GitHub Actions** before the first deployment. The workflow can also be started manually from **Actions**.

The maintained research project generates the website and data; this repository contains the published static snapshot. To update, replace `dist/` with the next reviewed export, commit and push. It does not scrape manufacturer websites during deployment.

Deployment instructions: [DEPLOYMENT.md](DEPLOYMENT.md). Technical handoff: [中文](dist/docs/handoff.md) / [English](dist/docs/en/handoff.html).

## Sources and attribution

Profiles link to manufacturer catalogues, official product pages and research publications. Product images and documents retain their source attributions. English interface text and catalogue summaries are translated; original technical conditions may remain in the source language.

Favorites and appearance preferences are stored in the visitor's browser and are not synchronized between the local website and GitHub Pages.
