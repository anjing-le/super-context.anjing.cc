import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function readRoute(pathname = "/") {
  const route = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
  return readFile(new URL(`../out/${route}`, import.meta.url), "utf8");
}

test("首页只呈现三个能力模块", async () => {
  const html = await readRoute();
  assert.match(html, /<title>Super Context｜AI 时代能力地图<\/title>/);
  assert.equal((html.match(/class="module-card /g) ?? []).length, 3);
  assert.equal(
    (html.match(/class="module-card-face module-card-front"/g) ?? []).length,
    3,
  );
  assert.equal(
    (html.match(/class="module-card-face module-card-back"/g) ?? []).length,
    3,
  );
  assert.match(html, />基础<\/h2>/);
  assert.match(html, />能力<\/h2>/);
  assert.match(html, />产品<\/h2>/);
  assert.doesNotMatch(html, />稳定基础<\/h2>/);
  assert.doesNotMatch(html, />能力系统<\/h2>/);
  assert.doesNotMatch(html, />产品场景<\/h2>/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("理念页用一页结构表达核心方法", async () => {
  const html = await readRoute("/principles");
  assert.match(html, /理念与指引｜Super Context/);
  assert.match(html, /成为 AI 的/);
  assert.match(html, /知道什么场景需要什么能力/);
  assert.equal((html.match(/class="principle-card /g) ?? []).length, 3);
  assert.match(html, /学习完整系统/);
  assert.match(html, /人判断，AI 展开/);
  assert.match(html, /用交付完成学习/);
  assert.match(html, /学习循环/);
  assert.match(html, /是把深度放在理解、判断与验证上/);
  assert.doesNotMatch(html, /从知识点，到能力系统/);
});

test("三个模块页面都完成静态导出", async () => {
  const expected = new Map([
    ["/foundations", "稳定基础"],
    ["/systems", "能力系统"],
    ["/scenarios", "产品场景"],
  ]);

  for (const [pathname, title] of expected) {
    const html = await readRoute(pathname);

    assert.match(html, new RegExp(`<title>${title}｜Super Context<\\/title>`));
    assert.match(html, new RegExp(`<h1>${title}<\\/h1>`));
    assert.match(html, /area-card-front/);
    assert.match(html, /area-card-back/);
  }

  const foundations = await readRoute("/foundations");
  assert.match(
    foundations,
    /理解系统为何这样运行，知道面对不同问题时该如何选择技术方案。/,
  );
  assert.doesNotMatch(foundations, /获得判断技术方案的坐标系/);
});

test("六张稳定基础认知地图全部开放", async () => {
  const routes = new Map([
    ["/foundations/product-and-users", "产品与用户"],
    ["/foundations/systems-and-abstractions", "系统与抽象"],
    ["/foundations/data-and-models", "数据与模型"],
    ["/foundations/network-and-computing", "网络与计算"],
    ["/foundations/security-and-boundaries", "安全与边界"],
    ["/foundations/ai-and-evaluation", "AI 与评测"],
  ]);

  for (const [pathname, title] of routes) {
    const html = await readRoute(pathname);

    assert.match(html, new RegExp(`<title>${title}｜Super Context<\\/title>`));
    assert.equal((html.match(/class="judgment-card"/g) ?? []).length, 5);
    assert.equal((html.match(/class="case-column /g) ?? []).length, 3);
    assert.equal((html.match(/class="tradeoff-list"/g) ?? []).length, 1);
    assert.match(html, /网页保存认知骨架/);
    assert.match(html, /AI 随时展开细节/);
  }

  const foundations = await readRoute("/foundations");
  assert.equal(
    (foundations.match(/<a[^>]+class="area-card area-card-link"/g) ?? []).length,
    6,
  );
});

test("产品与用户样板保留已确认内容", async () => {
  const html = await readRoute("/foundations/product-and-users");

  assert.match(html, /<title>产品与用户｜Super Context<\/title>/);
  assert.match(html, /从模糊想法，到可验证的问题/);
  assert.match(html, /内容样板 v1.0/);
  assert.match(html, /已确认/);
  assert.equal((html.match(/class="judgment-card"/g) ?? []).length, 5);
  assert.equal((html.match(/class="case-column /g) ?? []).length, 3);
  assert.match(html, /现象.*用户.*场景.*问题.*价值.*最小方案.*验证/s);
  assert.match(html, /已确认事实.*我的推测.*我已经提出的方案.*仍需验证的问题/s);
  assert.match(
    html,
    /super-context 首先应该帮助哪一种人，在什么具体时刻，完成什么原本困难的任务？/,
  );
  assert.doesNotMatch(html, /入门任务|综合任务|10 个不诱导的访谈问题/);
});

test("starter 预览已经彻底移除", async () => {
  const [packageJson, page, modulePage, layout] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ModulePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project/);
  assert.doesNotMatch(packageJson, /binding-darwin-arm64|vinext|wrangler/);
  assert.doesNotMatch(page, /module-card-back">\s*<h2>/);
  assert.doesNotMatch(modulePage, /area-card-back">\s*<h2>/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
