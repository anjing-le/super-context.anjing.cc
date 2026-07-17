import { CopyPrompt } from "../../components/CopyPrompt";
import { SiteHeader } from "../../components/SiteHeader";

const coreObjects = [
  ["Subject", "谁", "用户、服务或自动化主体"],
  ["Tenant", "在哪个组织", "本次请求所属的隔离边界"],
  ["Resource", "什么资源", "项目、文档、账单或成员"],
  ["Action", "做什么", "读取、修改、删除或授权"],
  ["Context", "什么条件", "时间、设备、归属与风险"],
];

const quickChecks = [
  {
    left: "认证 Authentication",
    right: "授权 Authorization",
    summary: "前者确认主体是谁；后者逐次判断主体能否执行动作。",
    decision: "登录成功 ≠ 获得资源访问权",
  },
  {
    left: "用户 User",
    right: "成员 Membership",
    summary: "用户是全局主体；成员是用户进入某个组织后的关系。",
    decision: "角色应挂在成员关系上",
  },
  {
    left: "RBAC",
    right: "ABAC",
    summary: "RBAC 用角色聚合权限；ABAC 再根据主体、资源和环境属性判断。",
    decision: "先角色，后条件",
  },
  {
    left: "Session",
    right: "Token",
    summary: "Session 便于服务端撤销；Token 便于分布式传递，但会产生事实过期窗口。",
    decision: "认证载体不是权限事实",
  },
  {
    left: "SSO",
    right: "MFA",
    summary: "SSO 统一登录入口；MFA 提升高风险操作的身份置信度。",
    decision: "二者解决的问题不同",
  },
  {
    left: "业务日志",
    right: "审计日志",
    summary: "业务日志帮助排障；审计日志回答谁在何时对什么做了什么、结果如何。",
    decision: "审计记录需防篡改、可检索",
  },
];

const dataModels = [
  ["User", "全局自然人 / 服务主体", "id, status, profile", "1:N Identity；1:N Membership"],
  ["Identity", "可用于登录的身份", "provider, subject, credential_ref", "N:1 User；联合键 provider + subject"],
  ["Tenant", "组织与数据隔离边界", "id, type, status", "1:N Membership；1:N Resource"],
  ["Membership", "用户加入组织的关系", "user_id, tenant_id, status", "连接 User、Tenant、Role"],
  ["Role", "权限的业务化集合", "tenant_id, name, version", "M:N Permission；授予 Membership"],
  ["Permission", "最小能力声明", "resource_type, action", "如 project:delete"],
  ["Policy", "带条件的判断规则", "effect, condition, version", "组合主体、资源、动作与 Context"],
  ["Resource", "被保护的业务对象", "id, tenant_id, owner_id, attributes", "查询必须携带 tenant_id"],
  ["AuditEvent", "不可抵赖的决策证据", "actor, tenant, resource, action, result", "追加写；关联 request_id 与 policy_version"],
];

const tradeoffs = [
  ["Session vs Token", "需要即时注销、管理端 Web 会话", "跨服务、开放 API、移动端离线容忍", "可撤销 Session；短 Token + 刷新机制"],
  ["RBAC vs ABAC", "岗位稳定、权限组合有限", "规则依赖归属、金额、地区、风险等级", "RBAC 起步，条件复杂后叠加 ABAC"],
  ["集中权限服务 vs 服务内判断", "多服务需统一策略、审计与版本", "单体或强领域规则需要本地事实", "集中 PDP，领域服务保留资源级 PEP"],
  ["实时查询 vs 权限缓存", "高风险写操作、变更必须立即生效", "读多写少、授权数据稳定、延迟敏感", "短 TTL + 版本号 + 主动失效"],
  ["自建登录 vs 第三方身份平台", "强定制、已有安全团队、合规边界特殊", "要快速支持 SSO / MFA / 社交登录", "优先购买认证能力，自建业务授权"],
];

const failures = [
  ["只在前端隐藏按钮", "直接调用接口仍能越权", "所有敏感动作在服务端授权"],
  ["查询资源时没有 Tenant ID", "跨组织数据泄露", "tenant_id 进入查询条件与索引"],
  ["信任客户端传来的资源 ID", "修改 ID 即可读取或修改他人资源", "先在租户内加载资源，再授权"],
  ["撤销角色后旧 Token 继续有效", "离职或降权后仍有访问窗口", "短生命周期、版本校验与撤销机制"],
  ["角色数量不断膨胀", "角色变成用户级例外，无法治理", "稳定岗位用角色，差异条件用 Policy"],
  ["超级管理员绕过所有审计", "最高风险行为没有证据", "紧急权限也要双人审批、限时与全量审计"],
  ["审计字段不完整", "事后无法还原权限决策", "至少记录主体、组织、资源、动作、结果与策略版本"],
];

const rollout = [
  ["01", "先画租户边界", "明确哪些数据必须按组织隔离"],
  ["02", "建立四个基础对象", "User、Membership、Role、Permission"],
  ["03", "先用 RBAC", "用少量稳定角色覆盖主要岗位"],
  ["04", "统一服务端授权入口", "每次判断显式传入五个核心对象"],
  ["05", "补齐失效与审计", "撤权可生效，决策可追溯"],
  ["06", "再按需引入 ABAC", "只为真实出现的复杂条件增加策略"],
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
  note?: string;
}) {
  return (
    <header className="identity-section-head">
      <div>
        <span>{index}</span>
        <p>{label}</p>
      </div>
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}
    </header>
  );
}

function DiagramCaption({ items }: { items: string[] }) {
  return (
    <figcaption className="diagram-caption">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </figcaption>
  );
}

export function IdentityAccessPage() {
  return (
    <main className="identity-shell tone-blue">
      <div className="identity-frame">
        <SiteHeader backHref="/systems" backLabel="返回能力系统" />

        <article className="identity-doc">
          <header className="identity-hero">
            <div className="identity-title-block">
              <p className="identity-eyebrow">Capability Systems · 01 / 09</p>
              <h1>身份与权限</h1>
              <p className="identity-subtitle">从登录到组织治理</p>
              <ul className="identity-tags" aria-label="本页关键词">
                {['认证', '授权', 'SSO', 'RBAC', '多租户', '审计'].map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <blockquote className="identity-thesis">
              <span>系统只回答一件事</span>
              <p>
                先确认<strong>你是谁</strong>，再判断你能在<strong>什么组织</strong>中，
                对<strong>什么资源</strong>执行<strong>什么动作</strong>，并为整个过程留下
                <strong>可追溯的证据</strong>。
              </p>
            </blockquote>
          </header>

          <section className="identity-object-strip" aria-label="授权决策的五个核心对象">
            {coreObjects.map(([name, question, answer], index) => (
              <article className="identity-object-card" key={name}>
                <span>0{index + 1}</span>
                <div>
                  <h2>{name}</h2>
                  <strong>{question}</strong>
                </div>
                <p>{answer}</p>
              </article>
            ))}
          </section>

          <nav className="identity-index" aria-label="本页目录">
            <a href="#quick-check">01 速查</a>
            <a href="#architecture">02 架构</a>
            <a href="#data-model">03 数据模型</a>
            <a href="#scenario">04 业务场景</a>
            <a href="#tradeoffs">05 取舍</a>
            <a href="#failures">06 风险</a>
            <a href="#rollout">07 落地</a>
          </nav>

          <section className="identity-section" id="quick-check">
            <SectionHeading
              index="01"
              label="领域知识速查"
              title="先分清边界，再组合能力"
              note="每一组都容易混用，但在系统里承担不同责任。"
            />
            <div className="quick-check-grid">
              {quickChecks.map((item) => (
                <article className="quick-check-card" key={item.left}>
                  <div className="quick-check-pair">
                    <strong>{item.left}</strong>
                    <span>≠</span>
                    <strong>{item.right}</strong>
                  </div>
                  <p>{item.summary}</p>
                  <small>{item.decision}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="identity-section architecture-section" id="architecture">
            <SectionHeading
              index="02"
              label="四张架构图"
              title="从领域关系走到运行时证据"
              note="四张图分别回答边界、登录、决策与一致性问题。"
            />

            <figure className="system-diagram domain-diagram">
              <header className="diagram-head">
                <div><span>图 01</span><h3>业务领域与权限边界</h3></div>
                <p>对象如何关联？权限事实属于哪里？</p>
              </header>
              <div className="diagram-stage domain-stage">
                <section className="diagram-zone global-zone" aria-label="全局身份域">
                  <span className="zone-label">全局身份域</span>
                  <div className="diagram-node node-strong"><b>User</b><small>用户主体 · u_17</small></div>
                  <span className="vertical-arrow">↓ 1 : N</span>
                  <div className="diagram-node"><b>Identity</b><small>企业 SSO · idp_subject</small></div>
                </section>
                <span className="domain-bridge">建立成员关系 →</span>
                <section className="diagram-zone tenant-zone" aria-label="租户权限边界">
                  <div className="tenant-zone-head"><span className="zone-label">Tenant Boundary</span><b>Organization A</b></div>
                  <div className="tenant-primary-flow">
                    <div className="diagram-node node-accent"><b>Membership</b><small>u_17 + tenant_A</small></div>
                    <span>→</span>
                    <div className="diagram-node"><b>Role</b><small>组织管理员</small></div>
                    <span>→</span>
                    <div className="diagram-node"><b>Permission</b><small>project:delete</small></div>
                  </div>
                  <div className="tenant-resource-flow">
                    <div className="diagram-node"><b>Resource</b><small>Project · p_42</small></div>
                    <span>+</span>
                    <div className="diagram-node"><b>Action</b><small>delete</small></div>
                  </div>
                  <div className="alternate-membership">
                    <span>同一 User</span><b>Organization B · Membership → Viewer</b>
                  </div>
                </section>
                <span className="domain-bridge">输入规则 →</span>
                <section className="diagram-zone policy-zone" aria-label="策略规则">
                  <span className="zone-label">决策规则</span>
                  <div className="diagram-node node-dark"><b>Policy</b><small>条件与拒绝优先级</small></div>
                  <p><code>Role</code> 聚合权限<br /><code>Policy</code> 判断条件</p>
                  <div className="policy-result"><span>tenant 匹配</span><span>owner / risk</span><strong>Allow / Deny</strong></div>
                </section>
              </div>
              <DiagramCaption items={[
                "User 不等于 Membership",
                "角色属于组织内的成员关系",
                "任何判断都不能丢失 Tenant",
                "Role 是集合，Policy 是规则",
              ]} />
            </figure>

            <figure className="system-diagram auth-diagram">
              <header className="diagram-head">
                <div><span>图 02</span><h3>认证与登录链路</h3></div>
                <p>一次登录如何变成一次可被验证的请求？</p>
              </header>
              <div className="diagram-stage auth-stage">
                <div className="diagram-lane-label"><span>认证域 · 确认你是谁</span><span>访问域 · 判断你能做什么</span></div>
                <ol className="auth-flow">
                  <li><span>01</span><b>客户端</b><small>发起登录</small></li>
                  <li><span>02</span><b>IdP / Auth</b><small>身份提供方</small></li>
                  <li className="method-node"><span>03</span><b>认证方式</b><small>密码 · SSO · MFA</small></li>
                  <li className="artifact-node"><span>04</span><b>Session / Token</b><small>身份与会话载体</small></li>
                  <li><span>05</span><b>Gateway</b><small>验签、过期、粗粒度</small></li>
                  <li className="node-dark"><span>06</span><b>业务服务</b><small>资源级再次授权</small></li>
                </ol>
                <div className="auth-warning"><b>注意</b><span>Token 只证明签发时的声明；角色、租户状态和风险条件可能已经变化。</span></div>
              </div>
              <DiagramCaption items={[
                "认证与授权是两段链路",
                "登录成功不代表可访问所有资源",
                "Token 不是永远正确的权限事实",
              ]} />
            </figure>

            <figure className="system-diagram runtime-diagram">
              <header className="diagram-head">
                <div><span>图 03</span><h3>运行时授权决策</h3></div>
                <p>每一次资源请求在什么地方被允许或拒绝？</p>
              </header>
              <div className="diagram-stage runtime-stage">
                <div className="runtime-flow">
                  <div className="diagram-node"><b>客户端</b><small>DELETE p_42</small></div><span>→</span>
                  <div className="diagram-node node-accent"><b>Gateway · PEP</b><small>认证 / 路由级粗控</small></div><span>→</span>
                  <div className="diagram-node node-strong"><b>业务服务 · PEP</b><small>加载租户内资源</small></div><span>→</span>
                  <div className="diagram-node node-dark"><b>PDP</b><small>默认拒绝 · 策略决策</small></div><span>→</span>
                  <div className="decision-node"><strong>Deny</strong><small>reason_code</small><b>Allow</b></div>
                </div>
                <div className="runtime-inputs">
                  <span>决策数据 →</span>
                  <div><b>Membership</b><b>Role / Permission</b><b>Policy Version</b><b>Resource Attributes</b><b>Context</b></div>
                  <span>↗ 输入 PDP</span>
                </div>
                <div className="runtime-audit"><span>所有敏感决策</span><b>→ AuditEvent</b><small>actor · tenant · resource · action · result · reason · policy_version</small></div>
              </div>
              <DiagramCaption items={[
                "默认拒绝，显式允许",
                "前端隐藏按钮不构成权限控制",
                "网关做粗控，业务服务做资源级细控",
                "结果必须可解释、可审计",
              ]} />
            </figure>

            <figure className="system-diagram consistency-diagram">
              <header className="diagram-head">
                <div><span>图 04</span><h3>权限变更与数据一致性</h3></div>
                <p>管理员撤权后，系统如何让旧权限真正失效？</p>
              </header>
              <div className="diagram-stage consistency-stage">
                <ol className="consistency-flow">
                  <li><span>01</span><b>管理员修改角色</b><small>Admin → Member</small></li>
                  <li className="transaction-node"><span>02</span><b>数据库事务</b><small>Membership + Outbox</small></li>
                  <li><span>03</span><b>版本 / 事件</b><small>authz.version = 38</small></li>
                  <li><span>04</span><b>消息分发</b><small>至少一次投递</small></li>
                  <li className="invalidate-node"><span>05</span><b>缓存失效</b><small>tenant + subject</small></li>
                  <li><span>06</span><b>重新判断</b><small>后续请求读取 v38</small></li>
                  <li className="audit-node"><span>07</span><b>审计事件</b><small>Deny · role_revoked</small></li>
                </ol>
                <div className="consistency-risk"><b>撤权延迟窗口</b><span>长生命周期 Token</span><span>缓存 TTL</span><span>消息积压</span><strong>用版本校验、主动失效和敏感操作实时查询收敛</strong></div>
              </div>
              <DiagramCaption items={[
                "权限变更不能只改数据库",
                "身份权限同样面对一致性取舍",
                "审计日志是独立的安全证据，不是普通运行日志",
              ]} />
            </figure>
          </section>

          <section className="identity-section" id="data-model">
            <SectionHeading
              index="03"
              label="核心数据模型"
              title="先保存事实，再计算权限"
              note="表结构不必一次完美，但关系归属和租户边界必须明确。"
            />
            <div className="relationship-line" aria-label="核心关系">
              <span>User</span><i>1 : N</i><span>Identity</span><b>＋</b><span>User</span><i>M : N</i><span>Tenant</span><em>via Membership</em><b>→</b><span>Role</span><b>→</b><span>Permission / Policy</span>
            </div>
            <div className="table-wrap">
              <table className="identity-table responsive-table">
                <thead><tr><th>对象</th><th>保存什么事实</th><th>建议关键字段</th><th>关系与约束</th></tr></thead>
                <tbody>
                  {dataModels.map((row) => (
                    <tr key={row[0]}>{row.map((cell, index) => <td data-label={['对象', '保存什么事实', '建议关键字段', '关系与约束'][index]} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="identity-section scenario-section" id="scenario">
            <SectionHeading
              index="04"
              label="真实业务场景"
              title="被降级的员工再次删除项目"
              note="把产品界面、接口、租户校验、缓存和审计放进同一条证据链。"
            />
            <div className="scenario-summary">
              <div><span>变更前</span><b>Organization Admin</b><small>拥有 project:delete</small></div>
              <strong>管理员降级</strong>
              <div><span>变更后</span><b>Member</b><small>不再拥有 project:delete</small></div>
              <strong>随后尝试</strong>
              <code>DELETE /tenants/t_01/projects/p_42</code>
            </div>
            <ol className="scenario-trace">
              <li><span>01 · 产品界面</span><h3>按钮应消失，但不能被信任</h3><p>界面依据最新权限刷新；旧页面或手工请求仍可能发起删除。</p></li>
              <li><span>02 · 接口请求</span><h3>携带主体与租户上下文</h3><p>服务端从可信会话读取 subject=u_17、tenant=t_01，不信任客户端自报角色。</p></li>
              <li><span>03 · 租户校验</span><h3>只在 t_01 内加载 p_42</h3><p>查询条件同时包含 resource_id 与 tenant_id，先阻断跨组织 IDOR。</p></li>
              <li><span>04 · 缓存状态</span><h3>权限版本已从 v37 变为 v38</h3><p>撤权事件使 u_17:t_01 的缓存失效；旧 Token 中的 Admin 声明不作为最终事实。</p></li>
              <li><span>05 · PDP 决策</span><h3>Member 缺少 project:delete</h3><p>输入五个核心对象与策略版本；默认拒绝，返回 reason=missing_permission。</p></li>
              <li className="scenario-deny"><span>06 · 接口结果</span><h3>403 Forbidden</h3><p>不泄露其他租户或策略细节；客户端刷新能力状态并显示可行动提示。</p></li>
              <li className="scenario-audit"><span>07 · 审计证据</span><h3>记录一次被拒绝的高风险动作</h3><p>保存 actor、tenant、resource、action、result、reason、request_id 和 policy_version。</p></li>
            </ol>
          </section>

          <section className="identity-section" id="tradeoffs">
            <SectionHeading
              index="05"
              label="关键架构取舍"
              title="没有通用赢家，只有适用条件"
              note="先用风险、规模、延迟和团队能力约束选择。"
            />
            <div className="table-wrap">
              <table className="identity-table tradeoff-table responsive-table">
                <thead><tr><th>选择</th><th>偏向左侧，当</th><th>偏向右侧，当</th><th>常见稳妥起点</th></tr></thead>
                <tbody>
                  {tradeoffs.map((row) => (
                    <tr key={row[0]}>{row.map((cell, index) => <td data-label={['选择', '偏向左侧，当', '偏向右侧，当', '常见稳妥起点'][index]} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="identity-section failures-section" id="failures">
            <SectionHeading
              index="06"
              label="常见失败方式"
              title="权限事故通常从一个缺失的边界开始"
              note="检查症状，也要检查它背后的系统性风险。"
            />
            <div className="failure-list">
              {failures.map(([title, risk, baseline], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p><b>风险</b>{risk}</p>
                  <p><b>底线</b>{baseline}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="identity-section" id="rollout">
            <SectionHeading
              index="07"
              label="最小落地方案"
              title="从租户边界开始，按风险逐层补齐"
              note="不要第一天就建设通用策略平台。"
            />
            <ol className="rollout-path">
              {rollout.map(([index, title, detail]) => (
                <li key={index}><span>{index}</span><h3>{title}</h3><p>{detail}</p></li>
              ))}
            </ol>
            <aside className="rollout-rule">
              <span>0 → 1 默认建议</span>
              <strong>短会话 / 短 Token · 少量 RBAC 角色 · 服务端统一 authorize() · Tenant 强制过滤 · 撤权失效 · 追加式审计</strong>
            </aside>
          </section>

          <section className="identity-closing" aria-label="AI 协作与共创问题">
            <CopyPrompt label="AI 协作 · 设计身份权限体系" prompt={aiPrompt} />
            <div className="identity-question">
              <span>下一轮从这里开始</span>
              <p>如果你的产品明天要支持企业客户，</p>
              <h2>第一个需要被组织隔离的核心资源是什么？</h2>
            </div>
          </section>
        </article>

        <footer className="identity-footer">
          <span>认证建立身份置信度</span>
          <span>授权守住组织与资源边界</span>
          <span>审计保留可追溯证据</span>
        </footer>
      </div>
    </main>
  );
}
