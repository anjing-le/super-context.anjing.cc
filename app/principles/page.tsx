import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "理念与指引",
  description: "成为 AI 的超级上下文：理解问题、连接系统、判断取舍并验证结果。",
};

const principles = [
  {
    index: "01",
    title: "学习完整系统",
    body: "不按前端、后端或客户端分割知识；围绕真实能力，贯通产品、各端、数据、架构与运维。",
    tone: "violet",
  },
  {
    index: "02",
    title: "人判断，AI 展开",
    body: "人负责目标、上下文、边界、取舍与验收；AI 负责研究、方案、编码与迭代。",
    tone: "blue",
  },
  {
    index: "03",
    title: "用交付完成学习",
    body: "从真实场景出发，把理解变成可运行、可验证、可观测、可迭代的产品。",
    tone: "green",
  },
];

const learningLoop = ["场景", "全景", "取舍", "实现", "验证", "沉淀"];

export default function PrinciplesPage() {
  return (
    <main className="principles-shell">
      <div className="principles-frame principles-page">
        <SiteHeader backHref="/" backLabel="返回" />

        <div className="principles-content">
          <section className="principles-intro" aria-labelledby="principles-title">
            <header className="principles-hero">
              <p>Principles</p>
              <h1 id="principles-title">
                成为 AI 的
                <br />
                超级上下文。
              </h1>
              <p className="principles-lead">
                模型会越来越强。人的价值，是定义问题、连接全局、判断取舍。
              </p>
            </header>

            <div className="principles-thesis">
              <p>Super Context</p>
              <strong>
                知道什么场景需要什么能力，给 AI 足够上下文，并对最终结果负责。
              </strong>
            </div>
          </section>

          <section className="principles-grid" aria-label="三条学习原则">
            {principles.map((principle) => (
              <article
                className={`principle-card tone-${principle.tone}`}
                key={principle.index}
              >
                <span>{principle.index}</span>
                <div>
                  <h2>{principle.title}</h2>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="principles-bottom" aria-label="学习方法与深度">
            <div className="principles-loop">
              <p>学习循环</p>
              <ol>
                {learningLoop.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <p className="principles-depth">
              <span>这不是放弃深度。</span>
              是把深度放在理解、判断与验证上。
            </p>
          </section>
        </div>

        <footer className="principles-footer">
          <Link href="/">查看能力地图 ↗</Link>
          <span>Super Context</span>
        </footer>
      </div>
    </main>
  );
}
