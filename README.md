# 潮汕下南洋 · 历史迁徙图

> An interactive map visualization of Chaoshan (Teochew) migration to Southeast Asia, 1684–1949.

一份基于深度搜集史料构建的**时间轴驱动**可视化地图：拖动底部时间滑块，从 1684 年康熙海禁解除到 1949 年战乱终结，地图上樟林古港、汕头港等出发地实时向曼谷、新加坡、槟城、巴达维亚、西贡、金边等南洋港口飞射**红头船粒子**与迁徙弧线，左右两侧面板同步呈现**五个历史阶段**的叙事、关键事件以及陈慈黉、张弼士、郑智勇等华侨领袖的故事。

## 主要功能

- 🗺️ **动态迁徙地图**：Mapbox GL JS（或免费的 MapLibre + OSM 降级）渲染，D3 大圆弧 + 流动粒子动画
- ⏱️ **时间轴交互**：1684–1949 整数年份滑块，支持拖动 / 1×·2×·5× 自动播放
- 🎚️ **五段历史阶段色带**：海禁初开 / 红头船鼎盛 / 汕头开埠 / 民国高峰 / 战乱终结
- 📜 **叙事面板**：每个阶段的背景、推力、典型故事
- 📈 **累计人数计数器**：右上角 odometer 数字滚动，直观感受出洋规模
- 🌟 **十大关键事件**：海禁解除、《北京条约》契约华工合法化、苏伊士运河通航、辛亥革命、抗战爆发……
- 👤 **三大人物卡**：陈慈黉（火砻王）、张弼士（南洋首富）、郑智勇（二哥丰）
- 📚 **史料引用**：每条数据都标注来源（《汕头海关志》、维基百科、广东省侨办等）

## 数据来源（节选）

- 《汕头海关志》：1864–1911 潮汕出洋 294 万人次
- 樟林古港史料 / 澄海县志：1822–1858 樟林港 88 万潮人赴暹罗
- 维基百科「下南洋」「Teochew people」
- 广东省人民政府侨务办公室、泰国潮州会馆等官方统计
- 圭海四记《南洋华侨华人五大帮人口考》

## 运行

```bash
# 1. 安装依赖
npm install

# 2.（可选）填写 Mapbox token；不填写也能跑，会自动降级到 MapLibre + OSM 免费瓦片
cp .env.example .env
# 在 https://account.mapbox.com/access-tokens 申请免费 token 后填入 .env

# 3. 启动本地开发
npm run dev
# 浏览器访问 http://localhost:5173

# 4. 构建静态产物
npm run build
# 输出到 dist/，可直接部署到 GitHub Pages / Vercel / Netlify
```

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Vite + React 18 + TypeScript |
| 地图 | Mapbox GL JS v3 / MapLibre GL JS v4（fallback） |
| 状态 | Zustand |
| 可视化 | D3.js（大圆弧 + 插值） |
| 动效 | Framer Motion + `requestAnimationFrame` 粒子 |
| 样式 | Tailwind CSS + 思源宋体（潮州红 / 海蓝 / 米黄配色） |

## 目录结构

```
src/
├── store/useTimelineStore.ts   # 时间轴 / 播放状态
├── data/                        # 全部历史数据 (TS)
│   ├── phases.ts / ports.ts / flows.ts
│   ├── events.ts / people.ts / populations.ts
├── components/
│   ├── MapView.tsx              # 地图主视图
│   ├── MigrationArcs.tsx        # 迁徙弧线 + 粒子
│   ├── PortMarkers.tsx          # 港口标记
│   ├── TimeSlider.tsx           # 时间滑块
│   ├── PhaseRibbon.tsx          # 阶段色带
│   ├── NarrativePanel.tsx       # 左侧叙事
│   ├── StatsCounter.tsx         # 累计计数器
│   ├── EventPopup.tsx
│   ├── PersonCard.tsx
│   └── Legend.tsx
└── styles/globals.css
```

## 致敬

谨以此图，致敬过去三百年间，从樟林港、汕头港启航的千万潮人，以及他们用红头船和血汗在南洋开拓出的"海外一个潮州"。

> **过番歌**：「断柴米，等饿死，无奈何，卖咕哩。」
