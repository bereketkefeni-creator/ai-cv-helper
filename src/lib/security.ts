import { NextResponse } from "next/server";
import { timingSafeEqual, createHash } from "crypto";

// ---------- Input validation ----------

const MAX_CV_TEXT_LENGTH = 50_000; // ~50k chars, well above any reasonable CV
const MAX_SHORT_FIELD_LENGTH = 200; // job title, company name, etc.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export { MAX_CV_TEXT_LENGTH, MAX_SHORT_FIELD_LENGTH, MAX_FILE_SIZE };

/**
 * Sanitise a string by trimming and stripping control characters (except
 * newlines / tabs which are common in CVs).
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

/**
 * Sanitise a filename — strip path separators and null bytes so the name
 * can never be used for path traversal.
 */
export function sanitizeFileName(name: string): string {
  return name
    .replace(/[/\\]/g, "_") // replace path separators
    .replace(/\0/g, "") // strip null bytes
    .replace(/\.\./g, "_") // prevent directory traversal
    .trim()
    .slice(0, 255); // limit length
}

/**
 * Validate that `value` is a non-empty string within `maxLength`.
 * Returns `null` when valid, or a `NextResponse` error when not.
 */
export function validateStringField(
  value: unknown,
  fieldName: string,
  maxLength: number
): NextResponse | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return NextResponse.json(
      { error: `${fieldName} is required and must be a non-empty string.` },
      { status: 400 }
    );
  }
  if (value.length > maxLength) {
    return NextResponse.json(
      {
        error: `${fieldName} exceeds the maximum allowed length of ${maxLength} characters.`,
      },
      { status: 400 }
    );
  }
  return null;
}

// ---------- Rate limiting (in-memory, per-IP) ----------

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // max requests per window per IP

/**
 * Simple in-memory sliding-window rate limiter.
 * Returns `null` when allowed, or a `NextResponse` 429 when exceeded.
 */
export function checkRateLimit(
  request: Request
): NextResponse | null {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((entry.resetAt - now) / 1000)
          ),
        },
      }
    );
  }

  return null;
}

// Periodically clean up stale entries to prevent memory leaks
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);
cleanupInterval.unref();

// ---------- API key authentication ----------

/**
 * Constant-time string comparison via SHA-256 hashing.
 * Prevents timing side-channel attacks on secret values.
 */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Check whether the request originates from the app's own frontend.
 * Same-origin browser requests include an `origin` or `referer` header
 * that matches the `Host` header, so we can skip the API key for those.
 */
function isSameOriginRequest(request: Request): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Optional API-key gate. When `API_SECRET_KEY` is set in the environment,
 * external API requests must include a matching `Authorization: Bearer <key>`
 * header. Same-origin requests from the built-in frontend are allowed
 * through without a key. When the env var is *not* set the check is
 * skipped entirely so local development works without extra configuration.
 */
export function checkApiKey(request: Request): NextResponse | null {
  const secret = process.env.API_SECRET_KEY;
  if (!secret) {
    // No key configured — allow (dev mode / open deployment)
    return null;
  }

  // Allow same-origin requests from the built-in frontend
  if (isSameOriginRequest(request)) {
    return null;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!token || !safeEqual(token, secret)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
