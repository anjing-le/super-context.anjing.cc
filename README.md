# Super Context

AI 时代的能力与知识地图。

我们不按前端、后端或客户端切割学习，而是从真实场景出发，把产品设计、各端开发、数据、架构与 AI 组织为完整能力系统。

## 页面

- `/`：三大模块入口
- `/foundations`：稳定基础
- `/foundations/product-and-users`：「产品与用户」内容样板
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

## Cloudflare Pages

- Framework preset：`None`
- Build command：`npm run build`
- Build output directory：`out`
- Root directory：留空
