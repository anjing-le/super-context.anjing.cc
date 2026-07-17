import Link from "next/link";

type SiteHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export function SiteHeader({
  backHref = "/principles",
  backLabel = "理念",
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Super Context 首页">
        Super Context
      </Link>
      <Link className="header-link" href={backHref}>
        {backLabel}
        <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
