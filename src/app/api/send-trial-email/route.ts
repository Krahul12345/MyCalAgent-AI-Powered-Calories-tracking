import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
// @ts-ignore
import QRCode from "qrcode";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.mycalagent.app";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  // Rate limit: 3 emails per IP per hour to prevent abuse/spam
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { namespace: "send-trial-email", limit: 3, windowMs: 60 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email send");
      return NextResponse.json({
        success: true,
        message: "Email service not configured, but signup successful"
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_for_build");

    // Generate QR code as base64 data URI
    const qrCodeDataUrl = await QRCode.toDataURL(PLAY_STORE_LINK, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.95,
      margin: 1,
      width: 200,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Generate email HTML
    const htmlContent = generateEmailHTML(qrCodeDataUrl, PLAY_STORE_LINK);

    // Send email via Resend
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Welcome to MyCalAgent - Start Your 3-Day Free Trial",
      html: htmlContent,
      replyTo: process.env.RESEND_REPLY_TO,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: response.data?.id,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    console.error("[send-trial-email]", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

function generateEmailHTML(qrCodeBase64: string, playStoreLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MyCalAgent - Welcome</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 20px;">
        <!-- Main container: 600px width for email clients -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #15803D 0%, #10B981 50%, #34d399 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 0 0 30px rgba(253, 224, 71, 0.6), 0 0 60px rgba(253, 224, 71, 0.4);">MyCalAgent</h1>
              <p style="margin: 10px 0 0 0; color: #e0ffe0; font-size: 18px; font-weight: 600;">Welcome to Your 3-Day Free Trial!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #0f172a; font-size: 16px; line-height: 1.6;">
                <strong>Welcome to MyCalAgent!</strong>
              </p>
              
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 15px; line-height: 1.6;">
                We're thrilled to have you on board! MyCalAgent uses cutting-edge AI and computer vision to make calorie tracking effortless and accurate.
              </p>

              <p style="margin: 0 0 30px 0; color: #475569; font-size: 15px; line-height: 1.6;">
                Download the app now and start your 3-day free trial to experience the future of nutrition tracking.
              </p>

              <!-- QR Code Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, rgba(21,128,61,0.06) 0%, rgba(16,185,129,0.08) 100%); border-radius: 12px; border: 2px solid rgba(16,185,129,0.15);">
                    <p style="margin: 0 0 15px 0; color: #15803D; font-size: 16px; font-weight: 700;">Scan to Download</p>
                    <img src="${qrCodeBase64}" alt="Download MyCalAgent QR Code" width="200" height="200" style="display: block; margin: 0 auto; border-radius: 8px; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <p style="margin: 15px 0 0 0; color: #64748b; font-size: 13px;">Or click the button below</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${playStoreLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #15803D 0%, #10B981 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">
                      Get the App on Google Play
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Features List -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                    <p style="margin: 0 0 15px 0; color: #15803D; font-size: 15px; font-weight: 700;">What You'll Get:</p>
                    <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">✓ AI-powered food recognition</p>
                    <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">✓ Instant calorie tracking</p>
                    <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">✓ Smart nutrition insights</p>
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">✓ 3 days completely free</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Questions? We're here to help! Reply to this email or visit our support page anytime.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 20px; background-color: #f8fafc; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                © 2025 MyCalAgent. All rights reserved.
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                AI-Powered Smart Calorie Tracking
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
