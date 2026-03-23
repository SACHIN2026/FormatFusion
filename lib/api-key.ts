import crypto from 'crypto';
import User from '@/models/User';
import { dbconnect } from '@/lib/db';

export function generateApiKey() {
  const raw = crypto.randomBytes(32).toString('hex');
  const key = `ff_${raw}`;
  const prefix = key.slice(0, 10);
  return { key, prefix };
}

export function hashApiKey(key: string) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

export async function getUserByApiKey(apiKey: string) {
  if (!apiKey) return null;
  await dbconnect();
  const hashed = hashApiKey(apiKey);
  return User.findOne({ apiKeyHash: hashed });
}

export function extractApiKeyFromHeaders(headers: Headers) {
  const direct = headers.get('x-api-key') || '';
  if (direct) return direct.trim();

  const auth = headers.get('authorization') || '';
  if (auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7).trim();
  }

  return '';
}
