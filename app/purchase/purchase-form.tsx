"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import QRCode from "qrcode";
import { getPlanBySlug } from "@/lib/plans";

type CheckoutStage = "form" | "payment" | "upgrade";

type OrderState = {
  contactInfo: string;
  couponCode: string;
  accountEmail: string;
  notes: string;
};

const initialState: OrderState = {
  contactInfo: "",
  couponCode: "",
  accountEmail: "",
  notes: "",
};

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
      description: "微信支付即刻付款",
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
      <div className="purchase-price-highlight">
        🎉 当前页面已切成标准三步流，先建单，再扫码支付，再提交升级信息。
      </div>
    </div>
  );
}

export function PurchaseForm({ planSlug }: { planSlug?: string }) {
  const selectedPlan = getPlanBySlug(planSlug);
  const [stage, setStage] = useState<CheckoutStage>("form");
  const [form, setForm] = useState<OrderState>(initialState);
  const [showRechargeExplain, setShowRechargeExplain] = useState(false);
  const [showNoLoginExplain, setShowNoLoginExplain] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<"wechat">("wechat");
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderCreatedAt, setOrderCreatedAt] = useState("");
  const [orderQrDataUrl, setOrderQrDataUrl] = useState("");

  const isRechargePlan = selectedPlan.slug === "plus-recharge";
  const currentStep = stage === "form" ? 1 : stage === "payment" ? 2 : 3;
  const finalLabel = isRechargePlan ? "升级到 Plus" : "完成交付";
  const finalDescription = isRechargePlan
    ? "填写 GPT 账号信息并完成处理"
    : "补充交付信息并等待账号发放";

  const purchaseTitle = isRechargePlan ? "ChatGPT Plus 一键升级 / 月" : "ChatGPT Plus 成品账号购买";
  const purchaseSubtitle = isRechargePlan
    ? "安全 · 官方 · 秒到"
    : "安全 · 快速 · 可交付";
  const guaranteeText = isRechargePlan
    ? "充值失败 100% 当天原路退款"
    : "交付异常按规则协助处理";

  const successTitle = useMemo(() => {
    if (!upgradeSubmitted) {
      return isRechargePlan ? "填写 GPT 账号信息" : "填写交付信息";
    }

    return isRechargePlan ? "升级申请已提交" : "交付申请已提交";
  }, [isRechargePlan, upgradeSubmitted]);

  function updateField<Key extends keyof OrderState>(key: Key, value: OrderState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleCreateOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = new Date();
    const generatedOrderId = `GPT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate(),
    ).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
      now.getSeconds(),
    ).padStart(2, "0")}`;

    setOrderId(generatedOrderId);
    setOrderCreatedAt(now.toLocaleString("zh-CN"));
    setStage("payment");
  }

  async function handleUpgradeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderPayload = [
      `订单号:${orderId}`,
      `订单套餐:${selectedPlan.name}`,
      `支付金额:¥${selectedPlan.price}`,
      `联系信息:${form.contactInfo}`,
      isRechargePlan ? `ChatGPT邮箱:${form.accountEmail}` : `交付邮箱:${form.accountEmail}`,
      `备注:${form.notes || "无"}`,
      "状态:待人工确认处理",
    ].join("\n");

    const url = await QRCode.toDataURL(orderPayload, {
      margin: 1,
      width: 220,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
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

                <details className="purchase-details" open={showRechargeExplain} onToggle={(event) => setShowRechargeExplain(event.currentTarget.open)}>
                  <summary>为什么不在下单时填写 GPT 账号？是怎么充到我的号里的？</summary>
                  <div className="purchase-details-body">
                    <p>本步骤仅用于先下单并建立订单。付款后，再提交你的 GPT 账号信息继续处理。</p>
                    <div className="purchase-mini-steps">
                      <article>
                        <span>1</span>
                        <div>
                          <strong>下单并支付</strong>
                          <p>系统先建立订单与支付记录</p>
                        </div>
                      </article>
                      <article>
                        <span>2</span>
                        <div>
                          <strong>按提示填写账号信息</strong>
                          <p>验证通过后开始继续处理</p>
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

                <button className="purchase-primary-button" type="submit">
                  立即购买
                </button>

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
                      <li>后续可用该联系方式查询订单进度与记录；</li>
                      <li>无需注册/登录账号，减少等待与跳转。</li>
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="purchase-feature-grid">
                <article>
                  <span>📦</span>
                  <div>
                    <strong>极速到账</strong>
                    <p>支付成功后继续进入升级或交付步骤</p>
                  </div>
                </article>
                <article>
                  <span>⚡</span>
                  <div>
                    <strong>官方通道</strong>
                    <p>按当前购买路径统一进入处理流程</p>
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

        {stage === "payment" ? (
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
              <p>请使用微信扫描下方二维码完成支付</p>
            </div>

            <div className="purchase-payment-shell">
              <div className="purchase-channel-card">
                <div className={`purchase-channel-badge ${paymentChannel === "wechat" ? "is-wechat" : ""}`}>
                  <span>微信支付</span>
                </div>
                <div className="purchase-channel-frame is-wechat">
                  <div className="purchase-channel-logo">微信支付</div>
                  <div className="purchase-qr-box">
                    <Image alt="支付二维码" className="payment-qr-image" height={256} priority src="/payment-qr.jpeg" width={256} />
                    <div className="purchase-payment-meta">
                      <div>
                        <span>{selectedPlan.name}</span>
                        <strong>¥{selectedPlan.price}</strong>
                      </div>
                      <p>订单号：{orderId}</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="purchase-payment-summary">
                <div className="purchase-summary-card">
                  <div className="purchase-summary-row">
                    <span>订单号</span>
                    <strong>{orderId}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>套餐</span>
                    <strong>{selectedPlan.name}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>联系信息</span>
                    <strong>{form.contactInfo}</strong>
                  </div>
                  <div className="purchase-summary-row">
                    <span>下单时间</span>
                    <strong>{orderCreatedAt}</strong>
                  </div>
                </div>

                <div className="purchase-payment-tip">
                  💡 付款完成后，会让您输入自己的 GPT 账户信息进行继续处理。
                </div>

                <div className="purchase-payment-actions">
                  <button className="purchase-primary-button" onClick={() => setStage("upgrade")} type="button">
                    我已完成支付，继续下一步
                  </button>
                  <button className="purchase-secondary-button" onClick={() => setStage("form")} type="button">
                    返回修改信息
                  </button>
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
                        ? "付款完成后，请填写你的 ChatGPT 账号邮箱，方便继续处理升级。"
                        : "付款完成后，请填写接收交付信息的邮箱和补充说明。"}
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
                      <strong>{orderId}</strong>
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
                      <li>订单号：{orderId}</li>
                      <li>联系信息：{form.contactInfo}</li>
                      <li>{isRechargePlan ? `ChatGPT 邮箱：${form.accountEmail}` : `交付邮箱：${form.accountEmail}`}</li>
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
