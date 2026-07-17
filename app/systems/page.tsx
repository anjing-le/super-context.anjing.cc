import type { Metadata } from "next";
import { ModulePage } from "../components/ModulePage";
import { getModule } from "../site-data";

export const metadata: Metadata = {
  title: "能力系统",
  description: "以真实能力为学习单位，贯通产品、各端、数据与运维。",
};

export default function SystemsPage() {
  return <ModulePage module={getModule("systems")} />;
}
