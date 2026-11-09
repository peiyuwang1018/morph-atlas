# 人形机器人 · 收录与后续对接文档
## 机器人本体图鉴 v0.1 人形扩展

资料快照：2026-10-29。本轮扩展在 v0.1 基础上完成；原始 v0.1 Git 标签和交付归档保留。不是统一实测，也不是采购排名。

### 1. 当前覆盖

完整保留 [Humanoid Intel 数据库](https://humanoidintel.ai/robots/) 的 43 个型号索引（来源页更新日 2026-09-22）。按具体版本扩展为 56 条记录，其中 38 条已有官方资料、18 条仅完成基底索引。已有一手资料不表示所有指标均完整。当前 198 项数值均保留单位、条件和来源。

基底 43 条中已有 25 条获得一手资料补充，其余 18 条保留待核。宇树额外拆分了 EDU、AIR、Plus、H1-2 等不同配置；新增当前 NEO，与 NEO Beta 分开。

| 范围 | 本版内容 |
| --- | --- |
| 宇树 | G1 / G1 EDU、G1+ / G1+ EDU、R1 AIR / R1 / R1 EDU、H1、H1-2、H2 / H2 EDU、H2-X / H2-X EDU、H2 Plus，共 14 配置 |
| 国内其他 | Booster T1、Fourier GR-1 / GR-2、AGIBOT A2 / A2 Ultra、Walker S2、ENGINEAI T800 Basic、LimX Oli EDU、RobotEra L7、Astribot S1、小米 CyberOne、Galbot G1 |
| 国际 | Atlas 2026 商业版、Digit v4、Apollo 1、NEO Beta / 当前 NEO、Figure 02 / 03、4NE1 V7、AEON、HMND 双足 / 轮式、Phoenix 第六代 |
| 页面 | 卡片 / 列表、搜索、地区 / 厂商 / 形态 / 状态 / 证据筛选、数值筛选、详情、最多 4 型号对比、CSV、JSON |

导航顺序：关节驱动器 → 四足机器人 → 人形机器人 → 机械臂 → 灵巧手。机械臂仍是单臂与双臂规划入口。

### 2. 数值与筛选口径

默认“仅一手参数”：未知值显示 —，不按 0 参与数值筛选。所有型号仍可被搜索和浏览。

可选择“缺失项含基底待核值 †”：仅在当前条目缺少一手值时使用基底值，页面、排序、筛选、对比和 CSV 同步切换。† 是待核值，不能视为厂商规格。详情“证据与基底”并列保留原始值，即使已被一手资料替代，也不会删除历史差异。

- 高度为 m、质量为 kg、速度为 m/s、续航为 h、负载为 kg、峰值扭矩为 N·m、电池能量为 Wh。
- 全身 DOF 的含手 / 不含手范围随指标保留。Galbot 21 DOF 是官方分项求和，不含底盘及末端；不能与所有运动轴总数直接比较。
- 单臂负载与整机 / 双臂搬运分列。来源只写“payload”但无法判定口径时留在备注，不强制入数值列。
- 行走、跑步、轮式底盘速度保留工况；手臂末端速度不会当成整机移动速度。
- 续航范围、上限和近似值保留限定符。范围筛选使用记录值（范围通常取下限，详见条件），不表示所有配置都达到该值。
- 供货、试点和科研原型是不同状态。官网出现产品不等于量产或开放销售。
- 仅基底条目的国家 / 地区也待核，暂沿用来源标注；不是已经独立验证的公司注册地。

### 3. 本轮发现的关键差异

| 型号 | 处理方式 |
| --- | --- |
| Atlas | 明确为 2026 商业版，官方 1.9 m / 90 kg / 56 DOF；不沿用早期 Atlas 的参数。负载需区分持续、瞬时和单手 |
| Unitree H1 Pro | 基底存在此名称，但没有匹配官方具体版本，保持待核；不自动映射 H1-2 |
| G1 / R1 EDU | 按官方配置下限及完整范围记录，不能把最高 DOF 套用到基础版 |
| H2 Plus | 本体 31 DOF 与含双手 75 DOF 分开说明，卡片不混用 |
| NEO / NEO Beta | 当前 Early Access 与 2024 Beta 独立条目，不互相填参数 |
| Figure 02 | 按官方历史状态记录；不能用 Figure 03 数值填补 |
| Digit / Apollo / 4NE1 / Phoenix | 明确代际或手册版本；后续新代另建 ID，不覆写旧代 |
| Galbot G1 | V2.0 手册 92.5 kg 与基底 55 kg 不一致；两者分别保留；最高 1.73 m、轮式底盘 |
| Astribot S1 | 末端动作速度不转写为整机移动速度；形态尚待明确资料核对 |
| GR-2 / L7 | 手册版本、含手 DOF、质量是否含手、关节峰值工况必须一起查看 |

### 4. 待核队列

以下条目已可搜索、打开详情并追溯基底，尚未完成一手数值与图片补充：

- Clone Alpha
- Dexmate Vega
- Dobot Atom
- Fauna Sprout
- H1 Pro
- Iron
- KAIST Humanoid v0.7
- Kepler Forerunner
- MagicBot G1
- Noble Humanoid
- Noetix N2
- Optimus Gen 2
- Phantom MK-1
- Protoclone V1
- PUDU D9
- Sunday Home
- Tiangong
- Walker X

优先补齐 Tesla Optimus Gen 2、Dobot Atom、天工、PUDU D9、Walker X、Kepler，并复核 Sunday Home 的型号和地区。新代 Digit 5、Apollo 2、NEURA Gen4 应单独建档，不替换已收录历史代际。上述名单是后续复核计划，不代表这些平台不存在官方资料。

### 5. 数据维护与模块对接

| 文件 | 作用 |
| --- | --- |
| `research/humanoids/baseline.json` | 43 条基底快照，保留原字段与查询时间 |
| `research/humanoids/primary-*.json` | 分组整理的一手记录与来源；修改这里后重新合并 |
| `scripts/build-humanoids.py` | 验证 ID、来源、指标条件和图片，并输出页面数据 |
| `dist/data/humanoids.json` | 浏览器与其他分析模块可读取的完整数据 |
| `dist/humanoid-logic.js` | 统一筛选、排序、缺失值、证据口径及 CSV 逻辑 |
| `dist/humanoids.js` | 卡片 / 列表、详情、比较和交互 |
| `dist/assets/humanoids/` | 官方图片；系列共图与局部图在图注中说明 |
| `scripts/humanoids.test.mjs` | 数据完整性、筛选与证据口径检查 |

新增型号用稳定 ID。`baselineNames` 只能引用精确基底名称；额外别名放 `aliases`。不同代际、硬件配置或统计范围变化时建立新 ID。

每项数值结构如下：

```json
{"value": 1.73, "unit": "m", "source": "OFFICIAL-GALBOT-G1", "condition": "最大整机高度 1730 mm"}
```

支持 `qual` 表示 ≥、≤、>、<、≈，不得丢弃原文条件。推导值需在 condition 写出计算方法。来源记录包括 title、url、kind、version、locator。未知指标不要填 0。

`handIds` 与 `actuatorIds` 预留图鉴关联，仅在官方明确型号、且目标库已有稳定 ID 后填写；目前没有通过外观猜测硬件映射。整机最大关节峰值不能直接推断所有关节电机性能。

维护步骤：修改一手 JSON → 合并脚本 → 数据与交互检查 → 更新本文 → 重新生成文档网页 → 预览 → 发布原站点。

### 6. 下一轮优先事项

1. 补齐 18 个仅基底条目的官方手册和原图，并复核地区、代际和配置。
2. 将 DOF 进一步拆成身体 / 双手 / 腕 / 颈等字段；加入臂展、足底尺寸、驱动形式、减速器、传感器和通讯接口。
3. 将速度拆为稳定行走、短时跑步与轮式底盘；负载拆为连续搬运、瞬时举升、单臂和双臂工况。
4. 补充论文、实验室采用证据和独立测试数据，区分厂商宣称和科研实测。
5. 建立整机—关节—灵巧手映射，再开展质量、尺度、负载与关节扭矩密度分析。

### 7. 版本与交付

原始 v0.1 归档保持不变。本轮为 v0.1 人形扩展工作快照；以 Sites 实际发布结果判断是否已上线。本地完成不等于线上更新。网站保持原有访问范围。
