import Link from "next/link";
import { capabilityDomains, type LearningModule } from "../site-data";
import { SiteHeader } from "./SiteHeader";

export function ModulePage({ module }: { module: LearningModule }) {
  return (
    <main
      className={`detail-shell tone-${module.tone} module-${module.slug}`}
    >
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
            const domain = area.domain
              ? capabilityDomains[area.domain]
              : undefined;
            const areaLabel = domain
              ? `${domain.code}. ${domain.title}—${area.title}`
              : area.title;
            const content = (
              <>
                <span className="area-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="area-card-face area-card-front">
                  {domain ? (
                    <p className="area-domain-label">
                      <span>{domain.code}.</span>
                      {domain.title}
                    </p>
                  ) : null}
                  <h2>{area.title}</h2>
                </div>
                <div className="area-card-face area-card-back">
                  {domain ? (
                    <span className="area-back-title">{areaLabel}</span>
                  ) : null}
                  <p className="area-card-summary">{area.summary}</p>
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
                aria-label={`${areaLabel}：${area.summary}`}
                className={`area-card area-card-link${
                  domain ? ` area-domain-${domain.tone}` : ""
                }`}
                href={`/${module.slug}/${area.slug}`}
                key={area.title}
              >
                {content}
              </Link>
            ) : (
              <article
                aria-label={`${areaLabel}：${area.summary}`}
                className={`area-card${
                  domain ? ` area-domain-${domain.tone}` : ""
                }`}
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
