import { prisma } from './prisma'

/**
 * Generate a unique student number in format PG-YYYY-####
 * Retries on conflict to ensure uniqueness
 */
export async function generateStudentNumber() {
  const currentYear = new Date().getFullYear()
  const prefix = `PG-${currentYear}-`

  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    // Get the next sequence number by counting existing students for this year
    const existingCount = await prisma.studentProfile.count({
      where: {
        studentNumber: {
          startsWith: prefix
        }
      }
    })

    const sequenceNumber = String(existingCount + 1).padStart(4, '0')
    const studentNumber = `${prefix}${sequenceNumber}`

    try {
      // Try to use this number by attempting to find if it exists
      const existing = await prisma.studentProfile.findUnique({
        where: {
          studentNumber: studentNumber
        }
      })

      if (!existing) {
        return studentNumber
      }

      attempts++
    } catch (error) {
      attempts++
      if (attempts >= maxAttempts) {
        throw new Error('Failed to generate unique student number after maximum attempts')
      }
    }
  }

  throw new Error('Failed to generate unique student number')
}