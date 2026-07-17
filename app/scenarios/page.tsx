import type { Metadata } from "next";
import { ModulePage } from "../components/ModulePage";
import { getModule } from "../site-data";

export const metadata: Metadata = {
  title: "产品场景",
  description: "从具体场景出发，组合能力系统，完成端到端交付。",
};

export default function ScenariosPage() {
  return <ModulePage module={getModule("scenarios")} />;
}
