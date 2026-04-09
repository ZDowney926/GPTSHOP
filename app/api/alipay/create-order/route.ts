import { NextResponse } from "next/server";
import {
  createAlipayOrderNumber,
  getAlipayNotifyUrl,
  getAlipaySdk,
  getOrderTimeoutMinutes,
  isAlipayConfigured,
} from "@/lib/alipay";
import { getPlanBySlug } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CreateOrderRequest = {
  planSlug?: string;
  contactInfo?: string;
  couponCode?: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "支付宝建单失败，请稍后重试。";
}

export async function POST(request: Request) {
  if (!isAlipayConfigured()) {
    return NextResponse.json(
      {
        error:
          "支付宝支付尚未完成配置。请先在环境变量中设置 ALIPAY_APP_ID、ALIPAY_PRIVATE_KEY，以及支付宝公钥或证书。",
      },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as CreateOrderRequest;
    const contactInfo = body.contactInfo?.trim();

    if (!contactInfo) {
      return NextResponse.json({ error: "请先填写联系手机号 / 邮箱后再创建订单。" }, { status: 400 });
    }

    const plan = getPlanBySlug(body.planSlug);
    const outTradeNo = createAlipayOrderNumber();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + getOrderTimeoutMinutes() * 60_000);
    const couponCode = body.couponCode?.trim();

    const result = (await getAlipaySdk().exec(
      "alipay.trade.precreate",
      {
        notify_url: getAlipayNotifyUrl(),
        bizContent: {
          out_trade_no: outTradeNo,
          total_amount: plan.price.toFixed(2),
          subject: plan.name,
          body: `套餐:${plan.name}; 联系方式:${contactInfo}${couponCode ? `; 优惠码:${couponCode}` : ""}`,
          timeout_express: `${getOrderTimeoutMinutes()}m`,
        },
      },
      { validateSign: true },
    )) as Record<string, string | undefined>;

    const qrCode = result.qrCode ?? result.qr_code;

    if (result.code !== "10000" || !qrCode) {
      return NextResponse.json(
        {
          error: result.subMsg ?? result.msg ?? "支付宝返回建单失败，请检查应用配置或支付产品权限。",
          code: result.code ?? null,
          subCode: result.subCode ?? null,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        amount: plan.price.toFixed(2),
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        outTradeNo,
        pollIntervalMs: 3000,
        qrCode,
        subject: plan.name,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
