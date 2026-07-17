import type { Metadata } from "next";
import { IdentityAccessPage } from "./IdentityAccessPage";

export const metadata: Metadata = {
  title: "身份与权限",
  description:
    "从登录到组织治理：用 Subject、Tenant、Resource、Action 与 Context 设计可解释、可审计的身份权限系统。",
};

export default function IdentityAndAccessRoute() {
  return <IdentityAccessPage />;
}
