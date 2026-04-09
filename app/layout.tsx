import type { Metadata } from "next";
import { Noto_Sans_SC, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "GPTShop Pro | 一站式 ChatGPT Plus 代开通",
  description:
    "仿照高转化 GPT 代开通落地页制作的响应式 Next.js 单页站点，包含套餐、流程、评价、常见问题与多处 CTA。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${outfit.variable} ${notoSansSc.variable}`}>{children}</body>
    </html>
  );
}
