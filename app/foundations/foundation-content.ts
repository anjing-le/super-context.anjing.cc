export type FoundationCaseType = "事实" | "假设" | "待验证";

export type FoundationContent = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  status: string[];
  thesis: {
    before: string;
    first: string;
    middle: string;
    second: string;
    after: string;
  };
  flow: string[];
  flowTitle: string;
  flowCaption: string;
  judgmentTitle: string;
  judgments: Array<{
    title: string;
    description: string;
    decision: string;
  }>;
  caseTitle: string;
  caseColumns: Array<{
    type: FoundationCaseType;
    title: string;
    items: string[];
  }>;
  tradeoffTitle: string;
  tradeoffs: Array<{
    left: string;
    right: string;
    note: string;
  }>;
  promptLabel: string;
  prompt: string;
  question: string;
};

export const foundationContents: Record<string, FoundationContent> = {
  "product-and-users": {
    slug: "product-and-users",
    index: "01",
    title: "产品与用户",
    subtitle: "从模糊想法，到可验证的问题",
    description: "从模糊想法，到可验证的问题。",
    status: ["内容样板 v1.0", "已确认"],
    thesis: {
      before: "产品不从功能开始。先说清：",
      first: "谁",
      middle: "在什么情况下，被什么阻碍；再证明解决后，结果真的",
      second: "变好",
      after: "。",
    },
    flow: ["现象", "用户", "场景", "问题", "价值", "最小方案", "验证"],
    flowTitle: "先定义，再验证",
    flowCaption: "前五步不断收窄问题；最后只做足够小的尝试，让事实回答是否继续。",
    judgmentTitle: "用来做选择，不用来背诵",
    judgments: [
      {
        title: "现象不一定是真问题",
        description: "抱怨、低效只是线索；先找反复受阻的任务。",
        decision: "是否继续调查",
      },
      {
        title: "用户不能是“所有人”",
        description: "先锁定一种处境相近的人，选择才有依据。",
        decision: "先服务谁",
      },
      {
        title: "场景是一段完整任务",
        description: "从触发到结果，不是一张页面或一次点击。",
        decision: "边界画在哪里",
      },
      {
        title: "方案不等于需求",
        description: "“做个 AI 助手”是办法，不是要解决的问题。",
        decision: "方案能否替换",
      },
      {
        title: "价值必须能够验证",
        description: "说清什么结果会更快、更稳或更容易。",
        decision: "何时继续投入",
      },
    ],
    caseTitle: "super-context 现在怎么想",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "网站已有三层能力地图",
          "首篇内容样板已经确认",
          "其余五篇沿用同一视觉骨架",
        ],
      },
      {
        type: "假设",
        title: "当前认为",
        items: [
          "先帮助正要把想法交给 AI 的人",
          "在写方案或动工前使用",
          "一页认知地图比长教程更易形成判断",
        ],
      },
      {
        type: "待验证",
        title: "还不能断言",
        items: [
          "看完能否写出可验证的问题",
          "是否能据此删掉不必要的功能",
          "是否愿意继续与 AI 追问",
        ],
      },
    ],
    tradeoffTitle: "选择定义产品",
    tradeoffs: [
      {
        left: "服务所有学习者",
        right: "先服务一种明确的人",
        note: "对象待你确认",
      },
      {
        left: "建设知识百科",
        right: "围绕真实任务组织",
        note: "当前选择",
      },
      {
        left: "用阅读量衡量",
        right: "看能否解决实际问题",
        note: "当前选择",
      },
    ],
    promptLabel: "AI 协作 · 问题拆分",
    prompt:
      "我在考虑【想法或需求】。已知信息：【】。请不要先给方案，把内容分成四栏：①已确认事实 ②我的推测 ③我已经提出的方案 ④仍需验证的问题。指出最关键的未知项，并建议一个最低成本的验证动作。",
    question:
      "super-context 首先应该帮助哪一种人，在什么具体时刻，完成什么原本困难的任务？",
  },
  "systems-and-abstractions": {
    slug: "systems-and-abstractions",
    index: "02",
    title: "系统与抽象",
    subtitle: "从复杂需求，到清楚边界",
    description: "从复杂需求，到清楚边界。",
    status: ["认知地图", "可共创"],
    thesis: {
      before: "系统设计不从画组件开始。先划清",
      first: "谁负责什么",
      middle: "、如何协作，以及哪种变化",
      second: "不该牵动全局",
      after: "。",
    },
    flow: ["目标", "边界", "职责", "接口", "约束", "取舍", "反馈"],
    flowTitle: "先划边界，再谈结构",
    flowCaption: "边界让复杂度有归属；反馈用来检验这次拆分是否真的降低了变化成本。",
    judgmentTitle: "结构要回答变化",
    judgments: [
      {
        title: "边界先于组件",
        description: "先找一起变化的事情，再决定拆成几个部分。",
        decision: "系统怎么切",
      },
      {
        title: "抽象为变化服务",
        description: "重复出现的差异才值得抽象，不为整齐而增加一层。",
        decision: "何时提取共性",
      },
      {
        title: "接口是一份承诺",
        description: "输入、输出和失败方式，都是协作双方的约定。",
        decision: "怎样独立协作",
      },
      {
        title: "依赖方向决定成本",
        description: "稳定部分不要反过来依赖经常变化的细节。",
        decision: "变化影响多大",
      },
      {
        title: "取舍必须带着约束",
        description: "没有永远最好的结构，只有此刻最重要的条件。",
        decision: "为什么这样选",
      },
    ],
    caseTitle: "super-context 如何复用结构",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "网站已有三层能力地图",
          "六篇基础内容共享阅读结构",
          "每篇内容需要独立演进",
        ],
      },
      {
        type: "假设",
        title: "当前设计",
        items: [
          "页面骨架与知识内容分开维护",
          "路由只选择一份内容配置",
          "共同样式保持阅读节奏一致",
        ],
      },
      {
        type: "待验证",
        title: "还要观察",
        items: [
          "特殊主题能否容纳进同一骨架",
          "改一篇是否不牵动其他页面",
          "一致是否会被读成重复",
        ],
      },
    ],
    tradeoffTitle: "让变化各归其位",
    tradeoffs: [
      {
        left: "一个巨型页面组件",
        right: "骨架与内容配置分离",
        note: "当前选择",
      },
      {
        left: "复制六份页面",
        right: "共享结构、独立内容",
        note: "当前选择",
      },
      {
        left: "先造完整平台",
        right: "只提取已证实的共性",
        note: "避免过早抽象",
      },
    ],
    promptLabel: "AI 协作 · 系统拆分",
    prompt:
      "我正在设计【系统或功能】。请按目标、边界、职责、接口、依赖、约束六栏拆分；指出最可能一起变化的部分，以及一个不值得现在抽象的地方。",
    question: "如果 super-context 的内容持续增加，哪一种变化最不应该牵动其他页面？",
  },
  "data-and-models": {
    slug: "data-and-models",
    index: "03",
    title: "数据与模型",
    subtitle: "从现实事实，到可用模型",
    description: "从现实事实，到可用模型。",
    status: ["认知地图", "可共创"],
    thesis: {
      before: "数据建模不从建表开始。先说清现实中有哪些",
      first: "事实",
      middle: "、如何变化，以及什么",
      second: "必须始终成立",
      after: "。",
    },
    flow: ["事实", "对象", "身份", "关系", "状态", "规则", "校验"],
    flowTitle: "先理解现实，再组织数据",
    flowCaption: "模型是对现实的取舍；校验确保系统里的记录没有背离业务事实。",
    judgmentTitle: "先问现实，再问字段",
    judgments: [
      {
        title: "数据是事实，不是页面字段",
        description: "页面会改，背后的事实要能独立存在。",
        decision: "究竟保存什么",
      },
      {
        title: "身份先于属性",
        description: "名字会变，唯一身份用来确认是否还是同一对象。",
        decision: "如何识别与去重",
      },
      {
        title: "状态不等于事件",
        description: "状态说明现在怎样，事件说明为何变成这样。",
        decision: "是否保留过程",
      },
      {
        title: "关系决定查询方式",
        description: "谁与谁关联，直接影响系统能回答哪些问题。",
        decision: "如何连接数据",
      },
      {
        title: "一致性是业务选择",
        description: "不是所有数据都要立刻同步；先看错误代价。",
        decision: "多快必须一致",
      },
    ],
    caseTitle: "super-context 如何表达内容",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "内容分为模块、主题与页面三层",
          "每页都有固定的认知块",
          "slug 是当前页面的路由身份",
        ],
      },
      {
        type: "假设",
        title: "当前设计",
        items: [
          "稳定 slug 不随标题改名而变化",
          "核心内容用结构化配置保存",
          "有 slug 才开放卡片入口",
        ],
      },
      {
        type: "待验证",
        title: "还要观察",
        items: [
          "未来主题能否继续适配这些字段",
          "标题改名是否完全不影响路由",
          "是否要保存决策记录与版本",
        ],
      },
    ],
    tradeoffTitle: "模型决定能回答什么",
    tradeoffs: [
      {
        left: "照着页面存字段",
        right: "围绕现实事实建模",
        note: "减少界面耦合",
      },
      {
        left: "全部自由文本",
        right: "结构骨架＋灵活文案",
        note: "当前选择",
      },
      {
        left: "多处复制同一名称",
        right: "保留单一事实来源",
        note: "避免不一致",
      },
    ],
    promptLabel: "AI 协作 · 数据建模",
    prompt:
      "把【业务描述】拆成：事实、对象及唯一身份、关系、状态变化、必须保持的规则。不要先建表；最后给出三个最需要回答的查询问题。",
    question:
      "super-context 最需要长期保存的，是文章内容本身，还是每轮共创后“为什么这样改”的决策记录？",
  },
  "network-and-computing": {
    slug: "network-and-computing",
    index: "04",
    title: "网络与计算",
    subtitle: "从一次请求，到可靠结果",
    description: "从一次请求，到可靠结果。",
    status: ["认知地图", "可共创"],
    thesis: {
      before: "网络调用不是本地函数。每一步都有延迟、失败和重复，设计要先回答：",
      first: "出错以后",
      middle: "会怎样，以及怎样",
      second: "安全恢复",
      after: "。",
    },
    flow: ["触发", "请求", "传输", "处理", "存储", "响应", "观测"],
    flowTitle: "看见一条完整请求",
    flowCaption: "快只是一种结果；可靠的路径还要能承受超时、重试和局部失败。",
    judgmentTitle: "先设计失败，再优化速度",
    judgments: [
      {
        title: "远程调用一定会失败",
        description: "网络或对端都可能中断，失败必须有明确出口。",
        decision: "错误怎样返回",
      },
      {
        title: "延迟会逐段累加",
        description: "每一跳都有等待和处理时间，慢不是单点感觉。",
        decision: "先优化哪里",
      },
      {
        title: "并发会放大热点",
        description: "大量请求同时到达，会争用同一份有限资源。",
        decision: "优先保护什么",
      },
      {
        title: "重试可能制造重复",
        description: "上一次也许已经成功，重做必须保证结果不变坏。",
        decision: "怎样安全重试",
      },
      {
        title: "缓存用新鲜度换速度",
        description: "副本读得更快，但可能暂时不是最新。",
        decision: "能接受多旧",
      },
    ],
    caseTitle: "一次页面访问经过什么",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "网站构建后输出静态文件",
          "浏览器从 Cloudflare 获取页面",
          "阅读过程不依赖服务端计算",
        ],
      },
      {
        type: "假设",
        title: "当前设计",
        items: [
          "静态内容经边缘分发更快更稳",
          "按路由拆分可减少单次下载",
          "发布后内容会逐步到达各节点",
        ],
      },
      {
        type: "待验证",
        title: "还要观测",
        items: [
          "首屏内容实际出现需要多久",
          "不同地区节点是否保持一致",
          "更新后旧缓存多久被替换",
        ],
      },
    ],
    tradeoffTitle: "可靠来自明确取舍",
    tradeoffs: [
      {
        left: "所有请求实时计算",
        right: "能静态生成就预先生成",
        note: "当前选择",
      },
      {
        left: "一次加载全部页面",
        right: "按访问路由加载",
        note: "控制传输量",
      },
      {
        left: "失败就无限重试",
        right: "只重试可安全重复的操作",
        note: "避免放大故障",
      },
    ],
    promptLabel: "AI 协作 · 请求链路",
    prompt:
      "请沿着【一次用户操作】画出完整请求链。对每一步标出：耗时、可能失败、是否会重复、可否缓存；最后指出最可能的瓶颈和一个安全的降级方式。",
    question:
      "如果 super-context 变慢，你最不能接受的是首屏晚出现、交互卡顿，还是内容偶尔不是最新？",
  },
  "security-and-boundaries": {
    slug: "security-and-boundaries",
    index: "05",
    title: "安全与边界",
    subtitle: "从默认不信任，到可控风险",
    description: "从默认不信任，到可控风险。",
    status: ["认知地图", "可共创"],
    thesis: {
      before: "安全不只是加登录。先说明保护什么、信任谁、允许做什么，以及出事后如何",
      first: "发现",
      middle: "和",
      second: "止损",
      after: "。",
    },
    flow: ["资产", "身份", "信任", "权限", "操作", "记录", "响应"],
    flowTitle: "先画边界，再加保护",
    flowCaption: "每跨过一条边界，都要重新验证；记录和响应决定问题能否被发现并控制。",
    judgmentTitle: "把风险限制在边界内",
    judgments: [
      {
        title: "认证不等于授权",
        description: "知道你是谁，不代表你可以做所有事情。",
        decision: "允许什么操作",
      },
      {
        title: "默认只给最小权限",
        description: "只开放完成当前任务必需的能力和时间。",
        decision: "问题影响多大",
      },
      {
        title: "跨边界的输入都不可信",
        description: "外部内容先检查，再进入核心系统使用。",
        decision: "在哪里拦截",
      },
      {
        title: "密钥不能进入前端和代码",
        description: "一旦公开就无法控制谁在使用，必须单独保管。",
        decision: "秘密放在哪里",
      },
      {
        title: "审计是安全的记忆",
        description: "记录谁在何时做了什么，才能发现与追查。",
        decision: "事后如何定位",
      },
    ],
    caseTitle: "super-context 的公开边界",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "所有学习页都可以公开阅读",
          "发布权限位于 GitHub 与 Cloudflare",
          "发布后的内容视为公开信息",
        ],
      },
      {
        type: "假设",
        title: "当前设计",
        items: [
          "公开阅读、受控发布足够支撑现阶段",
          "暂时不保存个人学习数据",
          "构建检查保护 main 的发布质量",
        ],
      },
      {
        type: "待验证",
        title: "边界可能变化",
        items: [
          "反馈是否需要保存身份信息",
          "AI 对话是否包含敏感内容",
          "多人共创是否需要细分角色",
        ],
      },
    ],
    tradeoffTitle: "安全是持续划界",
    tradeoffs: [
      {
        left: "所有内容默认公开",
        right: "敏感信息经过明确入口",
        note: "避免意外暴露",
      },
      {
        left: "多人共享一个账号",
        right: "操作对应具体身份",
        note: "保留责任链",
      },
      {
        left: "阻止每一种错误",
        right: "限制影响并能够恢复",
        note: "现实的防线",
      },
    ],
    promptLabel: "AI 协作 · 安全边界",
    prompt:
      "为【系统或功能】列出：要保护的资产、进入者身份、信任边界、允许的操作、最坏后果、需要留下的记录。最后指出当前最大的单点风险。",
    question:
      "如果 super-context 开始保存你的学习记录，哪些内容可以公开，哪些必须只对你可见？",
  },
  "ai-and-evaluation": {
    slug: "ai-and-evaluation",
    index: "06",
    title: "AI 与评测",
    subtitle: "从“看起来不错”，到持续可用",
    description: "从“看起来不错”，到持续可用。",
    status: ["认知地图", "可共创"],
    thesis: {
      before: "AI 质量不靠一次灵感。先定义真实任务、合格证据和失败类型，再用",
      first: "反复评测",
      middle: "推动",
      second: "持续改进",
      after: "。",
    },
    flow: ["任务", "样本", "上下文", "生成", "检查", "反馈", "改进"],
    flowTitle: "先定义好，再持续测",
    flowCaption: "评测不是给模型打总分，而是发现它在哪类真实任务上仍然不可靠。",
    judgmentTitle: "流畅不代表可靠",
    judgments: [
      {
        title: "输出带有不确定性",
        description: "相同输入也可能得到不同结果，关键处要能复核。",
        decision: "何时必须人工看",
      },
      {
        title: "上下文决定质量上限",
        description: "事实给得不完整，模型也可能自信地答错。",
        decision: "需要提供什么",
      },
      {
        title: "一次演示不是证据",
        description: "一个漂亮答案不能说明同类任务都稳定。",
        decision: "能否正式使用",
      },
      {
        title: "评测要贴近真实任务",
        description: "通用分数不能代替用户是否真的完成了事情。",
        decision: "到底测什么",
      },
      {
        title: "失败必须分类",
        description: "说错、遗漏和啰嗦，需要不同的改进方式。",
        decision: "下一步改哪里",
      },
    ],
    caseTitle: "这批认知地图如何评测",
    caseColumns: [
      {
        type: "事实",
        title: "已经知道",
        items: [
          "第一篇样板有明确内容骨架",
          "你已确认它节省空间且可继续",
          "其余页面沿用同一创作规则",
        ],
      },
      {
        type: "假设",
        title: "当前认为",
        items: [
          "相同密度能适配其余基础主题",
          "重复骨架会降低理解成本",
          "AI 加人工判断比独自写作更快",
        ],
      },
      {
        type: "待验证",
        title: "需要你体验",
        items: [
          "五篇内容是否准确且彼此不同",
          "读完是否能形成明确判断",
          "提示词是否能开启有用对话",
        ],
      },
    ],
    tradeoffTitle: "评测决定改进方向",
    tradeoffs: [
      {
        left: "寻找完美提示词",
        right: "先建立一组小样本",
        note: "先有尺子",
      },
      {
        left: "只看通用榜单",
        right: "测试自己的真实任务",
        note: "贴近使用",
      },
      {
        left: "评价语言是否流畅",
        right: "评价是否帮助判断",
        note: "核心标准",
      },
    ],
    promptLabel: "AI 协作 · 最小评测",
    prompt:
      "我要评测 AI 完成【任务】的质量。请先定义 3 个真实样本、合格标准和 4 类常见失败；再设计一张可重复记录结果的最小评测表，不要先优化提示词。",
    question:
      "对 super-context 的 AI 老师，你最不能接受哪一种失败：说错、说得太多，还是没有帮助你形成判断？",
  },
};

export function getFoundationContent(slug: string) {
  const content = foundationContents[slug];

  if (!content) {
    throw new Error(`Unknown foundation content: ${slug}`);
  }

  return content;
}
