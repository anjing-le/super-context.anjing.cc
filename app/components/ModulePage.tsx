import Link from "next/link";
import type { LearningModule } from "../site-data";
import { SiteHeader } from "./SiteHeader";

export function ModulePage({ module }: { module: LearningModule }) {
  return (
    <main className={`detail-shell tone-${module.tone}`}>
      <div className="detail-frame">
        <SiteHeader backHref="/" backLabel="返回" />

        <header className="detail-hero">
          <p className="detail-index">
            {module.index} · {module.eyebrow}
          </p>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
        </header>

        <section className="area-grid" aria-label={`${module.title}能力地图`}>
          {module.areas.map((area, index) => {
            const content = (
              <>
                <span className="area-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="area-card-face area-card-front">
                  <h2>{area.title}</h2>
                </div>
                <div className="area-card-face area-card-back">
                  <p>{area.summary}</p>
                  <ul aria-label={`${area.title}关键词`}>
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                {area.slug ? (
                  <span className="area-arrow" aria-hidden="true">
                    ↗
                  </span>
                ) : null}
              </>
            );

            return area.slug ? (
              <Link
                aria-label={`${area.title}：${area.summary}`}
                className="area-card area-card-link"
                href={`/${module.slug}/${area.slug}`}
                key={area.title}
              >
                {content}
              </Link>
            ) : (
              <article
                aria-label={`${area.title}：${area.summary}`}
                className="area-card"
                key={area.title}
                tabIndex={0}
              >
                {content}
              </article>
            );
          })}
        </section>

        <footer className="detail-footer">
          <span>持续补全</span>
          <Link href="/principles">学习指引 ↗</Link>
        </footer>
      </div>
    </main>
  );
}
