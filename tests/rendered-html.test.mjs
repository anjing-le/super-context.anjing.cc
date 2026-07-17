import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${pathname}-${process.pid}-${Date.now()}-${Math.random()}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("首页只呈现三个能力模块", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Super Context｜AI 时代能力地图<\/title>/);
  assert.equal((html.match(/class="module-card /g) ?? []).length, 3);
  assert.match(html, /稳定基础/);
  assert.match(html, /能力系统/);
  assert.match(html, /产品场景/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("理念页保存核心方法与学习循环", async () => {
  const response = await render("/principles");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /理念与指引｜Super Context/);
  assert.match(html, /成为 AI 的/);
  assert.match(html, /从知识点，到能力系统/);
  assert.match(html, /人负责定义问题、组织上下文、组合系统、判断取舍与验证结果/);
  assert.match(html, /学习循环/);
});

test("三个模块页面都可以服务端渲染", async () => {
  const expected = new Map([
    ["/foundations", "稳定基础"],
    ["/systems", "能力系统"],
    ["/scenarios", "产品场景"],
  ]);

  for (const [pathname, title] of expected) {
    const response = await render(pathname);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`<title>${title}｜Super Context<\\/title>`));
    assert.match(html, new RegExp(`<h1>${title}<\\/h1>`));
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
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
