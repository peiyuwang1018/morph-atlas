# 欧洲科研驱动器选型与采用证据
## 本体图鉴 v0.3 · 核查日期 2026-10-29

本次新增26条型号/配置，来自6个品牌；全库共95条、12个品牌。覆盖完整关节、串联弹性模组、成套直驱和无框电机本体。原有四足图鉴保留。

[查看欧洲科研补充的26条记录](../?scope=europe)

### 怎样理解“欧洲科研常用”

公开资料没有覆盖欧洲所有实验室的采购量、在用台数或统一论文样本，因此本次不制作“欧洲第一、第二”的使用率排名。这里整理的是有科研采用依据、值得进入选型候选库的品牌；历史论文、当前供货和具体料号实装分别记录。

欧洲机构采用的品牌不一定来自欧洲。HEBI来自美国、DYNAMIXEL来自韩国；它们与欧洲本土电机品牌应按应用场景一起考虑。

| 品牌 | 适合关注的场景 | 本次采用证据与边界 | 图谱记录 |
|---|---|---|---|
| maxon（瑞士） | 完整机器人关节、专用驱动联合开发 | ANYmal专用驱动合作；HEJ90有ETH Zürich Leva客户案例。ANYmal合作不能当作HEJ型号搭载 | HEJ50/70/90，共3条 |
| TQ-RoboDrive（德国） | 自研关节用无框力矩电机 | DLR/TORO、ETH历史ANYdrive结构、PAL的ILM/ILM-E系列案例；具体长度和轴位仍需核实 | ILM50×14、70×18、85×23，共3条 |
| FAULHABER（德国） | 微型驱动、人形腕部/手部 | iCub wrist mk.2论文明确1331T012SR及外部传动 | 12V裸电机1条 |
| MAB Robotics（波兰） | 低减速比关节、直驱、研究用驱动生态 | HoneyBadger论文和ETH腱驱动研究；没有把MD电调当完整电机，也没有将参数相似视为商用料号实装 | MA-p与MA-D，共13配置 |
| ANYbotics（瑞士） | 腿足SEA历史研究基准 | ANYdrive存在独立销售历史；目前是否继续单独供货待确认 | 2016 CAN版1条 |
| HEBI Robotics（美国） | 模块化研究机器人、六足/柔顺控制 | 捷克CTU Daisy明确X8-9/X8-16；当前T/R产品作为同品牌选型候选 | 3条当前T/R + 2条已停产X |

以上按选型场景组织，顺序不表示排名。此前已收录的CubeMars、DYNAMIXEL和宇树继续保留；既有条目没有经过本轮逐型号欧洲采用复核，因此不自动挂上“欧洲科研补充”标签。

### ANYbotics 现在卖电机吗？

**历史上单独供应过完整ANYdrive关节；目前是否仍接受独立订单，公开资料不足以确认。** [2017年厂商公告](https://www.anybotics.com/news/anybotics-update-august-2017/)明确向选定客户预发布EtherCAT版本；[ETH/ECHORD项目最终报告](https://echord.eu/public/wp-content/uploads/2019/03/Final-Report-MODU78-ETH-Zurich.pdf)记录过独立SEA销售，且与整机内关节区分。

[当前ANYbotics官网](https://www.anybotics.com/)主要展示ANYmal及巡检解决方案，本次未找到公开的独立ANYdrive购买入口。未找到入口不能证明停产，建议后续询问研究客户是否可单独采购、最小数量、控制接口和售后支持。

图谱的ANYdrive条目限定于[ETH历史版本资料](https://rsl.ethz.ch/robots-media/actuators/anydrive.html)，不代表当前ANYmal C/D/X的关节参数。你们实验室的ANYmal版本尚未确认，暂不绑定。

### MAB 是否常用？

**有欧洲科研实际采用证据，值得作为候选；没有足够统计支持“最常用”。**

- [TU Darmstadt / DFKI等《Gait in Eight》](https://arxiv.org/html/2503.08375v2)采用HoneyBadger 4.0，并披露关节及MD80控制器；论文包含MAB合作者。论文没有披露MA商业料号，不根据参数相似就绑定商店型号。
- [ETH Zürich / Balgrist的腱驱动研究](https://arxiv.org/html/2504.17736v2)使用MAB提供的电机与MD80、CANdle，支持其驱动生态在独立研究中的采用；不等于证明某款MA关节使用普及。
- [MA官方商店](https://www.mabrobotics.pl/category/ma-actuators)提供成套驱动器。MD80、MD20等是控制器，CANdle是通信接口，都没有冒充完整电机加入性能矩阵。

### 无框电机如何比较

TQ ILM属于裸定转子套件，尚需机械支承、位置传感器、驱动器和可能的减速器。其质量和扭矩记录对象与完整关节不同。图谱新增“集成层级”筛选，并在卡片、详情、对比和导出中标明轴端/模组输出端。

裸电机的减速比留空（不适用），不会伪填1:1；完整直驱模组在厂商确认无减速时可以记1:1。无配置编码器与资料未披露分别记录。电机扭矩乘传动比还需考虑效率、结构限值和控制限流，不能直接生成关节额定能力。

- [TQ：DLR/TORO技术渊源](https://www.tq-group.com/en/products/tq-robodrive/technology-expertise/frameless-pioneer/)确认ILM尺寸家族的采用背景。
- [ETH 2016腿足机器人课件](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2016/7-leggedrobots.pdf)第54张结构图标注ANYdrive中的RoboDrive ILM，但未给具体长度料号。
- [PAL Robotics案例](https://www.tq-group.com/en/products/tq-robodrive/landingpages/pal-robotics/)说明ILM向ILM-E的采用演进，不能由配图推断每个关节的具体电机。
- [iCub腕部论文](https://doi.org/10.3390/robotics8010011)明确FAULHABER 1331T012SR、外部159:1行星减速及1.38:1绳传动；本库裸电机参数没有乘比率冒充腕部实测。

### 现售、历史与版本差异

HEBI的[CTU Daisy实验室页面](https://comrob.fel.cvut.cz/robots/daisy.html)明确使用X8-9/X8-16。HEBI[官方硬件文档](https://docs.hebi.us/hardware.html)已标注X系列停产，因此本库保留其历史采用价值，并同时提供当前T/R选型样本；没有声称Daisy搭载了新T/R型号。

maxon本次采用2026年6月详细手册。HEJ50/70的峰值和部分质量与官网概览不同，按详细版本保留差异说明；持续扭矩的环境、安装和速度条件也随参数保留。[HEJ产品和ETH Leva案例](https://global.maxongroup.com/high-efficiency-joints)与[maxon × ANYbotics合作案例](https://www.maxongroup.com/en/knowledge-and-support/blog/robotic-companion-56212)分别支持系列采用与品牌合作，不混作同一证据。

### 下一步完善与对接

- 核实你实际用过的MAB型号、减速比与编码器配置；有实物铭牌或订单料号后，可添加“实验室实装”证据，但不推广为使用率。
- 询问ANYbotics当前独立ANYdrive供货状态和版本，并确认实验室ANYmal代次。
- 无框门类继续按具体绕组/电压扩展TQ ILM-E、maxon EC frameless及Kollmorgen等；先取得明确手册再纳入数值矩阵，不能把全系列最大值拼成单型号。
- 后续科研普及度统计需定义时间范围、欧洲机构名单、纳入论文和计数单位，区分“论文使用次数”“独立实验室数”“采购量”，避免以厂商客户墙代替统计。
- v0.3新增字段：integration（module/motor）、origin、availability、europeResearch、adoption（summary与evidence数组）。每项采用证据保留题名、URL、来源类型、适用边界；既有字段保持兼容。
