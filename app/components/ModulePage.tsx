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
          {module.areas.map((area, index) => (
            <article className="area-card" key={area.title}>
              <span className="area-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
              </div>
              <ul aria-label={`${area.title}关键词`}>
                {area.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <footer className="detail-footer">
          <span>持续补全</span>
          <Link href="/principles">学习指引 ↗</Link>
        </footer>
      </div>
    </main>
  );
}
