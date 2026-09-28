import { SignJWT, jwtVerify } from 'jose';
import { getSecretKey } from './constants';

export async function signSession(payload, expiresAt) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecretKey());
}

/** Returns the session payload, or null when the token is missing/invalid/expired. */
export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: ['HS256'] });
    return payload;
  } catch {
    return null;
  }
}
