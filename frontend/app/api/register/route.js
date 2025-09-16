import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateStudentNumber } from '@/lib/student-number'
import { generateTemporaryPassword, hashPassword } from '@/lib/password'
import { sendRegistrationEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, country } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      )
    }

    // Generate student number and temporary password
    const studentNumber = await generateStudentNumber()
    const temporaryPassword = generateTemporaryPassword()
    const hashedPassword = await hashPassword(temporaryPassword)

    // Create user and student profile in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          hashedPassword,
          role: 'STUDENT',
          mustChangePassword: true
        }
      })

      const studentProfile = await tx.studentProfile.create({
        data: {
          userId: user.id,
          studentNumber,
          firstName,
          lastName,
          phone: phone || null,
          country: country || null
        }
      })

      // Log registration
      await tx.auditLog.create({
        data: {
          userId: user.id,
          action: 'STUDENT_REGISTRATION',
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent')
        }
      })

      return { user, studentProfile }
    })

    // Send registration email
    const emailResult = await sendRegistrationEmail(
      email,
      studentNumber,
      temporaryPassword,
      firstName
    )

    if (!emailResult.success) {
      console.error('Failed to send registration email:', emailResult.error)
      // Don't fail the registration if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Check your email for login credentials.',
      studentNumber
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    )
  }
}