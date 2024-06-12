import { NextResponse } from "next/server";
import axios from "axios";
const nodemailer = require("nodemailer");

export async function POST(request: Request, response: Response) {
  const secretKey = process?.env?.RECAPTCHA_SECRET;
  const postData = await request.json();
  const { gRecaptchaToken, name, email, message } = postData;
  console.log(gRecaptchaToken?.slice(0, 10) + "...", name, email, message);

  // Verifieer de reCAPTCHA
  let res: any;
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
    return new Response(
      JSON.stringify({ message: "Recaptcha verification failed" }),
      { status: 500 }
    );
  }

  // Alleen doorgaan als recaptcha succesvol is
  if (res.data?.success && res.data?.score > 0.5) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PERSONAL_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verzend e-mails
    try {
      // Mail naar admin
      const mailAdmin = await transporter.sendMail({
        from: email,
        to: process.env.PERSONAL_EMAIL,
        replyTo: email,
        subject: "Bericht via contactformulier",
        html: `<!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div style="background-color: #FABC75; padding: 20px; color: black;">
            <h2>Bericht via contactformulier</h2>
            <p><strong>Naam afzender:</strong> ${name}</p>
            <p><strong>Email afzender:</strong> ${email}</p>
            <p><strong>Bericht:</strong> ${message}</p>
          </div>
        </body>
        </html>`,
      });

      // Mail naar zender
      const mailSender = await transporter.sendMail({
        from: process.env.PERSONAL_EMAIL,
        to: email,
        subject: "Bedankt voor je bericht!",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div style="background-color: #FABC75; padding: 20px; color: black;">
            <h2>Bedankt voor je bericht!</h2>
            <p>Ik heb je bericht ontvangen en zal zo snel mogelijk reageren. </p>
          </div>
        </body>
        </html>
        `,
      });

      // Controleer of beide e-mails zijn verzonden
      if (mailAdmin.accepted.length > 0 && mailSender.accepted.length > 0) {
        return new Response(
          JSON.stringify({ message: "Success: email was sent" }),
          { status: 200 }
        );
      } else {
        console.log("Failed to send one or both emails");
        return new Response(
          JSON.stringify({ message: "Failed to send one or both emails" }),
          { status: 500 }
        );
      }
    } catch (error) {
      console.log("Error sending email", error);
      return new Response(JSON.stringify({ message: "Error sending email" }), {
        status: 500,
      });
    }
  } else {
    console.log(
      "Recaptcha validation failed or score too low:",
      res.data?.score
    );
    return new Response(
      JSON.stringify({ message: "Recaptcha validation failed" }),
      { status: 401 }
    );
  }
}
