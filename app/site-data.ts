export type ModuleTone = "violet" | "blue" | "green";

export const capabilityDomains = {
  business: {
    code: "A",
    title: "业务治理与商业闭环",
    tone: "indigo",
  },
  collaboration: {
    code: "B",
    title: "数据、内容与系统协作",
    tone: "cyan",
  },
  operations: {
    code: "C",
    title: "交付、运行与系统治理",
    tone: "amber",
  },
  ai: {
    code: "D",
    title: "AI 原生能力",
    tone: "violet",
  },
} as const;

export type CapabilityDomain = keyof typeof capabilityDomains;

export type LearningModule = {
  slug: string;
  index: string;
  title: string;
  homeTitle: string;
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
    domain?: CapabilityDomain;
  }>;
};

export const modules: LearningModule[] = [
  {
    slug: "foundations",
    index: "01",
    title: "稳定基础",
    homeTitle: "基础",
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
    homeTitle: "能力",
    eyebrow: "Capability Systems",
    cardSummary: "围绕问题，掌握完整方案。",
    description: "以真实能力为学习单位，贯通产品、各端、数据与运维。",
    tone: "blue",
    cardTags: ["权限", "支付", "网关"],
    areas: [
      {
        slug: "identity-and-access",
        title: "身份与权限",
        summary: "谁能在什么组织中，对什么资源执行什么动作",
        tags: ["认证", "授权", "多租户"],
        domain: "business",
      },
      {
        title: "工作流与审批",
        summary: "一件事如何按状态、规则与责任人可靠流转",
        tags: ["状态机", "审批", "超时"],
        domain: "business",
      },
      {
        title: "套餐、权益与计费",
        summary: "用户买了什么、能用什么、用了多少、该收多少钱",
        tags: ["套餐", "权益", "用量"],
        domain: "business",
      },
      {
        title: "交易、支付与账务",
        summary: "一笔业务如何从下单、收款走到账务可核对",
        tags: ["订单", "支付", "对账"],
        domain: "business",
      },
      {
        title: "数据与缓存",
        summary: "业务事实如何被正确保存、快速读取并保持一致",
        tags: ["数据库", "缓存", "一致性"],
        domain: "collaboration",
      },
      {
        title: "消息、事件与任务",
        summary: "工作如何异步执行，并在失败、重复与延迟中保持可靠",
        tags: ["队列", "幂等", "补偿"],
        domain: "collaboration",
      },
      {
        title: "内容、文件与检索",
        summary: "内容如何上传、处理、授权、索引并被准确找回",
        tags: ["存储", "处理", "检索"],
        domain: "collaboration",
      },
      {
        title: "通知与触达",
        summary: "消息如何通过合适渠道，在合适时间可靠触达用户",
        tags: ["渠道", "模板", "偏好"],
        domain: "collaboration",
      },
      {
        title: "API、集成与 Webhook",
        summary: "系统如何与外部能力安全连接并持续同步状态",
        tags: ["API", "Webhook", "同步"],
        domain: "collaboration",
      },
      {
        title: "产品数据与实验",
        summary: "如何把用户行为变成可验证的产品决策",
        tags: ["埋点", "指标", "实验"],
        domain: "collaboration",
      },
      {
        title: "网关与流量",
        summary: "请求如何进入系统，并在高流量与异常下受到保护",
        tags: ["路由", "限流", "灰度"],
        domain: "operations",
      },
      {
        title: "多端交付与变更",
        summary: "多端如何兼容发布、灰度、升级与回滚",
        tags: ["版本", "兼容", "回滚"],
        domain: "operations",
      },
      {
        title: "可观测与可靠性",
        summary: "系统出了什么问题、影响谁、如何恢复并避免复发",
        tags: ["日志", "指标", "追踪"],
        domain: "operations",
      },
      {
        title: "安全、隐私与合规",
        summary: "数据如何被持续保护、合规使用并留下证明",
        tags: ["加密", "隐私", "合规"],
        domain: "operations",
      },
      {
        title: "模型网关与推理",
        summary: "模型调用如何统一路由、限额、降级、观测与控成本",
        tags: ["路由", "配额", "降级"],
        domain: "ai",
      },
      {
        title: "知识系统与 RAG",
        summary: "私有知识如何被处理、检索、授权并给出可信引用",
        tags: ["切分", "检索", "引用"],
        domain: "ai",
      },
      {
        title: "Agent 与工具执行",
        summary: "AI 如何带着状态使用工具、完成任务并从失败中恢复",
        tags: ["状态", "工具", "恢复"],
        domain: "ai",
      },
      {
        title: "AI 评测与安全",
        summary: "如何持续判断 AI 是否有效、可靠、安全且没有越权",
        tags: ["评测", "护栏", "红队"],
        domain: "ai",
      },
    ],
  },
  {
    slug: "scenarios",
    index: "03",
    title: "产品场景",
    homeTitle: "产品",
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
