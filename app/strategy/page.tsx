import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AI 共同进化战略｜Super Context × AI Infra",
  },
  description:
    "从个人能力进化、企业 AI 转型到可复用基础设施，一套以真实场景、可验证价值和复利交付为核心的商业战略。",
};

const principles = [
  {
    index: "01",
    title: "场景先于 AI",
    copy: "不凭空创造 Agent。进入原本就必须完成的任务、流程和系统，让 AI 解决真实问题。",
  },
  {
    index: "02",
    title: "人判断，AI 展开",
    copy: "人提供目标、上下文、边界与验收；AI 扩展分析、执行和迭代的速度。",
  },
  {
    index: "03",
    title: "交付必须沉淀",
    copy: "每一次项目都留下方法、评测、模块与案例，成为下一次交付的起点。",
  },
  {
    index: "04",
    title: "增长不依赖堆人",
    copy: "用标准化资产持续降低边际交付成本，让收入增长快于团队规模。",
  },
];

const valueLayers = [
  {
    label: "TO C · TO EMPLOYEE",
    title: "Super Context",
    subtitle: "人与员工的 AI 能力进化",
    copy: "让个人成为 AI 的超级上下文：会定义目标、组织知识、提出约束、判断结果，并把 AI 融入稳定工作方式。",
    tags: ["内容与知识", "个人训练", "企业内训", "能力认证"],
    tone: "violet",
  },
  {
    label: "TO B · TRANSFORMATION",
    title: "AI Transformation",
    subtitle: "业务与系统的 AI 升级",
    copy: "从现有业务场景和系统出发，以诊断与 FDE 模式找到高价值切口，完成可验收、可持续使用的改造。",
    tags: ["场景诊断", "FDE 共创", "系统改造", "效果评测"],
    tone: "blue",
  },
  {
    label: "INFRA · DELIVERY",
    title: "AI Infra × NiceAPI",
    subtitle: "可拆解、可组合的技术底座",
    copy: "把模型、网关、用户、权限、计量、计费、审计与私有化能力模块化，为不同客户提供恰到好处的基础设施。",
    tags: ["模型与算力", "网关与 IAM", "计量与计费", "私有化部署"],
    tone: "green",
  },
];

const ladder = [
  ["01", "认知", "公开内容 / 方法论", "建立信任"],
  ["02", "学习", "个人训练 / 企业内训", "课程与培训费"],
  ["03", "判断", "AI 场景诊断", "诊断与方案费"],
  ["04", "改变", "固定范围 FDE 改造", "项目交付费"],
  ["05", "运行", "API / Infra / 私有化", "订阅、用量与许可"],
  ["06", "进化", "评测与持续运营", "续费与扩展收入"],
];

const missingAnswers = [
  {
    number: "01",
    title: "第一个 ICP",
    copy: "先锁定一种客户，而不是服务所有企业。优先寻找已有业务系统、效率压力明确、负责人愿意共创的团队。行业、规模和决策角色仍需进一步收窄。",
    action: "需要选择",
  },
  {
    number: "02",
    title: "第一个标准场景",
    copy: "只选 1–2 个高频、刚需、可度量的流程作为突破口。客服、知识工作、研发交付或运营都只是候选，不应同时开战。",
    action: "需要聚焦",
  },
  {
    number: "03",
    title: "价值如何验收",
    copy: "项目开始前必须记录基线，并约定时间、成本、质量或风险指标；上线后看 30 / 60 / 90 天真实使用，而不是只看 Demo。",
    action: "需要量化",
  },
  {
    number: "04",
    title: "交付边界",
    copy: "明确标准项、可选项和定制项，设置验收与退出机制。无限定制会把公司重新拖回传统外包。",
    action: "需要制度",
  },
  {
    number: "05",
    title: "单位经济模型",
    copy: "持续跟踪项目工时、毛利、获客回收期、复用率和经常性收入占比。算力可以是入口，但不应成为唯一利润来源。",
    action: "需要验证",
  },
  {
    number: "06",
    title: "安全与责任边界",
    copy: "在签约前定义数据分级、模型提供商、权限审计、部署边界与事故责任。这是企业客户是否愿意长期合作的前提。",
    action: "需要标准化",
  },
];

const hardProblems = [
  {
    problem: "诊断依赖少数专家",
    risk: "创始人成为交付瓶颈",
    mechanism: "把判断拆成问卷、评分卡、场景地图与评审机制，逐步形成可训练的诊断操作系统。",
  },
  {
    problem: "企业数据与系统复杂",
    risk: "集成拖慢项目、侵蚀毛利",
    mechanism: "先做付费诊断和数据准入；沉淀连接器与权限模板，不在未知边界下承诺固定结果。",
  },
  {
    problem: "AI 价值难归因",
    risk: "客户觉得好用，却不续费",
    mechanism: "项目之前锁定业务基线，用对照、抽样评测和持续使用数据共同验收。",
  },
  {
    problem: "模型与工具变化快",
    risk: "方案很快过时",
    mechanism: "用模型适配层、评测集和路由策略隔离变化，把护城河放在场景知识而不是单一模型上。",
  },
  {
    problem: "定制需求无限膨胀",
    risk: "规模越大，人力成本越高",
    mechanism: "设置项目准入门槛、定制比例上限和复用目标；不满足条件时只售诊断，不直接开发。",
  },
  {
    problem: "纯算力缺少差异化",
    risk: "价格战与供应商依赖",
    mechanism: "支持多模型路由和成本治理，把算力与权限、评测、场景方案及私有化服务组合销售。",
  },
];

const moats = [
  {
    level: "01",
    title: "信任与品牌",
    copy: "Super Context 持续输出一套清晰、可信、不过度承诺的 AI 进化理念。",
  },
  {
    level: "02",
    title: "场景知识与数据",
    copy: "积累真实流程、失败模式、评测集、ROI 基线和行业判断，这是通用模型拿不到的上下文。",
  },
  {
    level: "03",
    title: "交付操作系统",
    copy: "诊断标准、FDE 手册、验收机制和资产目录，让经验可以复制，让新人也能交付。",
  },
  {
    level: "04",
    title: "模块化 Infra",
    copy: "网关、IAM、计量、计费、审计与私有化适配器，缩短从方案到稳定运行的距离。",
  },
  {
    level: "05",
    title: "复利飞轮",
    copy: "每个客户贡献新场景与评测，反过来提升产品、内容、案例和下一次销售效率。",
  },
];

const gateQuestions = [
  "这是一个原本就必须完成的真实任务吗？",
  "是否有明确的业务负责人和决策人？",
  "是否能获得必要的数据、权限与流程信息？",
  "是否可以在项目开始前定义可量化基线？",
  "交付结果是否有机会沉淀为可复用资产？",
  "客户是否愿意为诊断和结果，而不只是工时付费？",
];

const metricGroups = [
  {
    label: "CUSTOMER VALUE",
    title: "客户价值",
    metrics: "时间 · 成本 · 质量 · 风险",
  },
  {
    label: "PRODUCTIZATION",
    title: "产品化效率",
    metrics: "复用率 · 单项目工时 · 上线周期",
  },
  {
    label: "BUSINESS HEALTH",
    title: "商业健康度",
    metrics: "毛利 · 回收期 · 经常性收入",
  },
  {
    label: "REAL ADOPTION",
    title: "真实采用",
    metrics: "30 / 90 天活跃 · 续费 · 扩展",
  },
];

const roadmap = [
  {
    phase: "PHASE 01",
    period: "0—3 个月",
    title: "找到最窄的正确切口",
    copy: "选择 1 个 ICP 与 1 个标准场景，找到 3 个设计伙伴，完成基线、诊断与验收体系。",
  },
  {
    phase: "PHASE 02",
    period: "3—9 个月",
    title: "把成功变成可重复产品",
    copy: "形成 2–3 个固定范围方案包，沉淀模块与评测，证明毛利提升和经常性收入。",
  },
  {
    phase: "PHASE 03",
    period: "9—18 个月",
    title: "用系统放大，而不是用人放大",
    copy: "扩展行业手册、伙伴交付和模块市场，在不同比例增加人力的前提下扩大收入。",
  },
];

export default function StrategyPage() {
  return (
    <main className="strategy-page">
      <nav className="strategy-nav" aria-label="战略页面导航">
        <a className="strategy-wordmark" href="#top">
          <span className="strategy-mark">SC</span>
          <span>共同进化</span>
        </a>
        <div className="strategy-nav-links">
          <a href="#business">商业路径</a>
          <a href="#gaps">关键缺口</a>
          <a href="#moat">护城河</a>
        </div>
        <span className="strategy-nav-status">STRATEGY · 01</span>
      </nav>

      <section className="strategy-hero" id="top">
        <div className="strategy-hero-orb strategy-hero-orb-one" />
        <div className="strategy-hero-orb strategy-hero-orb-two" />
        <div className="strategy-hero-inner">
          <div className="strategy-hero-copy">
            <p className="strategy-kicker strategy-kicker-light">
              AI CO-EVOLUTION STRATEGY · WORKING DRAFT
            </p>
            <h1>
              让人与组织，
              <br />
              在 AI 时代
              <span>共同进化。</span>
            </h1>
            <p className="strategy-hero-lead">
              不凭空制造 AI 场景。进入真实工作，改造必要流程，让每一次交付都产生可验证价值，并沉淀为下一次增长的基础。
            </p>
            <div className="strategy-hero-actions">
              <a className="strategy-button strategy-button-primary" href="#business">
                查看商业路径
              </a>
              <a className="strategy-button strategy-button-ghost" href="#moat">
                难点与护城河
              </a>
            </div>
          </div>

          <div className="strategy-hero-map" aria-label="战略价值结构">
            <div className="strategy-map-label">
              <span>VALUE ARCHITECTURE</span>
              <span>2026</span>
            </div>
            <div className="strategy-map-card strategy-map-card-person">
              <span>01</span>
              <div>
                <strong>人的进化</strong>
                <small>Super Context</small>
              </div>
            </div>
            <div className="strategy-map-connector" />
            <div className="strategy-map-card strategy-map-card-business">
              <span>02</span>
              <div>
                <strong>组织与系统进化</strong>
                <small>AI Transformation · FDE</small>
              </div>
            </div>
            <div className="strategy-map-connector" />
            <div className="strategy-map-card strategy-map-card-infra">
              <span>03</span>
              <div>
                <strong>可复用技术底座</strong>
                <small>AI Infra · NiceAPI</small>
              </div>
            </div>
            <p className="strategy-map-footnote">
              技术不是终点。它让更好的工作方式，可以稳定运行、持续复用。
            </p>
          </div>
        </div>
      </section>

      <section className="strategy-section strategy-principles">
        <div className="strategy-section-heading">
          <p className="strategy-kicker">FOUNDING THESIS</p>
          <h2>先确定不变的原则。</h2>
          <p>模型会更新，工具会更替。真正需要长期坚持的，是创造价值的方式。</p>
        </div>
        <div className="strategy-principle-grid">
          {principles.map((principle) => (
            <article className="strategy-principle-card" key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section strategy-business" id="business">
        <div className="strategy-section-heading strategy-section-heading-center">
          <p className="strategy-kicker">ONE VISION · THREE VALUE LAYERS</p>
          <h2>一家公司，三层价值。</h2>
          <p>个人能力是入口，企业转型是价值兑现，基础设施是规模化与持续收入的底座。</p>
        </div>
        <div className="strategy-value-grid">
          {valueLayers.map((layer) => (
            <article
              className={`strategy-value-card strategy-value-card-${layer.tone}`}
              key={layer.title}
            >
              <p className="strategy-value-label">{layer.label}</p>
              <h3>{layer.title}</h3>
              <h4>{layer.subtitle}</h4>
              <p className="strategy-value-copy">{layer.copy}</p>
              <div className="strategy-tag-list">
                {layer.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section strategy-ladder-section">
        <div className="strategy-section-heading strategy-section-heading-wide">
          <p className="strategy-kicker">PRODUCT & REVENUE LADDER</p>
          <h2>从建立认知，到持续运行。</h2>
          <p>
            不是把所有服务一次卖给所有人，而是让客户按真实需求进入，并自然走向更高价值、更可持续的合作。
          </p>
        </div>
        <div className="strategy-ladder">
          {ladder.map(([number, need, offer, revenue]) => (
            <article className="strategy-ladder-step" key={number}>
              <div className="strategy-ladder-number">{number}</div>
              <div>
                <p>{need}</p>
                <h3>{offer}</h3>
                <span>{revenue}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-flywheel-section">
        <div className="strategy-section strategy-flywheel-inner">
          <div className="strategy-section-heading strategy-section-heading-center strategy-heading-light">
            <p className="strategy-kicker strategy-kicker-light">THE COMPOUNDING LOOP</p>
            <h2>每一次交付，都让下一次更轻。</h2>
          </div>
          <div className="strategy-flywheel" aria-label="商业复利飞轮">
            {[
              ["01", "Super Context", "理念与能力内容"],
              ["02", "企业训练", "统一认知与方法"],
              ["03", "场景诊断", "找到价值切口"],
              ["04", "FDE 改造", "兑现业务结果"],
              ["05", "资产与 Infra", "沉淀复用底座"],
              ["06", "案例与口碑", "降低获客成本"],
            ].map(([number, title, copy], index) => (
              <div className="strategy-flywheel-item" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{copy}</small>
                {index < 5 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <p className="strategy-flywheel-note">
            核心约束：资产复用率必须持续上升，单项目交付工时必须持续下降。
          </p>
        </div>
      </section>

      <section className="strategy-section strategy-gaps" id="gaps">
        <div className="strategy-section-heading strategy-section-heading-split">
          <div>
            <p className="strategy-kicker">WHAT IS STILL MISSING</p>
            <h2>理念已经成立，<br />还缺六个经营答案。</h2>
          </div>
          <p>
            真正的商业计划，不只描述我们相信什么，还要明确先服务谁、交付什么、如何验收，以及怎样确保每一单都健康。
          </p>
        </div>
        <div className="strategy-gaps-grid">
          {missingAnswers.map((item) => (
            <article className="strategy-gap-card" key={item.number}>
              <div className="strategy-gap-top">
                <span>{item.number}</span>
                <em>{item.action}</em>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section strategy-problems">
        <div className="strategy-section-heading strategy-section-heading-wide">
          <p className="strategy-kicker">HARD PROBLEMS · DESIGNED RESPONSES</p>
          <h2>难点不会消失，但可以被设计。</h2>
          <p>每个结构性风险，都需要一套前置机制，而不是靠团队加班兜底。</p>
        </div>
        <div className="strategy-problem-table">
          <div className="strategy-problem-row strategy-problem-header">
            <span>结构性难点</span>
            <span>如果不处理</span>
            <span>我们的机制</span>
          </div>
          {hardProblems.map((item) => (
            <article className="strategy-problem-row" key={item.problem}>
              <h3>{item.problem}</h3>
              <p className="strategy-problem-risk">{item.risk}</p>
              <p>{item.mechanism}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-moat-section" id="moat">
        <div className="strategy-section strategy-moat-inner">
          <div className="strategy-moat-intro">
            <p className="strategy-kicker strategy-kicker-light">THE MOAT</p>
            <h2>护城河不是一个模型，<br />而是一套复利系统。</h2>
            <p>
              模型、Agent 和代码都会被快速复制。难以复制的是长期积累的真实场景、可信案例、评测数据、交付标准，以及它们互相增强的速度。
            </p>
          </div>
          <div className="strategy-moat-stack">
            {moats.map((moat) => (
              <article className="strategy-moat-card" key={moat.level}>
                <span>{moat.level}</span>
                <div>
                  <h3>{moat.title}</h3>
                  <p>{moat.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strategy-section strategy-gate">
        <div className="strategy-gate-card">
          <div className="strategy-gate-copy">
            <p className="strategy-kicker">THE ADMISSION GATE</p>
            <h2>保护小团队利润的六个问题。</h2>
            <p>
              六项条件优先全部满足。条件不足时，先做付费诊断，不直接进入定制开发。
            </p>
          </div>
          <ol className="strategy-gate-list">
            {gateQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{question}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="strategy-section strategy-metrics">
        <div className="strategy-section-heading strategy-section-heading-center">
          <p className="strategy-kicker">NORTH STAR & METRICS</p>
          <h2>北极星不是项目上线。</h2>
          <p className="strategy-north-star">
            交付 90 天后，客户仍在真实使用，并能证明业务结果持续改善。
          </p>
        </div>
        <div className="strategy-metric-grid">
          {metricGroups.map((group) => (
            <article className="strategy-metric-card" key={group.label}>
              <span>{group.label}</span>
              <h3>{group.title}</h3>
              <p>{group.metrics}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section strategy-roadmap">
        <div className="strategy-section-heading strategy-section-heading-wide">
          <p className="strategy-kicker">18-MONTH ROADMAP</p>
          <h2>先证明一个闭环，再复制它。</h2>
        </div>
        <div className="strategy-roadmap-grid">
          {roadmap.map((item) => (
            <article className="strategy-roadmap-card" key={item.phase}>
              <div>
                <span>{item.phase}</span>
                <em>{item.period}</em>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="strategy-footer">
        <div>
          <span className="strategy-footer-mark">SC × AI</span>
          <p>让人与组织，在 AI 时代共同进化。</p>
        </div>
        <div className="strategy-footer-meta">
          <span>STRATEGY WORKING DRAFT</span>
          <span>JULY 2026</span>
        </div>
      </footer>
    </main>
  );
}
