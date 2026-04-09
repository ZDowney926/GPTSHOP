import { randomUUID } from "node:crypto";
import { AlipaySdk } from "alipay-sdk";

const DEFAULT_GATEWAY = "https://openapi.alipay.com/gateway.do";
const DEFAULT_ORDER_TIMEOUT_MINUTES = 10;

let cachedSdk: AlipaySdk | null = null;

function normalizeSecret(value: string) {
  return value.trim().replace(/\\n/g, "\n");
}

function readSecret(name: string) {
  const value = process.env[name];
  return value ? normalizeSecret(value) : "";
}

function readText(name: string) {
  return process.env[name]?.trim() ?? "";
}

function hasCertificateConfig() {
  return Boolean(readSecret("ALIPAY_APP_CERT") && readSecret("ALIPAY_PUBLIC_CERT") && readSecret("ALIPAY_ROOT_CERT"));
}

function hasKeyConfig() {
  return Boolean(readSecret("ALIPAY_PUBLIC_KEY"));
}

export function isAlipayConfigured() {
  return Boolean(readText("ALIPAY_APP_ID") && readSecret("ALIPAY_PRIVATE_KEY") && (hasCertificateConfig() || hasKeyConfig()));
}

export function getOrderTimeoutMinutes() {
  const rawValue = Number.parseInt(readText("ALIPAY_ORDER_TIMEOUT_MINUTES"), 10);

  if (Number.isNaN(rawValue) || rawValue < 1) {
    return DEFAULT_ORDER_TIMEOUT_MINUTES;
  }

  return Math.min(rawValue, 120);
}

export function getSiteOrigin() {
  const configuredOrigin = readText("APP_BASE_URL") || readText("NEXT_PUBLIC_SITE_URL");

  if (configuredOrigin) {
    return configuredOrigin.startsWith("http") ? configuredOrigin : `https://${configuredOrigin}`;
  }

  const vercelUrl = readText("VERCEL_URL");

  if (vercelUrl) {
    return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}

export function getAlipayNotifyUrl() {
  return `${getSiteOrigin()}/api/alipay/notify`;
}

export function createAlipayOrderNumber() {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  const suffix = randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();

  return `GPT${timestamp}${suffix}`;
}

export function getAlipaySdk() {
  if (cachedSdk) {
    return cachedSdk;
  }

  const appId = readText("ALIPAY_APP_ID");
  const privateKey = readSecret("ALIPAY_PRIVATE_KEY");

  if (!appId || !privateKey) {
    throw new Error("支付宝配置不完整：缺少 ALIPAY_APP_ID 或 ALIPAY_PRIVATE_KEY。");
  }

  const gateway = readText("ALIPAY_GATEWAY") || DEFAULT_GATEWAY;
  const keyType = readText("ALIPAY_KEY_TYPE") === "PKCS8" ? "PKCS8" : "PKCS1";

  if (hasCertificateConfig()) {
    cachedSdk = new AlipaySdk({
      appId,
      privateKey,
      gateway,
      keyType,
      signType: "RSA2",
      appCertContent: readSecret("ALIPAY_APP_CERT"),
      alipayPublicCertContent: readSecret("ALIPAY_PUBLIC_CERT"),
      alipayRootCertContent: readSecret("ALIPAY_ROOT_CERT"),
    });

    return cachedSdk;
  }

  const alipayPublicKey = readSecret("ALIPAY_PUBLIC_KEY");

  if (!alipayPublicKey) {
    throw new Error(
      "支付宝配置不完整：请配置 ALIPAY_PUBLIC_KEY，或改用 ALIPAY_APP_CERT / ALIPAY_PUBLIC_CERT / ALIPAY_ROOT_CERT 证书模式。",
    );
  }

  cachedSdk = new AlipaySdk({
    appId,
    privateKey,
    gateway,
    keyType,
    signType: "RSA2",
    alipayPublicKey,
  });

  return cachedSdk;
}
