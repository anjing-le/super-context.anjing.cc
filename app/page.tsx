import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import { modules } from "./site-data";

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-frame">
        <SiteHeader />

        <section className="module-grid" aria-label="能力地图">
          {modules.map((module) => (
            <Link
              className={`module-card tone-${module.tone}`}
              href={`/${module.slug}`}
              key={module.slug}
            >
              <span className="module-index">{module.index}</span>
              <div className="module-card-face module-card-front">
                <h2>{module.title}</h2>
              </div>
              <div className="module-card-face module-card-back">
                <h2>{module.title}</h2>
                <p>{module.cardSummary}</p>
                <ul className="module-tags" aria-label={`${module.title}主题`}>
                  {module.cardTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </section>

        <footer className="home-footer">
          <p>把细节交给 AI，把判断留给自己。</p>
        </footer>
      </div>
    </main>
  );
}
