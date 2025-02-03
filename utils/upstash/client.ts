// /upstash/client.js
import { Redis } from '@upstash/redis';

// Create and export the Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL, // Use the Redis URL from Upstash
  token: process.env.UPSTASH_REDIS_TOKEN, // Use the Redis token from Upstash
});
