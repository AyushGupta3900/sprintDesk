import { getRedisClient } from "../config/redis.js";

export async function getCache(key) {
  const redis = getRedisClient();
  const value = await redis.get(key);

  return value ? JSON.parse(value) : null;
}

export async function setCache(key, value, ttl = 300) {
  const redis = getRedisClient();
  await redis.set(key, JSON.stringify(value), {
    EX: ttl,
  });
}

export async function deleteCache(key) {
  const redis = getRedisClient();
  await redis.del(key);
}
