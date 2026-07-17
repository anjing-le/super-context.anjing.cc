import type { Metadata } from "next";
import { FoundationMapPage } from "../../components/FoundationMapPage";
import { getFoundationContent } from "../foundation-content";

const content = getFoundationContent("security-and-boundaries");

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function SecurityAndBoundariesPage() {
  return <FoundationMapPage content={content} />;
}
