# Super Context

AI 时代的能力与知识地图。

我们不按前端、后端或客户端切割学习，而是从真实场景出发，把产品设计、各端开发、数据、架构与 AI 组织为完整能力系统。

## 页面

- `/`：三大模块入口
- `/foundations`：六张稳定基础认知地图
- `/foundations/product-and-users`：产品与用户
- `/foundations/systems-and-abstractions`：系统与抽象
- `/foundations/data-and-models`：数据与模型
- `/foundations/network-and-computing`：网络与计算
- `/foundations/security-and-boundaries`：安全与边界
- `/foundations/ai-and-evaluation`：AI 与评测
- `/systems`：能力系统
- `/scenarios`：产品场景
- `/principles`：理念与学习指引

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物位于 `out`，是无业务后端的纯静态前端站点。

内容页的共创规则见 [`docs/super-context-content-style-prompt.md`](docs/super-context-content-style-prompt.md)。

## Cloudflare Pages

- Framework preset：`None`
- Build command：`npm run build`
- Build output directory：`out`
- Root directory：留空
