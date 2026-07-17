import type { Metadata } from "next";
import { FoundationMapPage } from "../../components/FoundationMapPage";
import { getFoundationContent } from "../foundation-content";

const content = getFoundationContent("network-and-computing");

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function NetworkAndComputingPage() {
  return <FoundationMapPage content={content} />;
}
