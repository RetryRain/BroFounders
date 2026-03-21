import dns from "dns/promises";

const bannedDomains = new Set([
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
]);

export async function validateEmailAdvanced(email: string) {
  const parts = email.split("@");
  const domain = parts[1]?.toLowerCase();

  if (!domain) {
    return { valid: false, reason: "Invalid email format" };
  }

  // disposable check
  if (bannedDomains.has(domain)) {
    return { valid: false, reason: "Disposable email not allowed" };
  }

  // MX check
  try {
    const mx = await dns.resolveMx(domain);
    if (!mx || mx.length === 0) {
      return { valid: false, reason: "Invalid email domain" };
    }
  } catch {
    return { valid: false, reason: "Invalid email domain" };
  }

  return { valid: true };
}
