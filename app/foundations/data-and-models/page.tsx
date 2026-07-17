import type { Metadata } from "next";
import { FoundationMapPage } from "../../components/FoundationMapPage";
import { getFoundationContent } from "../foundation-content";

const content = getFoundationContent("data-and-models");

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function DataAndModelsPage() {
  return <FoundationMapPage content={content} />;
}
