import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, companyName, service, message } = await req.json();
    console.log(name, email, companyName, service, message);
    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: "lloyd@aff-starter.com", // Updated recipient email
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact via company website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 