import bcrypt from 'bcryptjs'
import crypto from 'crypto'

/**
 * Generate a temporary strong password
 */
export function generateTemporaryPassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * Generate a secure reset token
 */
export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex')
}