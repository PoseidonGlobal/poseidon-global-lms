import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send student registration email with temporary password
 */
export async function sendRegistrationEmail(email, studentNumber, temporaryPassword, firstName) {
  const subject = 'Welcome to Poseidon Global Maritime University'
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #0b1020, #1e90ff); padding: 2rem; text-align: center;">
        <h1 style="color: #d4af37; margin: 0; font-size: 2rem;">Poseidon Global</h1>
        <p style="color: white; margin: 0.5rem 0 0; font-size: 1.1rem;">Maritime University</p>
      </div>
      
      <div style="padding: 2rem; background: white;">
        <h2 style="color: #0b1020;">Welcome aboard, ${firstName}!</h2>
        
        <p>Your registration has been successful. Here are your login credentials:</p>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
          <p><strong>Student Number:</strong> ${studentNumber}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Temporary Password:</strong> <code style="background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${temporaryPassword}</code></p>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
          <p style="margin: 0; color: #856404;"><strong>Important:</strong> You must change your password on first login for security purposes.</p>
        </div>
        
        <p>You can now access your student dashboard at:</p>
        <p><a href="${process.env.APP_URL}/login" style="color: #1e90ff;">${process.env.APP_URL}/login</a></p>
        
        <p>Welcome to Poseidon Global Maritime University - where knowledge meets strategy, and the future of maritime safety takes shape.</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 1rem; text-align: center; color: #666; font-size: 0.9rem;">
        <p>© ${new Date().getFullYear()} Poseidon Global Maritime University</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: html
    })
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email, resetToken, firstName) {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`
  const subject = 'Reset Your Password - Poseidon Global'
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #0b1020, #1e90ff); padding: 2rem; text-align: center;">
        <h1 style="color: #d4af37; margin: 0; font-size: 2rem;">Poseidon Global</h1>
        <p style="color: white; margin: 0.5rem 0 0; font-size: 1.1rem;">Maritime University</p>
      </div>
      
      <div style="padding: 2rem; background: white;">
        <h2 style="color: #0b1020;">Password Reset Request</h2>
        
        <p>Hello ${firstName || 'there'},</p>
        
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        
        <div style="text-align: center; margin: 2rem 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #1e90ff, #0b1020); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        </div>
        
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
          <p style="margin: 0; color: #856404;"><strong>Note:</strong> This link will expire in 1 hour for security purposes.</p>
        </div>
        
        <p>If you didn't request this password reset, please ignore this email.</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 1rem; text-align: center; color: #666; font-size: 0.9rem;">
        <p>© ${new Date().getFullYear()} Poseidon Global Maritime University</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: html
    })
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Send password change confirmation email
 */
export async function sendPasswordChangeConfirmation(email, firstName) {
  const subject = 'Password Changed Successfully - Poseidon Global'
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #0b1020, #1e90ff); padding: 2rem; text-align: center;">
        <h1 style="color: #d4af37; margin: 0; font-size: 2rem;">Poseidon Global</h1>
        <p style="color: white; margin: 0.5rem 0 0; font-size: 1.1rem;">Maritime University</p>
      </div>
      
      <div style="padding: 2rem; background: white;">
        <h2 style="color: #0b1020;">Password Changed Successfully</h2>
        
        <p>Hello ${firstName || 'there'},</p>
        
        <p>Your password has been successfully changed. If you did not make this change, please contact our support team immediately.</p>
        
        <p>You can continue to access your account at:</p>
        <p><a href="${process.env.APP_URL}/login" style="color: #1e90ff;">${process.env.APP_URL}/login</a></p>
      </div>
      
      <div style="background: #f8f9fa; padding: 1rem; text-align: center; color: #666; font-size: 0.9rem;">
        <p>© ${new Date().getFullYear()} Poseidon Global Maritime University</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: html
    })
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error.message }
  }
}