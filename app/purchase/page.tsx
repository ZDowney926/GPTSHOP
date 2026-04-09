import type { Metadata } from "next";
import { PurchaseForm } from "./purchase-form";

export const metadata: Metadata = {
  title: "ChatGPT Plus 代充值 | GPTShop Pro",
  description: "支付宝自动建单、扫码支付并轮询支付状态的购买页。",
};

export default async function PurchasePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <PurchaseForm planSlug={resolvedSearchParams.plan} />;
}
