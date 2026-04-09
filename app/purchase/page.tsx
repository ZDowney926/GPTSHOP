import type { Metadata } from "next";
import { PurchaseForm } from "./purchase-form";

export const metadata: Metadata = {
  title: "购买套餐 | GPTShop Pro",
  description: "填写购买信息并展示付款二维码的购买页。",
};

export default async function PurchasePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <PurchaseForm planSlug={resolvedSearchParams.plan} />;
}
