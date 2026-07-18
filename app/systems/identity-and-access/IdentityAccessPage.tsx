import { CopyPrompt } from "../../components/CopyPrompt";
import { SiteHeader } from "../../components/SiteHeader";

const terms = [
  ["User", "用户", "产品中的全局主体记录，代表一个人或服务账号。", "图一 · 全局身份域", "不要和某个组织里的 Membership 混淆。"],
  ["Identity", "登录身份", "用户在某个身份提供方中的可验证身份，例如企业 SSO subject。", "图一、图二 · 身份域", "一个 User 可以绑定多个 Identity。"],
  ["Tenant", "租户", "组织、账单和业务数据的首要隔离边界。", "图一 · 租户边界", "Organization 或 Project 可以位于 Tenant 内部。"],
  ["Membership", "成员关系", "User 加入某个 Tenant 后的状态、角色和有效期。", "图一 · 组织关系", "角色应授予 Membership，而不是全局 User。"],
  ["Role", "角色", "把一组稳定权限包装成业务岗位，例如 Admin 或 Member。", "图一 · 授权模型", "Role 是权限集合，不是最终判断规则。"],
  ["Permission", "权限", "对某类资源执行某个动作的最小能力声明，例如 project:delete。", "图一 · 授权模型", "Permission 不等于带条件的 Policy。"],
  ["Policy", "策略", "结合主体、资源和环境条件计算 Allow 或 Deny 的规则。", "图一、图三 · 决策规则", "Policy 负责条件，Role 负责聚合。"],
  ["Resource", "资源", "真正被保护的业务对象，例如项目、文档、账单或成员。", "图一、图三 · 业务域", "资源必须先在可信 Tenant 边界内加载。"],
  ["IdP", "身份提供方", "验证登录身份并向系统提供可信身份声明。", "图二 · 身份域", "IdP 解决身份认证，不替产品决定业务权限。"],
  ["SSO", "单点登录", "让企业身份源成为统一登录入口，并完成身份联合。", "图二 · 外部身份源", "SSO 不是 MFA，二者解决的问题不同。"],
  ["MFA", "多因素认证", "在密码或 SSO 之外增加第二种身份验证因素。", "图二、图三 · 登录环节", "MFA 提高身份置信度，不直接授予资源权限。"],
  ["Session", "会话", "由服务端保存并可主动撤销的登录状态。", "图二 · 认证服务", "Session 便于即时失效，Token 便于跨服务传递。"],
  ["Token", "令牌", "携带签发时身份声明的访问凭证，通常有明确过期时间。", "图二、图三 · 请求载体", "Token 不是永远最新的权限事实。"],
  ["PEP", "策略执行点", "拦截请求、收集上下文，并执行 PDP 返回的允许或拒绝。", "图二、图三 · 网关与业务服务", "PEP 执行决策，PDP 计算决策。"],
  ["PDP", "策略决策点", "读取成员、权限、策略和资源属性，给出可解释的授权结果。", "图二、图三 · 授权控制面", "PDP 不应该直接执行业务操作。"],
  ["Audit Event", "审计事件", "保存当时谁对什么资源做了什么、结果和依据是什么。", "四张图 · 证据链", "审计日志不是为了普通排障的业务日志。"],
];

const dataModels = [
  ["User", "全局主体", "id, status, profile", "1:N Identity；1:N Membership"],
  ["Identity", "可用于登录的身份", "provider, subject, credential_ref", "provider + subject 唯一"],
  ["Tenant", "组织与数据隔离边界", "id, type, status", "1:N Membership；1:N Resource"],
  ["Membership", "用户进入组织的关系", "user_id, tenant_id, status, authz_version", "连接 User、Tenant、Role"],
  ["Role", "权限的业务化集合", "tenant_id, name, version", "M:N Permission；授予 Membership"],
  ["Permission", "最小能力声明", "resource_type, action", "例如 project:delete"],
  ["Policy", "带条件的判断规则", "effect, condition, version", "组合主体、资源、动作与 Context"],
  ["Resource", "被保护的业务对象", "id, tenant_id, owner_id, attributes", "查询必须携带 tenant_id"],
  ["AuditEvent", "不可抵赖的决策证据", "actor, tenant, resource, action, result", "追加写；关联 request_id 和 policy_version"],
];

const tradeoffs = [
  ["Session vs Token", "管理端 Web、即时注销", "跨服务、开放 API、移动端", "可撤销 Session；短 Token + 刷新机制"],
  ["RBAC vs ABAC", "岗位稳定、权限组合有限", "依赖归属、金额、地区或风险", "RBAC 起步，真实条件出现后叠加 ABAC"],
  ["集中 PDP vs 服务内判断", "多服务需统一策略和审计", "强领域事实只能由本服务理解", "集中 PDP，业务服务保留资源级 PEP"],
  ["实时查询 vs 权限缓存", "高风险写操作、撤权必须即时", "读多写少、授权事实稳定", "短 TTL + 版本号 + 主动失效"],
  ["自建认证 vs 外部 IdP", "合规边界特殊且有安全团队", "要快速支持 SSO、MFA 和联合登录", "优先购买认证能力，自建业务授权"],
  ["Fail-open vs Fail-closed", "低风险读取且有安全兜底", "写操作、管理操作、跨租户请求", "敏感操作默认拒绝，按风险设计有限降级"],
];

const failures = [
  ["只在前端隐藏按钮", "直接调用接口仍可越权", "所有敏感动作在服务端授权"],
  ["查询资源时没有 Tenant ID", "跨组织数据泄露", "tenant_id 进入查询条件、索引和审计"],
  ["信任客户端传来的角色或资源归属", "修改参数即可冒充权限或读取他人资源", "从可信会话取主体，并在租户内加载资源"],
  ["撤销角色后旧 Token 继续有效", "离职或降权后仍有访问窗口", "短生命周期、版本校验和主动撤销"],
  ["角色数量不断膨胀", "角色变成用户级例外，无法治理", "稳定岗位用 Role，差异条件用 Policy"],
  ["权限服务故障时全部放行", "局部故障演变为系统性越权", "按动作风险设置超时、降级和默认拒绝"],
  ["审计字段不完整或可被覆盖", "事后无法还原当时为何授权", "追加写并保存主体、资源、结果、原因和策略版本"],
];

const rollout = [
  ["01", "画出租户边界", "列出核心资源、敏感动作，以及必须按组织隔离的数据。"],
  ["02", "接入身份能力", "优先使用成熟 IdP，建立 User、Identity 和 Membership。"],
  ["03", "用少量 RBAC 起步", "让稳定岗位对应 Role，让 Role 聚合最小 Permission。"],
  ["04", "统一服务端授权", "建立 authorize() 契约，在业务服务加载资源后执行 PEP。"],
  ["05", "补齐撤权与证据", "加入版本、主动失效、追加式审计和安全测试。"],
  ["06", "按真实复杂度演进", "需要多服务和条件规则时，再加入事件传播、缓存和 ABAC。"],
];

const aiPrompt = `你是我的 B2B SaaS 身份与权限架构师。请根据以下产品信息设计一套可落地的身份权限体系：\n\n产品与核心资源：【填写】\n用户类型与组织结构：【填写】\n需要支持的登录方式（密码 / SSO / MFA 等）：【填写】\n高风险动作与合规要求：【填写】\n技术栈、规模与延迟目标：【填写】\n\n请先指出缺失的关键上下文，再按以下顺序输出：\n1. 划定 Tenant 边界，并定义 Subject、Resource、Action、Context；\n2. 给出 User、Identity、Tenant、Membership、Role、Permission、Policy、AuditEvent 的关系与关键字段；\n3. 设计认证链路、服务端授权入口，以及网关粗粒度 / 业务服务细粒度的职责边界；\n4. 先给最小 RBAC 方案，再说明何时需要 ABAC，避免角色爆炸；\n5. 说明权限变更后的 Token、Session、缓存失效和一致性策略；\n6. 用“管理员降级后尝试删除项目”走一遍 Allow / Deny 与审计流程；\n7. 列出越权、租户穿透、撤权延迟和审计缺失的威胁模型与测试清单。\n\n每个关键选择都要写明适用条件、代价和默认建议；不要只列术语，也不要假设前端隐藏按钮能够提供安全性。`;

function SectionHeading({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: string;
  note: string;
}) {
  return (
    <header className="identity-section-head identity-v2-section-head">
      <div><span>{index}</span><p>{label}</p></div>
      <h2>{title}</h2>
      <p>{note}</p>
    </header>
  );
}

function MapHeader({ index, title, question }: { index: string; title: string; question: string }) {
  return (
    <header className="identity-map-head">
      <div><span>{index}</span><h3>{title}</h3></div>
      <p><b>它要回答：</b>{question}</p>
    </header>
  );
}

function MapCaption({ items }: { items: string[] }) {
  return <figcaption className="identity-map-caption">{items.map((item) => <span key={item}>{item}</span>)}</figcaption>;
}

function MapNode({ title, detail, tone = "plain" }: { title: string; detail: string; tone?: "plain" | "accent" | "dark" }) {
  return <div className={`identity-map-node identity-map-node-${tone}`}><b>{title}</b><small>{detail}</small></div>;
}

export function IdentityAccessPage() {
  return (
    <main className="identity-shell identity-v2-shell tone-blue">
      <div className="identity-frame">
        <SiteHeader backHref="/systems" backLabel="返回能力系统" />

        <article className="identity-doc identity-v2-doc">
          <header className="identity-hero identity-v2-hero" id="overview">
            <div className="identity-title-block">
              <p className="identity-eyebrow">Capability Systems · 01 / 18</p>
              <h1>身份与权限</h1>
              <p className="identity-subtitle">从身份可信，到权限可控</p>
              <ul className="identity-tags" aria-label="本页关键词">
                {['认证', '授权', '多租户', '一致性', '审计'].map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
            <blockquote className="identity-thesis identity-v2-thesis">
              <span>01 · 一句话建立认知</span>
              <p>身份与权限系统先证明请求者<strong>是谁</strong>，再根据<strong>组织、成员关系、资源和当前条件</strong>决定能否操作，并保证<strong>撤权及时生效、每次决策可以追溯</strong>。</p>
            </blockquote>
          </header>

          <nav className="identity-index identity-v2-index" aria-label="本页目录">
            <a href="#architecture">02 架构</a>
            <a href="#terms">03 名词</a>
            <a href="#scenario">04 场景</a>
            <a href="#details">05 细节</a>
            <a href="#tradeoffs">06 取舍</a>
            <a href="#rollout">07 落地</a>
          </nav>

          <section className="identity-section identity-v2-section" id="architecture">
            <SectionHeading index="02" label="架构总览" title="先看懂系统，再学习局部" note="四张图依次回答边界、组成、运行和变化；图中的每条连线都代表职责或数据流。" />

            <nav className="identity-map-nav" aria-label="四张核心架构图">
              <a href="#map-business"><span>01</span><b>业务</b><small>对象与边界</small></a>
              <a href="#map-technology"><span>02</span><b>技术</b><small>组件与信任</small></a>
              <a href="#map-runtime"><span>03</span><b>运行</b><small>请求与决策</small></a>
              <a href="#map-consistency"><span>04</span><b>数据</b><small>变更与生效</small></a>
            </nav>

            <figure className="identity-map-card system-diagram v2-map" id="map-business">
              <MapHeader index="图 01" title="业务与领域架构" question="身份与权限系统管理哪些业务对象，它的边界在哪里？" />
              <div className="identity-map-stage identity-domain-v2" aria-label="业务领域对象与权限边界">
                <section className="identity-map-zone identity-global-zone">
                  <span className="identity-zone-label">全局身份域</span>
                  <MapNode title="User" detail="用户主体 · u_17" />
                  <div className="identity-map-link vertical"><span>1 : N · 绑定身份</span></div>
                  <MapNode title="Identity" detail="企业 SSO · idp_subject" />
                </section>

                <div className="identity-map-link horizontal"><span>通过 Membership 进入组织</span></div>

                <section className="identity-map-zone identity-tenant-v2">
                  <header><span className="identity-zone-label">Tenant Boundary</span><b>Organization A</b></header>
                  <div className="identity-tenant-primary">
                    <MapNode title="Membership" detail="u_17 + tenant_A · active" tone="accent" />
                    <div className="identity-map-link horizontal"><span>授予</span></div>
                    <MapNode title="Role" detail="Organization Admin" />
                    <div className="identity-map-link horizontal"><span>聚合</span></div>
                    <MapNode title="Permission" detail="project:delete" />
                  </div>
                  <div className="identity-resource-boundary">
                    <span className="identity-zone-label">Project Boundary · p_42</span>
                    <MapNode title="Resource" detail="Project · tenant_A" />
                    <b>＋</b>
                    <MapNode title="Action" detail="delete" />
                  </div>
                  <p className="identity-alternate-membership">同一 User 在 Organization B 可以拥有另一条 Membership，并仅拥有 Viewer 角色。</p>
                </section>

                <div className="identity-map-link horizontal"><span>输入事实与条件</span></div>

                <section className="identity-map-zone identity-policy-v2">
                  <span className="identity-zone-label">授权决策域</span>
                  <MapNode title="Policy" detail="成员状态 · 资源归属 · 风险条件" tone="dark" />
                  <div className="identity-policy-inputs"><span>tenant 匹配</span><span>owner</span><span>risk</span><span>time</span></div>
                  <div className="identity-decision"><b>Allow</b><strong>/</strong><b>Deny</b></div>
                </section>
              </div>
              <MapCaption items={["User 是全局主体，Membership 才是组织内身份", "Permission 描述能力，Policy 决定能力何时生效", "加载和授权资源时都不能丢失 Tenant"]} />
            </figure>

            <figure className="identity-map-card system-diagram v2-map" id="map-technology">
              <MapHeader index="图 02" title="技术组件架构" question="这套系统由哪些技术组件组成，认证、授权和业务数据分别由谁负责？" />
              <div className="identity-map-stage identity-tech-map" aria-label="身份与权限技术组件架构">
                <section className="identity-tech-external">
                  <span className="identity-zone-label">非可信网络</span>
                  <div className="identity-tech-clients"><MapNode title="Web" detail="用户端" /><MapNode title="App" detail="移动端" /><MapNode title="Admin" detail="管理端" tone="accent" /></div>
                  <MapNode title="企业身份源" detail="Enterprise IdP · Directory" />
                </section>

                <div className="identity-map-link horizontal identity-trust-crossing"><span>HTTPS · OIDC / SAML</span></div>

                <section className="identity-tech-platform">
                  <span className="identity-zone-label">平台信任边界</span>
                  <div className="identity-tech-primary-flow">
                    <div className="identity-tech-column"><MapNode title="Identity Provider" detail="身份联合 · MFA" tone="accent" /><MapNode title="Authentication Service" detail="签发 Session / Token" /></div>
                    <div className="identity-map-link horizontal"><span>Token / Session</span></div>
                    <div className="identity-tech-column"><MapNode title="API Gateway · PEP" detail="验签 · 过期 · 路由粗控" tone="dark" /></div>
                    <div className="identity-map-link horizontal"><span>可信主体上下文</span></div>
                    <div className="identity-tech-column"><MapNode title="Business Service · PEP" detail="加载资源 · 执行业务" tone="accent" /><MapNode title="Resource Database" detail="tenant_id + resource_id" /></div>
                  </div>

                  <div className="identity-tech-control-plane">
                    <span className="identity-zone-label">授权控制面</span>
                    <MapNode title="PDP" detail="计算 Allow / Deny + reason" tone="dark" />
                    <div className="identity-map-link horizontal"><span>读取策略与当前事实</span></div>
                    <div className="identity-tech-stores"><MapNode title="User / Tenant DB" detail="成员状态与版本" /><MapNode title="Policy Database" detail="角色、权限、策略" /><MapNode title="Cache" detail="短 TTL · version" /></div>
                  </div>

                  <div className="identity-tech-evidence">
                    <span className="identity-zone-label">证据与传播面</span>
                    <MapNode title="Audit Log" detail="追加写 · 可检索" />
                    <MapNode title="Event Bus" detail="权限变更 · 缓存失效" />
                    <p>认证、授权与业务服务分别发出审计或变更事件，不用同步调用绑死主链路。</p>
                  </div>
                </section>
              </div>
              <MapCaption items={["身份平台证明是谁，产品仍需管理自己的业务授权", "PEP 执行决策，PDP 计算决策", "资源事实留在业务服务，策略事实由授权控制面管理"]} />
            </figure>

            <figure className="identity-map-card system-diagram v2-map" id="map-runtime">
              <MapHeader index="图 03" title="核心运行链路" question="一次用户访问如何从登录走到最终允许或拒绝？" />
              <div className="identity-map-stage identity-runtime-v2" aria-label="从登录到授权决策的核心运行链路">
                <ol className="identity-runtime-flow">
                  <li><span>01</span><b>登录</b><small>Web / App → IdP</small></li>
                  <li><span>02</span><b>身份验证</b><small>密码 · SSO · MFA</small></li>
                  <li><span>03</span><b>Session / Token</b><small>携带可信 subject</small></li>
                  <li><span>04</span><b>Gateway · PEP</b><small>验签、过期、路由</small></li>
                  <li><span>05</span><b>Business · PEP</b><small>在 Tenant 内加载资源</small></li>
                  <li><span>06</span><b>PDP</b><small>读取事实并计算策略</small></li>
                  <li className="identity-runtime-decision"><span>07</span><b>Allow / Deny</b><small>reason · policy_version</small></li>
                  <li><span>08</span><b>执行与审计</b><small>仅 Allow 执行；两种结果都留证</small></li>
                </ol>
                <div className="identity-request-formula">
                  <span>授权请求</span><b>Subject</b><i>＋</i><b>Tenant</b><i>＋</i><b>Resource</b><i>＋</i><b>Action</b><i>＋</i><b>Context</b><strong>→ Allow / Deny</strong>
                </div>
                <div className="identity-runtime-note"><b>关键边界</b><p>Gateway 可以拒绝无效 Token，却不知道 p_42 是否属于 t_01；业务服务必须先加载可信资源，再让 PDP 判断。</p></div>
              </div>
              <MapCaption items={["登录成功只建立身份置信度，不代表拥有资源权限", "网关无法替代业务服务的资源级授权", "每次敏感决策都应可解释、可追溯"]} />
            </figure>

            <figure className="identity-map-card system-diagram v2-map" id="map-consistency">
              <MapHeader index="图 04" title="权限变更与数据一致性" question="用户被禁用、降级或撤权后，旧 Token 和旧缓存如何停止放行？" />
              <div className="identity-map-stage identity-consistency-v2" aria-label="权限变更、事件传播与紧急封禁链路">
                <section className="identity-consistency-lane">
                  <header><span>正常传播路径</span><p>提交事实后，通过事件让所有副本最终收敛。</p></header>
                  <ol>
                    <li><span>01</span><b>管理操作</b><small>Admin → Member</small></li>
                    <li><span>02</span><b>DB 事务</b><small>Membership + Outbox</small></li>
                    <li><span>03</span><b>Event Bus</b><small>至少一次投递</small></li>
                    <li><span>04</span><b>幂等消费</b><small>忽略旧 version</small></li>
                    <li><span>05</span><b>缓存失效</b><small>tenant + subject</small></li>
                    <li><span>06</span><b>Token Version</b><small>v37 &lt; v38</small></li>
                    <li><span>07</span><b>服务刷新</b><small>后续请求重新决策</small></li>
                    <li><span>08</span><b>审计与告警</b><small>积压 · 重试 · 失败</small></li>
                  </ol>
                  <div className="identity-consistency-tags"><span>重试</span><span>幂等</span><span>最终一致性</span><span>死信告警</span></div>
                </section>
                <section className="identity-emergency-lane">
                  <header><span>紧急封禁路径</span><p>高风险操作不能等待缓存 TTL 或消息积压。</p></header>
                  <div><b>禁用主体</b><i>→</i><b>状态 / 撤销版本立即更新</b><i>→</i><b>敏感接口实时检查</b><i>→</i><strong>Deny + Alert</strong></div>
                </section>
              </div>
              <MapCaption items={["数据库事务是权限事实的提交点，Outbox 保证事件不丢", "事件可以重复，消费者不能让状态倒退", "紧急撤权不能只等待 TTL 和最终一致性"]} />
            </figure>
          </section>

          <section className="identity-section identity-v2-section" id="terms">
            <SectionHeading index="03" label="名词地图" title="只解释刚才图中出现的对象" note="先知道它在哪里、负责什么，再记住名字；点击卡片可保持展开。" />
            <div className="identity-term-groups" aria-label="名词分组"><span>身份与组织</span><span>授权模型</span><span>登录与会话</span><span>决策与证据</span></div>
            <div className="identity-term-grid">
              {terms.map(([term, cn, explain, position, confusion]) => (
                <details className="identity-term-card" key={term}>
                  <summary><span>{term}</span><b>{cn}</b><i aria-hidden="true">＋</i></summary>
                  <div><p>{explain}</p><small><b>架构位置</b>{position}</small><small><b>不要混淆</b>{confusion}</small></div>
                </details>
              ))}
            </div>
          </section>

          <section className="identity-section identity-v2-section" id="scenario">
            <SectionHeading index="04" label="真实业务场景" title="员工已被降级，却仍尝试删除项目" note="用同一个请求验证业务边界、组件职责、运行决策和撤权一致性。" />
            <div className="identity-scenario-facts">
              <div><span>主体</span><b>User u_17</b><small>旧 Token 仍有效</small></div>
              <div><span>组织</span><b>Tenant t_01</b><small>Membership · active</small></div>
              <div><span>变更</span><b>Admin → Member</b><small>authz v37 → v38</small></div>
              <div><span>资源</span><b>Project p_42</b><small>高风险动作 · delete</small></div>
            </div>
            <div className="identity-scenario-tracks">
              <section>
                <header><span>T0</span><div><b>权限先发生变化</b><p>这条线对应图四的数据一致性链路。</p></div></header>
                <ol>
                  <li><span>数据 · 管理操作</span><b>管理员将 u_17 从 Admin 降为 Member</b><p>数据库事务同时更新 Membership，并写入 authz.version=38 与 Outbox。</p></li>
                  <li><span>数据 · 事件传播</span><b>缓存失效事件开始传播</b><p>消费者按版本幂等处理，使 u_17:t_01 的权限缓存失效。</p></li>
                  <li><span>证据 · 审计</span><b>记录谁撤销了什么权限</b><p>保存操作者、目标成员、旧值、新值、请求 ID 和发生时间。</p></li>
                </ol>
              </section>
              <section>
                <header><span>T1</span><div><b>旧页面发起删除请求</b><p>这条线对应图二和图三的组件与运行链路。</p></div></header>
                <ol>
                  <li><span>技术 · Gateway</span><b>旧 Token 签名仍然合法</b><p>网关确认 subject=u_17，但不会信任 Token 中旧的 Admin 声明作为最终权限事实。</p></li>
                  <li><span>业务 · Service PEP</span><b>只在 t_01 内加载 p_42</b><p>查询同时包含 tenant_id 和 resource_id，先阻断跨租户 IDOR。</p></li>
                  <li><span>运行 · PDP</span><b>发现缓存版本低于 v38</b><p>刷新 Membership 后，Member 已不具备 project:delete，决策为 Deny。</p></li>
                  <li className="identity-scenario-deny"><span>结果 · 证据</span><b>403 Forbidden · missing_permission</b><p>不执行业务删除；记录 actor、tenant、resource、action、reason 和 policy_version。</p></li>
                </ol>
              </section>
            </div>
            <aside className="identity-scenario-edge"><span>如果失效事件仍在路上</span><p>删除、成员管理等敏感写操作检查最新主体状态或 authz_version；紧急封禁命中撤销表后直接拒绝，不等待缓存自然过期。</p></aside>
          </section>

          <section className="identity-section identity-v2-section" id="details">
            <SectionHeading index="05" label="细节设计" title="每一段只解决一个设计问题" note="建立全局地图之后，再下钻到事实、契约、安全、可靠性和验证。" />

            <article className="identity-detail-block">
              <header><span>01 · 数据事实</span><h3>为什么 User 和 Membership 必须分开？</h3><p>同一个人可以属于多个组织，并在每个组织拥有不同状态与角色。</p></header>
              <div className="identity-relationship-v2"><span>User</span><i>1 : N</i><span>Identity</span><b>＋</b><span>User</span><i>M : N</i><span>Tenant</span><em>via Membership</em><b>→</b><span>Role</span><b>→</b><span>Permission / Policy</span></div>
              <div className="table-wrap">
                <table className="identity-table identity-v2-table responsive-table">
                  <thead><tr><th>对象</th><th>保存什么事实</th><th>建议关键字段</th><th>关系与约束</th></tr></thead>
                  <tbody>{dataModels.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td data-label={['对象', '保存什么事实', '建议关键字段', '关系与约束'][index]} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </article>

            <article className="identity-detail-block">
              <header><span>02 · 服务契约</span><h3>权限判断应该放在网关、业务服务，还是独立授权服务？</h3><p>答案不是三选一，而是把粗控、资源事实和策略计算放在正确的位置。</p></header>
              <div className="identity-responsibility-grid">
                <div><span>Gateway · PEP</span><b>验证请求能否进入系统</b><p>验签、过期、基础 scope、限流和路由；不知道资源真实归属。</p></div>
                <div><span>Business · PEP</span><b>提供可信业务上下文</b><p>在 Tenant 内加载资源，发起授权请求，并执行 Allow 或 Deny。</p></div>
                <div><span>PDP</span><b>统一计算策略</b><p>组合成员、角色、权限、资源属性和环境，返回原因与策略版本。</p></div>
              </div>
              <div className="identity-contract-grid">
                <div><span>authorize() request</span><pre><code>{`{\n  "subject": "u_17",\n  "tenant": "t_01",\n  "action": "project:delete",\n  "resource": { "type": "project", "id": "p_42", "owner": "u_09" },\n  "context": { "risk": "normal", "authn_level": "mfa" }\n}`}</code></pre></div>
                <div><span>authorize() response</span><pre><code>{`{\n  "decision": "deny",\n  "reason_code": "missing_permission",\n  "policy_version": 38,\n  "decision_id": "dec_7k2",\n  "ttl_ms": 15000\n}`}</code></pre></div>
              </div>
            </article>

            <div className="identity-detail-pair">
              <article className="identity-detail-block identity-detail-compact">
                <header><span>03 · 租户与安全</span><h3>怎样避免一次普通查询穿透组织边界？</h3></header>
                <ul className="identity-checklist">
                  <li>主体和 Tenant 从可信会话或路由上下文取得，不接受客户端自报角色。</li>
                  <li>资源查询同时包含 <code>tenant_id</code> 与 <code>resource_id</code>。</li>
                  <li>数据库约束、索引、缓存键和对象存储路径都包含 Tenant。</li>
                  <li>返回 404 或 403 时，不泄露其他租户资源是否存在。</li>
                  <li>跨租户管理能力单独建模，限时、双人审批并全量审计。</li>
                </ul>
              </article>
              <article className="identity-detail-block identity-detail-compact">
                <header><span>04 · 会话与模型</span><h3>什么时候使用 Token、RBAC，什么时候增加更多复杂度？</h3></header>
                <div className="identity-mini-decisions">
                  <div><b>管理端 Web</b><p>可撤销 Session 或短 Token，优先降低失效窗口。</p></div>
                  <div><b>跨服务 API</b><p>短 Token 传递身份，当前权限仍由服务端重新判断。</p></div>
                  <div><b>稳定岗位</b><p>先用少量 RBAC 角色覆盖主要工作职责。</p></div>
                  <div><b>归属、金额、风险</b><p>条件真实出现后，再用 ABAC Policy 表达。</p></div>
                </div>
              </article>
            </div>

            <article className="identity-detail-block">
              <header><span>05 · 可靠性</span><h3>PDP、缓存或消息系统不可用时，应该允许还是拒绝？</h3><p>降级策略必须按动作风险设计，不能用一个全局开关决定。</p></header>
              <div className="table-wrap">
                <table className="identity-table identity-v2-table responsive-table">
                  <thead><tr><th>故障或异常</th><th>敏感写操作</th><th>低风险读取</th><th>必须记录</th></tr></thead>
                  <tbody>
                    {[
                      ["PDP 超时", "默认拒绝；返回可重试错误", "仅在有短期已验证决策时有限降级", "timeout、action、fallback"],
                      ["缓存不可用", "查询权威数据或拒绝", "回源并限制并发", "cache_miss、latency"],
                      ["事件积压", "版本不一致时实时检查", "缩短缓存 TTL", "lag、old_version、consumer"],
                      ["审计写入失败", "高风险操作阻断或写入本地可靠缓冲", "进入可靠重试", "decision_id、retry_count"],
                    ].map((row) => <tr key={row[0]}>{row.map((cell, index) => <td data-label={['故障或异常', '敏感写操作', '低风险读取', '必须记录'][index]} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="identity-detail-block">
              <header><span>06 · 证据与验证</span><h3>如何证明某次操作当时确实被授权？</h3><p>审计事件、指标、追踪和测试需要共享同一个 decision_id。</p></header>
              <div className="identity-proof-grid">
                <div><span>Audit Event</span><p>actor · tenant · resource · action · result · reason · policy_version · request_id · decision_id</p></div>
                <div><span>可观测性</span><p>授权延迟、拒绝率、缓存命中率、过期版本命中、事件积压、紧急封禁次数</p></div>
                <div><span>测试矩阵</span><p>角色组合、资源归属、Tenant 穿透、撤权延迟、重放、PDP 超时、审计完整性</p></div>
              </div>
            </article>
          </section>

          <section className="identity-section identity-v2-section" id="tradeoffs">
            <SectionHeading index="06" label="方案取舍与失败模式" title="选择必须写明条件，底线必须能够测试" note="没有通用赢家；风险、规模、延迟和团队能力共同决定方案。" />
            <div className="table-wrap">
              <table className="identity-table identity-v2-table responsive-table">
                <thead><tr><th>选择</th><th>偏向左侧，当</th><th>偏向右侧，当</th><th>稳妥起点</th></tr></thead>
                <tbody>{tradeoffs.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td data-label={['选择', '偏向左侧，当', '偏向右侧，当', '稳妥起点'][index]} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div className="identity-failure-grid">
              {failures.map(([title, risk, baseline], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p><b>会发生</b>{risk}</p><p><b>设计底线</b>{baseline}</p></article>)}
            </div>
          </section>

          <section className="identity-section identity-v2-section" id="rollout">
            <SectionHeading index="07" label="最小落地路径" title="从边界和事实开始，按风险逐层补齐" note="第一天不需要通用策略平台，但第一天就要守住租户和服务端授权。" />
            <ol className="identity-rollout-v2">
              {rollout.map(([index, title, detail]) => <li key={index}><span>{index}</span><h3>{title}</h3><p>{detail}</p></li>)}
            </ol>
            <aside className="identity-default-v2"><span>0 → 1 默认建议</span><strong>外部身份能力 · 产品内业务授权 · 少量 RBAC · 服务端统一判断 · Tenant 强制过滤 · 可撤权会话 · 追加式审计</strong></aside>
          </section>

          <section className="identity-closing identity-v2-closing" aria-label="AI 协作与共创问题">
            <CopyPrompt label="AI 协作 · 设计身份权限体系" prompt={aiPrompt} />
            <div className="identity-question"><span>把系统地图带回自己的产品</span><p>如果明天要支持第一家企业客户，</p><h2>第一个必须按组织隔离、授权并审计的核心资源是什么？</h2></div>
          </section>
        </article>

        <footer className="identity-footer"><span>认证建立身份置信度</span><span>授权守住组织与资源边界</span><span>审计保留可追溯证据</span></footer>
      </div>
    </main>
  );
}
