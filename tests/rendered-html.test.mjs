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
  assert.match(html, /稳定基础/);
  assert.match(html, /能力系统/);
  assert.match(html, /产品场景/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("理念页保存核心方法与学习循环", async () => {
  const html = await readRoute("/principles");
  assert.match(html, /理念与指引｜Super Context/);
  assert.match(html, /成为 AI 的/);
  assert.match(html, /从知识点，到能力系统/);
  assert.match(html, /人负责定义问题、组织上下文、组合系统、判断取舍与验证结果/);
  assert.match(html, /学习循环/);
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
});

test("starter 预览已经彻底移除", async () => {
  const [packageJson, page, layout] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project/);
  assert.doesNotMatch(packageJson, /binding-darwin-arm64|vinext|wrangler/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
