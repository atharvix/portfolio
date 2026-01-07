import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cyber Portfolio API is running');
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if SMTP is configured
    const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (!isSmtpConfigured) {
      // Development mode: just log to console
      console.log('📧 Contact Form Submission (SMTP not configured):');
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${email}`);
      console.log(`   Message: ${message}`);
      console.log('   ℹ️  Configure SMTP in .env to send real emails');

      return res.json({
        success: true,
        message: 'Message received (development mode - check server console)'
      });
    }

    // Production mode: send real emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Verify transporter configuration only in production
    if (process.env.NODE_ENV === 'production') {
      await transporter.verify();
    }

    const fromEmail = process.env.FROM_EMAIL || 'noreply@portfolio.com';
    const fromName = process.env.FROM_NAME || 'Portfolio Contact';
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@example.com';

    // 1. Send notification to owner
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: ownerEmail,
      subject: `🔔 New Portfolio Message from ${name}`,
      text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f3ff;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #00f3ff;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `
    });

    // 2. Send confirmation to user
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: '✅ Transmission Received',
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nAtharv Mehrotra`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f3ff;">Transmission Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Atharv Mehrotra</strong></p>
        </div>
      `
    });

    console.log(`✅ Emails sent successfully to ${email} and ${ownerEmail}`);
    res.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('❌ Contact API Error:', error);
    res.status(500).json({
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
