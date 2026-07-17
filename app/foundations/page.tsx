import type { Metadata } from "next";
import { ModulePage } from "../components/ModulePage";
import { getModule } from "../site-data";

export const metadata: Metadata = {
  title: "稳定基础",
  description: "理解不会轻易过时的机制，获得判断技术方案的坐标系。",
};

export default function FoundationsPage() {
  return <ModulePage module={getModule("foundations")} />;
}
