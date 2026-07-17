export type ModuleTone = "violet" | "blue" | "green";

export type LearningModule = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  cardSummary: string;
  description: string;
  tone: ModuleTone;
  cardTags: string[];
  areas: Array<{
    slug?: string;
    title: string;
    summary: string;
    tags: string[];
  }>;
};

export const modules: LearningModule[] = [
  {
    slug: "foundations",
    index: "01",
    title: "稳定基础",
    eyebrow: "Stable Foundations",
    cardSummary: "建立判断，不追逐语法。",
    description: "理解系统为何这样运行，知道面对不同问题时该如何选择技术方案。",
    tone: "violet",
    cardTags: ["产品", "系统", "数据"],
    areas: [
      {
        slug: "product-and-users",
        title: "产品与用户",
        summary: "问题、价值与边界",
        tags: ["需求", "体验", "指标"],
      },
      {
        slug: "systems-and-abstractions",
        title: "系统与抽象",
        summary: "结构、约束与取舍",
        tags: ["架构", "接口", "复杂度"],
      },
      {
        slug: "data-and-models",
        title: "数据与模型",
        summary: "事实、状态与关系",
        tags: ["建模", "查询", "一致性"],
      },
      {
        slug: "network-and-computing",
        title: "网络与计算",
        summary: "请求、资源与性能",
        tags: ["协议", "并发", "存储"],
      },
      {
        slug: "security-and-boundaries",
        title: "安全与边界",
        summary: "身份、信任与风险",
        tags: ["认证", "授权", "审计"],
      },
      {
        slug: "ai-and-evaluation",
        title: "AI 与评测",
        summary: "概率、上下文与验证",
        tags: ["模型", "提示", "评测"],
      },
    ],
  },
  {
    slug: "systems",
    index: "02",
    title: "能力系统",
    eyebrow: "Capability Systems",
    cardSummary: "围绕问题，掌握完整方案。",
    description: "以真实能力为学习单位，贯通产品、各端、数据与运维。",
    tone: "blue",
    cardTags: ["权限", "支付", "网关"],
    areas: [
      {
        title: "身份与权限",
        summary: "从登录到组织治理",
        tags: ["SSO", "RBAC", "多租户"],
      },
      {
        title: "支付与交易",
        summary: "从下单到账务闭环",
        tags: ["订单", "支付", "对账"],
      },
      {
        title: "数据与缓存",
        summary: "从读写到一致性",
        tags: ["数据库", "多级缓存", "同步"],
      },
      {
        title: "消息与任务",
        summary: "从异步到可靠执行",
        tags: ["队列", "调度", "幂等"],
      },
      {
        title: "网关与流量",
        summary: "从入口到系统保护",
        tags: ["路由", "限流", "灰度"],
      },
      {
        title: "客户端与 OTA",
        summary: "从发布到持续演进",
        tags: ["版本", "热更新", "回滚"],
      },
      {
        title: "可观测与可靠性",
        summary: "从运行到故障恢复",
        tags: ["日志", "指标", "追踪"],
      },
      {
        title: "模型网关",
        summary: "从调用到成本治理",
        tags: ["路由", "配额", "降级"],
      },
      {
        title: "RAG 与 Agent",
        summary: "从知识到可靠行动",
        tags: ["检索", "工具", "评测"],
      },
    ],
  },
  {
    slug: "scenarios",
    index: "03",
    title: "产品场景",
    eyebrow: "Product Scenarios",
    cardSummary: "组合能力，交付真实产品。",
    description: "从具体场景出发，组合能力系统，完成端到端交付。",
    tone: "green",
    cardTags: ["SaaS", "多端", "AI 原生"],
    areas: [
      {
        title: "AI 原生 SaaS",
        summary: "产品闭环与模型能力",
        tags: ["订阅", "用量", "Agent"],
      },
      {
        title: "电商与交易",
        summary: "商品、履约与资金",
        tags: ["库存", "订单", "支付"],
      },
      {
        title: "内容与社区",
        summary: "生产、分发与治理",
        tags: ["创作", "推荐", "审核"],
      },
      {
        title: "多端客户端",
        summary: "一致体验与持续交付",
        tags: ["Web", "App", "桌面端"],
      },
      {
        title: "企业协作",
        summary: "组织、流程与合规",
        tags: ["权限", "工作流", "审计"],
      },
      {
        title: "数据产品",
        summary: "采集、分析与决策",
        tags: ["埋点", "指标", "洞察"],
      },
    ],
  },
];

export function getModule(slug: string) {
  const learningModule = modules.find((item) => item.slug === slug);

  if (!learningModule) {
    throw new Error(`Unknown module: ${slug}`);
  }

  return learningModule;
}
