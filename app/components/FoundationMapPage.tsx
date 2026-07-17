import type { FoundationContent } from "../foundations/foundation-content";
import { CopyPrompt } from "./CopyPrompt";
import { SiteHeader } from "./SiteHeader";

export function FoundationMapPage({ content }: { content: FoundationContent }) {
  return (
    <main className="product-shell tone-violet">
      <div className="product-frame">
        <SiteHeader backHref="/foundations" backLabel="返回稳定基础" />

        <article className="product-map">
          <header className="product-hero">
            <div className="product-hero-title">
              <p className="product-eyebrow">
                Stable Foundations · {content.index} / 06
              </p>
              <h1>{content.title}</h1>
              <p className="product-subtitle">{content.subtitle}</p>
              <div className="product-status" aria-label="页面状态">
                {content.status.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <blockquote className="product-thesis">
              <span>核心判断</span>
              <p>
                {content.thesis.before}
                <strong>{content.thesis.first}</strong>
                {content.thesis.middle}
                <strong>{content.thesis.second}</strong>
                {content.thesis.after}
              </p>
            </blockquote>
          </header>

          <figure className="product-flow">
            <div className="section-kicker">
              <span>一张图看懂</span>
              <strong>{content.flowTitle}</strong>
            </div>
            <ol aria-label={`${content.title}的判断路径`}>
              {content.flow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <figcaption>{content.flowCaption}</figcaption>
          </figure>

          <section className="judgment-section" aria-labelledby="judgment-title">
            <div className="section-kicker">
              <span id="judgment-title">五个核心判断</span>
              <strong>{content.judgmentTitle}</strong>
            </div>
            <div className="judgment-grid">
              {content.judgments.map((item, index) => (
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
                <strong id="case-title">{content.caseTitle}</strong>
              </div>
              <div className="case-grid">
                {content.caseColumns.map((column) => (
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
                <strong id="tradeoff-title">{content.tradeoffTitle}</strong>
              </div>
              <div className="tradeoff-list">
                {content.tradeoffs.map((item) => (
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
            <CopyPrompt label={content.promptLabel} prompt={content.prompt} />
            <section className="cocreate-card" aria-labelledby="cocreate-title">
              <span>下一轮从这里开始</span>
              <h2 id="cocreate-title">{content.question}</h2>
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
