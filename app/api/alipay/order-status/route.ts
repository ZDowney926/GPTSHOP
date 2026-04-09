import { NextRequest, NextResponse } from "next/server";
import { getAlipaySdk, isAlipayConfigured } from "@/lib/alipay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeTradeStatus(rawStatus?: string) {
  switch (rawStatus) {
    case "WAIT_BUYER_PAY":
      return "pending";
    case "TRADE_SUCCESS":
    case "TRADE_FINISHED":
      return "paid";
    case "TRADE_CLOSED":
      return "closed";
    default:
      return "unknown";
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "支付状态查询失败，请稍后重试。";
}

export async function GET(request: NextRequest) {
  if (!isAlipayConfigured()) {
    return NextResponse.json({ error: "支付宝支付尚未完成配置。" }, { status: 500 });
  }

  const outTradeNo = request.nextUrl.searchParams.get("outTradeNo")?.trim();

  if (!outTradeNo) {
    return NextResponse.json({ error: "缺少 outTradeNo，无法查询订单状态。" }, { status: 400 });
  }

  try {
    const result = (await getAlipaySdk().exec(
      "alipay.trade.query",
      {
        bizContent: {
          out_trade_no: outTradeNo,
        },
      },
      { validateSign: true },
    )) as Record<string, string | undefined>;

    if (result.code !== "10000") {
      if (result.subCode === "ACQ.TRADE_NOT_EXIST") {
        return NextResponse.json({ rawStatus: null, status: "not_found" }, { status: 404 });
      }

      return NextResponse.json(
        {
          error: result.subMsg ?? result.msg ?? "支付宝返回查单失败。",
          code: result.code ?? null,
          subCode: result.subCode ?? null,
        },
        { status: 502 },
      );
    }

    const rawStatus = result.tradeStatus ?? result.trade_status;

    return NextResponse.json(
      {
        paidAt: result.sendPayDate ?? result.send_pay_date ?? null,
        rawStatus: rawStatus ?? null,
        status: normalizeTradeStatus(rawStatus),
        tradeNo: result.tradeNo ?? result.trade_no ?? null,
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
