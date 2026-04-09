"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { getPlanBySlug } from "@/lib/plans";

type CheckoutStage = "form" | "payment" | "upgrade";
type PaymentOrderStatus = "idle" | "pending" | "paid" | "closed" | "expired" | "failed";

type OrderState = {
  contactInfo: string;
  couponCode: string;
  accountEmail: string;
  notes: string;
};

type CreatedOrder = {
  amount: string;
  createdAt: string;
  expiresAt: string;
  outTradeNo: string;
  pollIntervalMs: number;
  qrCode: string;
  qrCodeImage: string;
  rawStatus: string | null;
  status: PaymentOrderStatus;
  subject: string;
  paidAt: string | null;
  tradeNo: string | null;
};

type CreateOrderResponse = {
  amount: string;
  createdAt: string;
  error?: string;
  expiresAt: string;
  outTradeNo: string;
  pollIntervalMs?: number;
  qrCode: string;
  subject: string;
};

type OrderStatusResponse = {
  error?: string;
  paidAt?: string | null;
  rawStatus?: string | null;
  status?: "pending" | "paid" | "closed" | "unknown" | "not_found";
  tradeNo?: string | null;
};

const initialState: OrderState = {
  contactInfo: "",
  couponCode: "",
  accountEmail: "",
  notes: "",
};

function formatDateTime(value?: string | null) {
  if (!value) {
    return "待生成";
  }

  return new Date(value).toLocaleString("zh-CN", {
    hour12: false,
  });
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "请求失败，请稍后再试。";
}

function getPaymentStatusMeta(status: PaymentOrderStatus) {
  switch (status) {
    case "paid":
      return {
        description: "支付宝已确认收款，页面会自动进入下一步。",
        label: "已支付",
      };
    case "closed":
      return {
        description: "订单已被关闭，请返回上一步重新创建订单。",
        label: "已关闭",
      };
    case "expired":
      return {
        description: "二维码已超时，请返回上一步重新生成支付宝订单。",
        label: "已超时",
      };
    case "failed":
      return {
        description: "查单失败，可点击“刷新状态”再次查询。",
        label: "查询异常",
      };
    case "pending":
      return {
        description: "系统会自动每 3 秒查询一次支付宝订单状态。",
        label: "待支付",
      };
    default:
      return {
        description: "创建支付宝订单后会在这里显示状态。",
        label: "未开始",
      };
  }
}

function StepProgress({
  currentStep,
  finalLabel,
  finalDescription,
}: {
  currentStep: 1 | 2 | 3;
  finalLabel: string;
  finalDescription: string;
}) {
  const items = [
    {
      number: 1,
      label: "填写信息",
      description: "输入手机号 / 邮箱建立订单",
    },
    {
      number: 2,
      label: "扫码支付",
      description: "支付宝扫码即刻付款",
    },
    {
      number: 3,
      label: finalLabel,
      description: finalDescription,
    },
  ] as const;

  return (
    <div className="purchase-stepper">
      <div className="purchase-stepper-line is-left" data-active={currentStep >= 2} />
      <div className="purchase-stepper-line is-right" data-active={currentStep >= 3} />
      <div className="purchase-stepper-grid">
        {items.map((item) => {
          const isCompleted = currentStep > item.number;
          const isActive = currentStep === item.number;

          return (
            <div className="purchase-step" key={item.number}>
              <div className={`purchase-step-circle ${isCompleted ? "is-completed" : isActive ? "is-active" : ""}`}>
                {isCompleted ? "✓" : item.number}
              </div>
              <div className="purchase-step-copy">
                <div className={`purchase-step-label ${isCompleted || isActive ? "is-highlighted" : ""}`}>{item.label}</div>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriceBreakdown({
  price,
  originalPrice,
  couponCode,
}: {
  price: number;
  originalPrice?: number;
  couponCode: string;
}) {
  const savedAmount = originalPrice ? Math.max(0, originalPrice - price) : 0;

  return (
    <div className="purchase-price-breakdown">
      {originalPrice ? (
        <div className="purchase-price-row">
          <span>原价</span>
          <span className="is-muted is-line-through">¥{originalPrice}</span>
        </div>
      ) : null}
      {originalPrice ? (
        <div className="purchase-price-row">
          <span className="is-accent">限时特惠</span>
          <span className="is-accent">-¥{savedAmount}</span>
        </div>
      ) : null}
      {couponCode ? (
        <div className="purchase-price-row">
          <span className="is-accent">优惠券</span>
          <span className="is-accent">已填写 {couponCode}</span>
        </div>
      ) : null}
      <div className="purchase-price-divider" />
      <div className="purchase-price-row is-total">
        <span>实付金额</span>
        <strong>¥{price}</strong>
      </div>
      <div className="purchase-price-highlight">支付宝官方二维码下单，支付状态自动检测。</div>
    </div>
  );
}

export function PurchaseForm({ planSlug }: { planSlug?: string }) {
  const selectedPlan = getPlanBySlug(planSlug);
  const [stage, setStage] = useState<CheckoutStage>("form");
  const [form, setForm] = useState<OrderState>(initialState);
  const [showRechargeExplain, setShowRechargeExplain] = useState(false);
  const [showNoLoginExplain, setShowNoLoginExplain] = useState(false);
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
  const [orderQrDataUrl, setOrderQrDataUrl] = useState("");
  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(null);
  const [createOrderError, setCreateOrderError] = useState("");
  const [paymentQueryError, setPaymentQueryError] = useState("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);
  const queryInFlightRef = useRef(false);
  const createdOrderRef = useRef<CreatedOrder | null>(null);

  const isRechargePlan = selectedPlan.slug === "plus-recharge";
  const currentStep = stage === "form" ? 1 : stage === "payment" ? 2 : 3;
  const finalLabel = isRechargePlan ? "升级到 Plus" : "完成交付";
  const finalDescription = isRechargePlan
    ? "系统确认支付后自动进入升级资料填写"
    : "系统确认支付后继续填写交付信息";

  const purchaseTitle = isRechargePlan ? "ChatGPT Plus 一键升级 / 月" : "ChatGPT Plus 成品账号购买";
  const purchaseSubtitle = isRechargePlan ? "安全 · 支付宝官方二维码 · 自动轮询" : "安全 · 快速交付 · 自动到账确认";
  const guaranteeText = isRechargePlan ? "充值失败 100% 当天原路退款" : "交付异常按规则协助处理";

  const successTitle = useMemo(() => {
    if (!upgradeSubmitted) {
      return isRechargePlan ? "填写 GPT 账号信息" : "填写交付信息";
    }

    return isRechargePlan ? "升级申请已提交" : "交付申请已提交";
  }, [isRechargePlan, upgradeSubmitted]);

  const paymentStatusMeta = useMemo(
    () => getPaymentStatusMeta(createdOrder?.status ?? "idle"),
    [createdOrder?.status],
  );

  useEffect(() => {
    createdOrderRef.current = createdOrder;
  }, [createdOrder]);

  function updateField<Key extends keyof OrderState>(key: Key, value: OrderState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleCreateOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateOrderError("");
    setPaymentQueryError("");
    setUpgradeSubmitted(false);
    setOrderQrDataUrl("");
    setIsCreatingOrder(true);

    try {
      const response = await fetch("/api/alipay/create-order", {
        body: JSON.stringify({
          contactInfo: form.contactInfo,
          couponCode: form.couponCode,
          planSlug: selectedPlan.slug,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json()) as CreateOrderResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "支付宝订单创建失败，请稍后重试。");
      }

      const qrCodeImage = await QRCode.toDataURL(payload.qrCode, {
        color: {
          dark: "#111827",
          light: "#ffffff",
        },
        margin: 1,
        width: 256,
      });

      setCreatedOrder({
        amount: payload.amount,
        createdAt: payload.createdAt,
        expiresAt: payload.expiresAt,
        outTradeNo: payload.outTradeNo,
        paidAt: null,
        pollIntervalMs: payload.pollIntervalMs ?? 3000,
        qrCode: payload.qrCode,
        qrCodeImage,
        rawStatus: "WAIT_BUYER_PAY",
        status: "pending",
        subject: payload.subject,
        tradeNo: null,
      });

      startTransition(() => setStage("payment"));
    } catch (error) {
      setCreateOrderError(getErrorMessage(error));
    } finally {
      setIsCreatingOrder(false);
    }
  }

  async function pollPaymentStatus(manual = false) {
    const currentOrder = createdOrderRef.current;

    if (!currentOrder || queryInFlightRef.current) {
      return;
    }

    if (currentOrder.status === "paid" || currentOrder.status === "closed" || currentOrder.status === "expired") {
      return;
    }

    if (Date.now() >= new Date(currentOrder.expiresAt).getTime()) {
      setCreatedOrder((current) => (current ? { ...current, status: "expired" } : current));
      return;
    }

    queryInFlightRef.current = true;

    if (manual) {
      setIsRefreshingStatus(true);
    }

    setPaymentQueryError("");

    try {
      const response = await fetch(
        `/api/alipay/order-status?outTradeNo=${encodeURIComponent(currentOrder.outTradeNo)}`,
        {
          cache: "no-store",
          method: "GET",
        },
      );

      const payload = (await response.json()) as OrderStatusResponse;

      if (!response.ok) {
        throw new Error(
          payload.error ??
            (payload.status === "not_found" ? "支付宝订单还未同步，请稍后再刷新。" : "支付宝查单失败，请稍后再试。"),
        );
      }

      const nextStatus =
        payload.status === "paid" || payload.status === "closed" || payload.status === "pending"
          ? payload.status
          : "failed";

      setCreatedOrder((current) =>
        current
          ? {
              ...current,
              paidAt: payload.paidAt ?? current.paidAt,
              rawStatus: payload.rawStatus ?? current.rawStatus,
              status: nextStatus,
              tradeNo: payload.tradeNo ?? current.tradeNo,
            }
          : current,
      );

      if (nextStatus === "paid") {
        startTransition(() => setStage("upgrade"));
      }
    } catch (error) {
      setPaymentQueryError(getErrorMessage(error));
      setCreatedOrder((current) => (current ? { ...current, status: "failed" } : current));
    } finally {
      queryInFlightRef.current = false;

      if (manual) {
        setIsRefreshingStatus(false);
      }
    }
  }

  useEffect(() => {
    if (stage !== "payment" || !createdOrder) {
      return;
    }

    if (createdOrder.status === "paid" || createdOrder.status === "closed" || createdOrder.status === "expired") {
      return;
    }

    void pollPaymentStatus();

    const intervalId = window.setInterval(() => {
      void pollPaymentStatus();
    }, createdOrder.pollIntervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [createdOrder, stage]);

  async function handleUpgradeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderPayload = [
      `订单号:${createdOrder?.outTradeNo ?? "待生成"}`,
      `订单套餐:${selectedPlan.name}`,
      `支付金额:¥${selectedPlan.price}`,
      `联系信息:${form.contactInfo}`,
      isRechargePlan ? `ChatGPT邮箱:${form.accountEmail}` : `交付邮箱:${form.accountEmail}`,
      `备注:${form.notes || "无"}`,
      `支付时间:${formatDateTime(createdOrder?.paidAt)}`,
      "状态:待人工确认处理",
    ].join("\n");

    const url = await QRCode.toDataURL(orderPayload, {
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
      margin: 1,
      width: 220,
    });

    setOrderQrDataUrl(url);
    setUpgradeSubmitted(true);
  }

  return (
    <div className="site-shell purchase-shell">
      <header className="topbar fade-up">
        <Link className="brand" href="/plus-price">
          <span className="brand-mark">GP</span>
          <span className="brand-copy">
            <strong>GPTShop Pro</strong>
            <small>安全购买页</small>
          </span>
        </Link>
        <nav className="nav">
          <Link href="/plus-price">返回套餐选择</Link>
          <Link href="/guide">查看升级教程</Link>
        </nav>
      </header>

      <main className="purchase-page">
        {stage === "form" ? (
          <section className="purchase-flow-card fade-up">
            <div className="purchase-back-row">
              <Link className="purchase-back-link" href="/plus-price">
                <span>←</span>
                返回
              </Link>
            </div>

            <StepProgress
              currentStep={currentStep}
              finalDescription={finalDescription}
              finalLabel={finalLabel}
            />

            <header className="purchase-flow-header">
              <h1>{purchaseTitle}</h1>
              <div className="purchase-pill-row">
                <span className="purchase-pill is-indigo">🔒 {purchaseSubtitle}</span>
                <span className="purchase-pill is-emerald">🛡️ {guaranteeText}</span>
              </div>
            </header>

            <form className="purchase-flow-body" onSubmit={handleCreateOrder}>
              <div className="purchase-form-stack">
                <label className="purchase-field">
                  <span>联系手机号 / 邮箱</span>
                  <input
                    required
                    type="text"
                    value={form.contactInfo}
                    onChange={(event) => updateField("contactInfo", event.target.value)}
                    placeholder="输入你的手机号、邮箱或微信号"
                  />
                </label>

                <details
                  className="purchase-details"
                  open={showRechargeExplain}
                  onToggle={(event) => setShowRechargeExplain(event.currentTarget.open)}
                >
                  <summary>为什么不在下单时填写 GPT 账号？是怎么充到我的号里的？</summary>
                  <div className="purchase-details-body">
                    <p>本步骤仅用于先下单并建立订单。支付宝付款成功后，再提交你的 GPT 账号信息继续处理。</p>
                    <div className="purchase-mini-steps">
                      <article>
                        <span>1</span>
                        <div>
                          <strong>下单并支付</strong>
                          <p>系统先建立支付宝订单与支付记录</p>
                        </div>
                      </article>
                      <article>
                        <span>2</span>
                        <div>
                          <strong>自动确认支付</strong>
                          <p>页面轮询订单状态，支付成功自动进入下一步</p>
                        </div>
                      </article>
                      <article>
                        <span>3</span>
                        <div>
                          <strong>{isRechargePlan ? "完成升级" : "完成交付"}</strong>
                          <p>{isRechargePlan ? "一般 1-2 分钟左右继续处理" : "按订单顺序交付账号信息"}</p>
                        </div>
                      </article>
                    </div>
                  </div>
                </details>

                <label className="purchase-field">
                  <span>优惠码（选填）</span>
                  <input
                    type="text"
                    value={form.couponCode}
                    onChange={(event) => updateField("couponCode", event.target.value)}
                    placeholder="有优惠码可在这里填写"
                  />
                </label>

                <PriceBreakdown
                  couponCode={form.couponCode}
                  originalPrice={selectedPlan.originalPrice}
                  price={selectedPlan.price}
                />

                <button className="purchase-primary-button" disabled={isCreatingOrder} type="submit">
                  {isCreatingOrder ? "正在创建支付宝订单..." : "立即购买"}
                </button>

                {createOrderError ? <div className="purchase-helper-card is-error">{createOrderError}</div> : null}

                <div className="purchase-inline-links">
                  <button type="button" onClick={() => setShowNoLoginExplain((current) => !current)}>
                    为什么不需要注册登录？
                  </button>
                  <span>·</span>
                  <Link href="/guide">查看升级教程</Link>
                </div>

                {showNoLoginExplain ? (
                  <div className="purchase-helper-card">
                    <p>我们希望把购买路径做得更短一些，做到用完即走：</p>
                    <ul>
                      <li>下单仅需填写联系方式；</li>
                      <li>付款成功后再补充 GPT 账号信息；</li>
                      <li>无需注册/登录账号，减少等待与跳转。</li>
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="purchase-feature-grid">
                <article>
                  <span>📦</span>
                  <div>
                    <strong>自动检测到账</strong>
                    <p>使用支付宝官方二维码，支付状态自动轮询查询</p>
                  </div>
                </article>
                <article>
                  <span>⚡</span>
                  <div>
                    <strong>官方通道</strong>
                    <p>服务端实时建单，减少静态收款码误差</p>
                  </div>
                </article>
                <article>
                  <span>👩🏻‍💻</span>
                  <div>
                    <strong>真人客服</strong>
                    <p>如遇异常可继续按订单信息协助处理</p>
                  </div>
                </article>
              </div>

              <div className="purchase-social-proof">
                <div className="purchase-social-divider" />
                <div className="purchase-social-copy">💬 超过 15,000 位用户已购买</div>
              </div>
            </form>
          </section>
        ) : null}

        {stage === "payment" && createdOrder ? (
          <section className="purchase-flow-card fade-up">
            <button className="purchase-back-button" onClick={() => setStage("form")} type="button">
              ← 返回
            </button>

            <StepProgress
              currentStep={currentStep}
              finalDescription={finalDescription}
              finalLabel={finalLabel}
            />

            <div className="purchase-payment-head">
              <h1>扫码支付</h1>
              <p>请使用支付宝扫描下方二维码完成支付</p>
            </div>

            <div className="purchase-payment-shell">
              <div className="purchase-channel-card">
                <div className="purchase-channel-badge is-alipay">
                  <span>支付宝支付</span>
                </div>
                <div className="purchase-channel-frame is-alipay">
                  <div className="purchase-channel-logo">支付宝</div>
                  <div className="purchase-qr-box">
                    <Image alt="支付宝支付二维码" className="payment-qr-image" height={256} priority src={createdOrder.qrCodeImage} width={256} />
                    <div className="purchase-payment-meta">
                      <div>
                        <span>{createdOrder.subject}</span>
                        <strong>¥{createdOrder.amount}</strong>
                      </div>
                      <p>订单号：{createdOrder.outTradeNo}</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="purchase-payment-summary">
                <div className="purchase-summary-card">
                  <div className="purchase-summary-row">
                    <span>订单号</span>
                    <strong>{createdOrder.outTradeNo}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>支付状态</span>
                    <strong>{paymentStatusMeta.label}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>套餐</span>
                    <strong>{createdOrder.subject}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>联系信息</span>
                    <strong>{form.contactInfo}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>下单时间</span>
                    <strong>{formatDateTime(createdOrder.createdAt)}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>超时时间</span>
                    <strong>{formatDateTime(createdOrder.expiresAt)}</strong>
                  </div>
                  {createdOrder.paidAt ? (
                    <div className="purchase-summary-row">
                      <span>支付时间</span>
                      <strong>{formatDateTime(createdOrder.paidAt)}</strong>
                    </div>
                  ) : null}
                </div>

                <div className={`purchase-status-panel is-${createdOrder.status}`}>
                  <div className={`purchase-status-chip is-${createdOrder.status}`}>{paymentStatusMeta.label}</div>
                  <p>{paymentStatusMeta.description}</p>
                </div>

                {paymentQueryError ? <div className="purchase-helper-card is-error">{paymentQueryError}</div> : null}

                <div className="purchase-payment-tip">
                  💡 支付宝付款成功后，页面会自动进入下一步，让您填写自己的 GPT 账户信息。
                </div>

                <div className="purchase-payment-actions">
                  <button
                    className="purchase-primary-button"
                    disabled={isRefreshingStatus || createdOrder.status === "paid"}
                    onClick={() => void pollPaymentStatus(true)}
                    type="button"
                  >
                    {createdOrder.status === "paid"
                      ? "支付已确认"
                      : isRefreshingStatus
                        ? "正在刷新状态..."
                        : "刷新状态"}
                  </button>
                  <button className="purchase-secondary-button" onClick={() => setStage("form")} type="button">
                    返回修改信息
                  </button>
                </div>

                <div className="purchase-payment-footnote">
                  <p>请在 10 分钟内完成支付，超时订单会自动失效。</p>
                  <p>如已付款但状态未更新，可点击“刷新状态”重试。</p>
                </div>
              </aside>
            </div>
          </section>
        ) : null}

        {stage === "upgrade" ? (
          <section className="purchase-flow-card fade-up">
            <button className="purchase-back-button" onClick={() => setStage("payment")} type="button">
              ← 返回
            </button>

            <StepProgress
              currentStep={currentStep}
              finalDescription={finalDescription}
              finalLabel={finalLabel}
            />

            {!upgradeSubmitted ? (
              <form className="purchase-upgrade-grid" onSubmit={handleUpgradeSubmit}>
                <div className="purchase-upgrade-main">
                  <header className="purchase-flow-header is-compact">
                    <h1>{successTitle}</h1>
                    <p>
                      {isRechargePlan
                        ? "支付宝付款确认后，请填写你的 ChatGPT 账号邮箱，方便继续处理升级。"
                        : "支付宝付款确认后，请填写接收交付信息的邮箱和补充说明。"}
                    </p>
                  </header>

                  <label className="purchase-field">
                    <span>{isRechargePlan ? "ChatGPT 账号邮箱" : "接收交付的邮箱"}</span>
                    <input
                      required
                      type="email"
                      value={form.accountEmail}
                      onChange={(event) => updateField("accountEmail", event.target.value)}
                      placeholder={isRechargePlan ? "you@example.com" : "用于接收账号信息"}
                    />
                  </label>

                  <label className="purchase-field">
                    <span>备注信息（选填）</span>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      placeholder={isRechargePlan ? "可填写地区、异常情况、是否首次开通等" : "可填写希望的交付时间或补充要求"}
                    />
                  </label>

                  <button className="purchase-primary-button" type="submit">
                    {isRechargePlan ? "提交并完成升级申请" : "提交并完成交付申请"}
                  </button>
                </div>

                <aside className="purchase-upgrade-side">
                  <div className="purchase-summary-card">
                    <div className="purchase-summary-row">
                      <span>订单号</span>
                      <strong>{createdOrder?.outTradeNo ?? "待生成"}</strong>
                    </div>
                    <div className="purchase-summary-row">
                      <span>套餐</span>
                      <strong>{selectedPlan.name}</strong>
                    </div>
                    <div className="purchase-summary-row">
                      <span>支付金额</span>
                      <strong>¥{selectedPlan.price}</strong>
                    </div>
                    <div className="purchase-summary-row">
                      <span>联系信息</span>
                      <strong>{form.contactInfo}</strong>
                    </div>
                    <div className="purchase-summary-row">
                      <span>支付状态</span>
                      <strong>{paymentStatusMeta.label}</strong>
                    </div>
                  </div>
                </aside>
              </form>
            ) : (
              <div className="purchase-complete-grid">
                <div className="purchase-complete-card">
                  <div className="purchase-complete-badge">已提交</div>
                  <h1>{successTitle}</h1>
                  <p>
                    {isRechargePlan
                      ? "订单信息和 GPT 账号信息已经记录完成，接下来会按你提交的信息继续处理。"
                      : "交付信息已经记录完成，接下来会按订单信息安排账号交付。"}
                  </p>

                  <div className="purchase-helper-card is-success">
                    <ul>
                      <li>订单号：{createdOrder?.outTradeNo ?? "待生成"}</li>
                      <li>联系信息：{form.contactInfo}</li>
                      <li>{isRechargePlan ? `ChatGPT 邮箱：${form.accountEmail}` : `交付邮箱：${form.accountEmail}`}</li>
                      <li>支付时间：{formatDateTime(createdOrder?.paidAt)}</li>
                    </ul>
                  </div>

                  <div className="purchase-payment-actions">
                    <Link className="purchase-primary-link" href="/plus-price">
                      返回套餐页
                    </Link>
                    <Link className="purchase-secondary-link" href="/order">
                      去订单查询页
                    </Link>
                  </div>
                </div>

                <aside className="purchase-complete-side">
                  <div className="purchase-summary-card">
                    <h2>订单详情二维码</h2>
                    <p>可用于人工核对订单信息。</p>
                    {orderQrDataUrl ? (
                      <div className="generated-qr">
                        <Image alt="订单详情二维码" height={220} src={orderQrDataUrl} width={220} />
                      </div>
                    ) : null}
                  </div>
                </aside>
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>
  );
}
