import type { Metadata } from "next";
import { FoundationMapPage } from "../../components/FoundationMapPage";
import { getFoundationContent } from "../foundation-content";

const content = getFoundationContent("ai-and-evaluation");

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function AiAndEvaluationPage() {
  return <FoundationMapPage content={content} />;
}
