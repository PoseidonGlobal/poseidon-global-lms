import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/password'
import { sendPasswordChangeConfirmation } from '@/lib/email'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        studentProfile: true,
        facultyProfile: true,
        adminProfile: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.hashedPassword)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password and clear mustChangePassword flag
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          hashedPassword: hashedNewPassword,
          mustChangePassword: false
        }
      })

      // Log password change
      await tx.auditLog.create({
        data: {
          userId: user.id,
          action: 'PASSWORD_CHANGED',
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent')
        }
      })
    })

    // Get user's first name for email
    const firstName = user.studentProfile?.firstName || 
                     user.facultyProfile?.name?.split(' ')[0] || 
                     user.adminProfile?.name?.split(' ')[0] || 
                     null

    // Send confirmation email
    const emailResult = await sendPasswordChangeConfirmation(
      user.email,
      firstName
    )

    if (!emailResult.success) {
      console.error('Failed to send password change confirmation:', emailResult.error)
      // Don't fail the password change if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}