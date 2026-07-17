import type { Metadata } from "next";
import { FoundationMapPage } from "../../components/FoundationMapPage";
import { getFoundationContent } from "../foundation-content";

const content = getFoundationContent("systems-and-abstractions");

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function SystemsAndAbstractionsPage() {
  return <FoundationMapPage content={content} />;
}
