import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasKeys = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasKeys
  ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
  : null;

const ratelimit = redis
  ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
  })
  : null;

export async function verifyRateLimit(identifier: string) {
  if (!ratelimit) {
    return { success: true };
  }
  return await ratelimit.limit(identifier);
}
