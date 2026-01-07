/**
 * AWS SES Email Client
 * Handles transactional email sending via AWS SES
 */

import {
  SESClient,
  SendEmailCommand,
  SendTemplatedEmailCommand,
} from "@aws-sdk/client-ses";
import { env } from "../config";

// Initialize SES client
function getSESClient(): SESClient {
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS credentials not configured");
  }

  return new SESClient({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface TemplatedEmailOptions {
  to: string | string[];
  templateName: string;
  templateData: Record<string, string>;
  replyTo?: string;
}

/**
 * Send a simple email
 */
export async function sendEmail(
  options: EmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!env.SES_FROM_EMAIL) {
    return { success: false, error: "SES_FROM_EMAIL not configured" };
  }

  try {
    const client = getSESClient();
    const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

    const command = new SendEmailCommand({
      Source: env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: options.html,
            Charset: "UTF-8",
          },
          ...(options.text && {
            Text: {
              Data: options.text,
              Charset: "UTF-8",
            },
          }),
        },
      },
      ...(options.replyTo && {
        ReplyToAddresses: [options.replyTo],
      }),
    });

    const response = await client.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a templated email (requires SES templates to be configured)
 */
export async function sendTemplatedEmail(
  options: TemplatedEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!env.SES_FROM_EMAIL) {
    return { success: false, error: "SES_FROM_EMAIL not configured" };
  }

  try {
    const client = getSESClient();
    const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

    const command = new SendTemplatedEmailCommand({
      Source: env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: toAddresses,
      },
      Template: options.templateName,
      TemplateData: JSON.stringify(options.templateData),
      ...(options.replyTo && {
        ReplyToAddresses: [options.replyTo],
      }),
    });

    const response = await client.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error("Failed to send templated email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Pre-built email templates
export const emailTemplates = {
  welcome: (name: string, appUrl: string) => ({
    subject: "Welcome to Our App!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7c3aed;">Welcome, ${name}!</h1>
        <p>Thanks for signing up. We're excited to have you on board.</p>
        <p>
          <a href="${appUrl}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 8px;">
            Go to Dashboard
          </a>
        </p>
      </div>
    `,
    text: `Welcome, ${name}! Thanks for signing up. Visit ${appUrl}/dashboard to get started.`,
  }),

  passwordReset: (resetUrl: string) => ({
    subject: "Reset Your Password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7c3aed;">Reset Your Password</h1>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 8px;">
            Reset Password
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Reset your password by visiting: ${resetUrl}. This link expires in 1 hour.`,
  }),
};
