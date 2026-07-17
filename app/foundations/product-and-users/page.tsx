import type { Metadata } from "next";
import { CopyPrompt } from "../../components/CopyPrompt";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "产品与用户",
  description: "从模糊想法，到可验证的问题。",
};

const flow = ["现象", "用户", "场景", "问题", "价值", "最小方案", "验证"];

const judgments = [
  {
    title: "现象不一定是真问题",
    description: "抱怨、低效只是线索；先找反复受阻的任务。",
    decision: "是否继续调查",
  },
  {
    title: "用户不能是“所有人”",
    description: "先锁定一种处境相近的人，选择才有依据。",
    decision: "先服务谁",
  },
  {
    title: "场景是一段完整任务",
    description: "从触发到结果，不是一张页面或一次点击。",
    decision: "边界画在哪里",
  },
  {
    title: "方案不等于需求",
    description: "“做个 AI 助手”是办法，不是要解决的问题。",
    decision: "方案能否替换",
  },
  {
    title: "价值必须能够验证",
    description: "说清什么结果会更快、更稳或更容易。",
    decision: "何时继续投入",
  },
];

const caseColumns = [
  {
    type: "事实",
    title: "已经知道",
    items: [
      "网站已有三层能力地图",
      "首篇学习页还没有真实使用反馈",
      "本轮只打磨一篇内容样板",
    ],
  },
  {
    type: "假设",
    title: "当前认为",
    items: [
      "先帮助正要把想法交给 AI 的人",
      "在写方案或动工前使用",
      "一页认知地图比长教程更易形成判断",
    ],
  },
  {
    type: "待验证",
    title: "还不能断言",
    items: [
      "看完能否写出可验证的问题",
      "是否能据此删掉不必要的功能",
      "是否愿意继续与 AI 追问",
    ],
  },
];

const tradeoffs = [
  {
    left: "服务所有学习者",
    right: "先服务一种明确的人",
    note: "对象待你确认",
  },
  {
    left: "建设知识百科",
    right: "围绕真实任务组织",
    note: "当前选择",
  },
  {
    left: "用阅读量衡量",
    right: "看能否解决实际问题",
    note: "当前选择",
  },
];

const prompt =
  "我在考虑【想法或需求】。已知信息：【】。请不要先给方案，把内容分成四栏：①已确认事实 ②我的推测 ③我已经提出的方案 ④仍需验证的问题。指出最关键的未知项，并建议一个最低成本的验证动作。";

export default function ProductAndUsersPage() {
  return (
    <main className="product-shell tone-violet">
      <div className="product-frame">
        <SiteHeader backHref="/foundations" backLabel="返回稳定基础" />

        <article className="product-map">
          <header className="product-hero">
            <div className="product-hero-title">
              <p className="product-eyebrow">Stable Foundations · 01 / 06</p>
              <h1>产品与用户</h1>
              <p className="product-subtitle">从模糊想法，到可验证的问题</p>
              <div className="product-status" aria-label="页面状态">
                <span>内容样板 v0.1</span>
                <span>共创中</span>
              </div>
            </div>

            <blockquote className="product-thesis">
              <span>核心判断</span>
              <p>
                产品不从功能开始。先说清：<strong>谁</strong>在什么情况下，被什么
                <strong>阻碍</strong>；再证明解决后，结果真的<strong>变好</strong>。
              </p>
            </blockquote>
          </header>

          <figure className="product-flow">
            <div className="section-kicker">
              <span>一张图看懂</span>
              <strong>先定义，再验证</strong>
            </div>
            <ol aria-label="从现象到验证的产品问题链">
              {flow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <figcaption>
              前五步不断收窄问题；最后只做足够小的尝试，让事实回答是否继续。
            </figcaption>
          </figure>

          <section className="judgment-section" aria-labelledby="judgment-title">
            <div className="section-kicker">
              <span id="judgment-title">五个核心判断</span>
              <strong>用来做选择，不用来背诵</strong>
            </div>
            <div className="judgment-grid">
              {judgments.map((item, index) => (
                <article className="judgment-card" key={item.title}>
                  <span className="judgment-index">0{index + 1}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <p className="judgment-decision">
                    <span>影响决策</span>
                    {item.decision}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="case-and-tradeoffs">
            <section className="case-study" aria-labelledby="case-title">
              <div className="section-kicker">
                <span>真实案例</span>
                <strong id="case-title">super-context 现在怎么想</strong>
              </div>
              <div className="case-grid">
                {caseColumns.map((column) => (
                  <article className={`case-column case-${column.type}`} key={column.type}>
                    <span>{column.type}</span>
                    <h2>{column.title}</h2>
                    <ul>
                      {column.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="tradeoff-panel" aria-labelledby="tradeoff-title">
              <div className="section-kicker">
                <span>三个取舍</span>
                <strong id="tradeoff-title">选择定义产品</strong>
              </div>
              <div className="tradeoff-list">
                {tradeoffs.map((item) => (
                  <article key={item.left}>
                    <div>
                      <span>{item.left}</span>
                      <b aria-hidden="true">→</b>
                      <strong>{item.right}</strong>
                    </div>
                    <small>{item.note}</small>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="product-closing">
            <CopyPrompt prompt={prompt} />
            <section className="cocreate-card" aria-labelledby="cocreate-title">
              <span>下一轮从这里开始</span>
              <h2 id="cocreate-title">
                super-context 首先应该帮助哪一种人，在什么具体时刻，完成什么原本困难的任务？
              </h2>
            </section>
          </div>
        </article>

        <footer className="product-footer">
          <span>网页保存认知骨架</span>
          <span>AI 随时展开细节</span>
        </footer>
      </div>
    </main>
  );
}
