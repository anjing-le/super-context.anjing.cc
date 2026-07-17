import type { Metadata } from "next";
import { ModulePage } from "../components/ModulePage";
import { getModule } from "../site-data";

export const metadata: Metadata = {
  title: "稳定基础",
  description: "理解系统为何这样运行，知道面对不同问题时该如何选择技术方案。",
};

export default function FoundationsPage() {
  return <ModulePage module={getModule("foundations")} />;
}
