"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QRCode from "qrcode";
import { getPlanBySlug } from "@/lib/plans";

type OrderState = {
  contactName: string;
  contactType: string;
  contactValue: string;
  accountEmail: string;
  notes: string;
};

const initialState: OrderState = {
  contactName: "",
  contactType: "微信",
  contactValue: "",
  accountEmail: "",
  notes: "",
};

export function PurchaseForm({ planSlug }: { planSlug?: string }) {
  const selectedPlan = getPlanBySlug(planSlug);
  const [form, setForm] = useState<OrderState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderPayload = [
      `订单套餐:${selectedPlan.name}`,
      `支付金额:¥${selectedPlan.price}`,
      `联系人:${form.contactName}`,
      `${form.contactType}:${form.contactValue}`,
      `ChatGPT邮箱:${form.accountEmail}`,
      `备注:${form.notes || "无"}`,
      "状态:待人工确认付款",
    ].join("\n");

    const url = await QRCode.toDataURL(orderPayload, {
      margin: 1,
      width: 280,
      color: {
        dark: "#1b1712",
        light: "#ffffff",
      },
    });

    setQrDataUrl(url);
    setSubmitted(true);
  }

  function updateField<Key extends keyof OrderState>(key: Key, value: OrderState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="site-shell purchase-shell">
      <header className="topbar fade-up">
        <Link className="brand" href="/">
          <span className="brand-mark">GP</span>
          <span className="brand-copy">
            <strong>GPTShop Pro</strong>
            <small>安全下单页</small>
          </span>
        </Link>
        <nav className="nav">
          <Link href="/">返回首页</Link>
          <a href="#payment">付款二维码</a>
        </nav>
      </header>

      <main className="purchase-page">
        <section className="purchase-hero fade-up">
          <p className="eyebrow">Purchase</p>
          <h1>填写购买信息并完成扫码支付</h1>
          <p className="hero-text">
            界面结构参考常见的购买页布局：左侧填写信息，右侧展示订单摘要和付款二维码。提交后即可把订单详情与二维码一并展示出来。
          </p>
        </section>

        <section className="purchase-grid">
          <form className="purchase-card purchase-form fade-up" onSubmit={handleSubmit}>
            <div className="purchase-card-head">
              <div>
                <p className="eyebrow">Order Form</p>
                <h2>填写用户信息</h2>
              </div>
              <span className="purchase-badge">{selectedPlan.tier}</span>
            </div>

            <div className="selected-plan">
              <div>
                <strong>{selectedPlan.name}</strong>
                <p>人工协助开通，提交后进入支付步骤。</p>
              </div>
              <div className="price-wrap compact">
                <strong className="purchase-price">¥{selectedPlan.price}</strong>
                {selectedPlan.originalPrice ? (
                  <span className="price-original">原价 ¥{selectedPlan.originalPrice}</span>
                ) : null}
              </div>
            </div>

            <label className="field">
              <span>联系人姓名</span>
              <input
                required
                type="text"
                value={form.contactName}
                onChange={(event) => updateField("contactName", event.target.value)}
                placeholder="例如：张三"
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span>联系方式类型</span>
                <select
                  value={form.contactType}
                  onChange={(event) => updateField("contactType", event.target.value)}
                >
                  <option value="微信">微信</option>
                  <option value="Telegram">Telegram</option>
                  <option value="邮箱">邮箱</option>
                </select>
              </label>

              <label className="field">
                <span>联系方式</span>
                <input
                  required
                  type="text"
                  value={form.contactValue}
                  onChange={(event) => updateField("contactValue", event.target.value)}
                  placeholder="填写你的联系方式"
                />
              </label>
            </div>

            <label className="field">
              <span>ChatGPT 账号邮箱</span>
              <input
                required
                type="email"
                value={form.accountEmail}
                onChange={(event) => updateField("accountEmail", event.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label className="field">
              <span>备注信息</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="可填写地区、支付卡问题、是否首次开通等"
              />
            </label>

            <button className="button button-primary submit-button" type="submit">
              提交并前往支付
            </button>
          </form>

          <aside className="purchase-card purchase-sidebar fade-up" id="payment">
            <div className="purchase-card-head">
              <div>
                <p className="eyebrow">Payment</p>
                <h2>扫码支付</h2>
              </div>
              <span className="purchase-status">{submitted ? "待支付" : "等待填写"}</span>
            </div>

            <div className="purchase-summary">
              <div className="summary-row">
                <span>套餐</span>
                <strong>{selectedPlan.name}</strong>
              </div>
              <div className="summary-row">
                <span>金额</span>
                <strong>¥{selectedPlan.price}</strong>
              </div>
              {selectedPlan.originalPrice ? (
                <div className="summary-row muted-row">
                  <span>原价</span>
                  <strong>¥{selectedPlan.originalPrice}</strong>
                </div>
              ) : null}
            </div>

            <div className="qr-stack">
              <div className="payment-qr-frame">
                <Image
                  alt="付款二维码"
                  className="payment-qr-image"
                  height={280}
                  priority
                  src="/payment-qr.jpeg"
                  width={280}
                />
              </div>
              <p className="payment-hint">请使用微信扫码支付，付款后保留截图，客服会根据订单信息尽快处理。</p>
            </div>

            {submitted ? (
              <div className="order-result">
                <div className="order-result-copy">
                  <h3>订单信息已生成</h3>
                  <p>
                    用户信息已经整理完成。右侧二维码下方同步生成了一份订单详情二维码，方便客服核对订单。
                  </p>
                </div>
                {qrDataUrl ? (
                  <div className="generated-qr">
                    <Image alt="订单详情二维码" height={220} src={qrDataUrl} width={220} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="order-placeholder">
                <h3>提交后显示订单详情</h3>
                <p>填写信息并点击“提交并前往支付”后，这里会生成订单摘要二维码和用户信息提示。</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
