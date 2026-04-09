import { getAlipaySdk, isAlipayConfigured } from "@/lib/alipay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseFormEncodedBody(body: string, decode: boolean) {
  const data: Record<string, string> = {};

  for (const pair of body.split("&")) {
    if (!pair) {
      continue;
    }

    const [rawKey, ...rawValueParts] = pair.split("=");
    const rawValue = rawValueParts.join("=");

    if (!rawKey) {
      continue;
    }

    if (!decode) {
      data[rawKey] = rawValue;
      continue;
    }

    const key = decodeURIComponent(rawKey.replace(/\+/g, "%20"));
    const value = decodeURIComponent(rawValue.replace(/\+/g, "%20"));
    data[key] = value;
  }

  return data;
}

export async function POST(request: Request) {
  if (!isAlipayConfigured()) {
    return new Response("fail", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      status: 500,
    });
  }

  const rawBody = await request.text();

  if (!rawBody) {
    return new Response("fail", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      status: 400,
    });
  }

  const rawPayload = parseFormEncodedBody(rawBody, false);
  const decodedPayload = parseFormEncodedBody(rawBody, true);
  const sdk = getAlipaySdk();
  const isVerified = sdk.checkNotifySignV2(rawPayload) || sdk.checkNotifySign(decodedPayload);

  if (!isVerified) {
    return new Response("fail", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      status: 400,
    });
  }

  console.info(
    "[alipay-notify]",
    JSON.stringify({
      outTradeNo: decodedPayload.out_trade_no ?? null,
      totalAmount: decodedPayload.total_amount ?? null,
      tradeNo: decodedPayload.trade_no ?? null,
      tradeStatus: decodedPayload.trade_status ?? null,
    }),
  );

  return new Response("success", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
    status: 200,
  });
}
