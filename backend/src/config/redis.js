import { createClient } from "redis";

let redisClient;

export async function connectRedis() {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    await redisClient.connect();

    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection failed", error);
    process.exit(1);
  }
}

export function getRedisClient() {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
}