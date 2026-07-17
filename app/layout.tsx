import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://super-context.anjing.cc"),
  title: {
    default: "Super Context｜AI 时代能力地图",
    template: "%s｜Super Context",
  },
  description:
    "面向 AI 时代的能力与知识地图：理解全局，组合系统，交付产品。",
  openGraph: {
    title: "Super Context｜AI 时代能力地图",
    description: "理解全局，组合系统，交付产品。",
    url: "https://super-context.anjing.cc",
    siteName: "Super Context",
    images: [
      {
        url: "/super-context-og.png",
        width: 1200,
        height: 630,
        alt: "Super Context 的三层能力地图",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Context｜AI 时代能力地图",
    description: "理解全局，组合系统，交付产品。",
    images: ["/super-context-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
