// app/services/signal-service.ts
import { db } from "~/database";
//import { sendEmail } from "~/utils/email/sendEmail.server";
import { APP_URL } from "~/utils/env";

type SignalResponse = {
  success: boolean;
  message: string;
  id: string;
  token: string;
  unsubscribeUrl: string;
};
export class SignalService {
  async subscribe(email: string): Promise<SignalResponse> {
    // Check if already exists
    const existing = await db.signalSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      const unsubscribeUrl = `${APP_URL}/subscribe/unsubscribe?token=${existing.token}`;

      return {
        success: true,
        message: "Already subscribed",
        id: existing.id,
        token: existing.token,
        unsubscribeUrl: unsubscribeUrl,
      };

      /*  } else {
        // Resend verification
        await this.sendVerification(existing.email, existing.token);
        return { success: true, message: "Verification email resent" };
      } */
    }

    // Create new subscriber

    try {
      const subscriber = await db.signalSubscriber.create({
        data: { email },
      });

      const unsubscribeUrl = `${APP_URL}/join/unsubscribe?token=${subscriber.token}`;

      return {
        success: true,
        message: "Please check your email to verify",
        id: subscriber.id,
        token: subscriber.token,
        unsubscribeUrl: unsubscribeUrl,
      };
    } catch (_error: unknown) {
      throw new Error("DB Error");
    }
  }

  /*
  async subscribe2(name:string,email: string) {
    // Check if already exists
    const existing = await db.signalSubscriber.findUnique({
      where: { email }
    });
    
    if (existing) {
      if (existing.verified) {
        return { success: true, message: "Already subscribed" };
      } else {
        // Resend verification
        //await this.sendVerification(existing.email, existing.token);
        return { success: true, message: "Verification email resent" };
      }
    }
    
    // Create new subscriber
    const subscriber = await db.signalSubscriber.create({
      data: { email }
    });
    
    // Send verification email
    //await this.sendVerification(subscriber.email, subscriber.token);
    
    return { success: true, message: "Please check your email to verify" };
  }
  
  async verify(token: string) {
    const subscriber = await db.signalSubscriber.findUnique({
      where: { token }
    });
    
    if (!subscriber) {
      return { success: false, message: "Invalid verification token" };
    }
  
    
    await db.signalSubscriber.update({
      where: { id: subscriber.id },
      data: { verified: true }
    });
    
    return { success: true, message: "Email verified successfully" };
  }
    */

  async unsubscribe(token: string) {
    try {
      const subscriber = await db.signalSubscriber.findUnique({
        where: { token },
      });

      //throw new Error("Unsubscribe not implemented yet");

      if (!subscriber) {
        throw new Error(
          "Invalid or expired token. This unsubscribe link is no longer valid.",
        );
        //return { success: true, message: "Invalid or expired token. This unsubscribe link is no longer valid." };
      }

      await db.signalSubscriber.delete({
        where: { id: subscriber.id },
      });

      return {
        success: true,
        message: "Your email and private data is deleted.",
      };
    } catch (_error: unknown) {
      throw new Error("Failed to unsubscribe: Database error");
    }
  }

  /* 
  private async sendVerification(email: string, token: string) {
    const verificationUrl = `${process.env.APP_URL}/join/verify?token=${token}`;
    
    await sendEmail({
      to: email,
      subject: "Verify your Synthetism signal subscription",
      html: `
        <h1>Verify your subscription</h1>
        <p>Click the link below to verify your subscription to Synthetism signals:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>If you didn't request this, you can ignore this email.</p>
      `
    });
 
} */
}

export const signalService = new SignalService();
