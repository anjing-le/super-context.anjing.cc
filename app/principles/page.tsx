import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "理念与指引",
  description: "Super Context 的学习理念、人与 AI 的分工，以及能力系统的学习方法。",
};

const principles = [
  {
    title: "从知识点，到能力系统",
    body: "权限、支付、缓存、网关、OTA、模型网关——每一个主题都应同时包含产品、各端、数据、架构与运维。",
  },
  {
    title: "从技术目录，到真实场景",
    body: "不按前端、后端或客户端分割学习；从一个真实问题出发，理解完整链路与关键取舍。",
  },
  {
    title: "从记住细节，到建立判断",
    body: "语法与实现细节可以交给 AI；机制、边界、风险、成本与验收标准必须由人掌握。",
  },
  {
    title: "从完成代码，到交付产品",
    body: "学习的终点不是“看过”，而是可运行、可验证、可观测、可迭代的产品结果。",
  },
];

const learningLoop = [
  ["01", "场景", "它解决谁的什么问题？"],
  ["02", "全景", "产品、数据与系统如何协作？"],
  ["03", "取舍", "边界、风险与成本在哪里？"],
  ["04", "实现", "为 AI 提供足够上下文。"],
  ["05", "验证", "用指标、测试和反馈验收。"],
  ["06", "沉淀", "把结果变成可复用的能力。"],
];

export default function PrinciplesPage() {
  return (
    <main className="principles-shell">
      <div className="principles-frame">
        <SiteHeader backHref="/" backLabel="返回" />

        <header className="principles-hero">
          <p>Principles</p>
          <h1>成为 AI 的<br />超级上下文。</h1>
        </header>

        <section className="manifesto" aria-label="核心理念">
          <p>我们不与 AI 竞争细节记忆和代码产量。</p>
          <strong>
            人负责定义问题、组织上下文、组合系统、判断取舍与验证结果。
          </strong>
        </section>

        <section className="principle-section" aria-labelledby="belief-title">
          <div className="section-heading">
            <span>01</span>
            <h2 id="belief-title">我们相信</h2>
          </div>
          <div className="principle-list">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="roles" aria-label="人与 AI 的分工">
          <article>
            <span>Human</span>
            <h2>方向与判断</h2>
            <p>目标 · 边界 · 取舍 · 验收</p>
          </article>
          <article>
            <span>AI</span>
            <h2>展开与实现</h2>
            <p>研究 · 方案 · 编码 · 迭代</p>
          </article>
        </section>

        <section className="principle-section" aria-labelledby="loop-title">
          <div className="section-heading">
            <span>02</span>
            <h2 id="loop-title">学习循环</h2>
          </div>
          <ol className="learning-loop">
            {learningLoop.map(([index, title, description]) => (
              <li key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing-note">
          <p>这不是放弃深度。</p>
          <strong>是把深度放在理解、判断与验证上。</strong>
        </section>

        <footer className="principles-footer">
          <Link href="/">查看能力地图 ↗</Link>
          <span>Super Context</span>
        </footer>
      </div>
    </main>
  );
}
