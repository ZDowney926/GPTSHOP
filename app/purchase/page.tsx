import type { Metadata } from "next";
import { PurchaseForm } from "./purchase-form";

export const metadata: Metadata = {
  title: "ChatGPT Plus 代充值 | GPTShop Pro",
  description: "分步骤完成下单、扫码支付和升级信息提交的购买页。",
};

export default async function PurchasePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <PurchaseForm planSlug={resolvedSearchParams.plan} />;
}
