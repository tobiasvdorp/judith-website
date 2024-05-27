import { NextResponse } from "next/server";
import axios from "axios";
const nodemailer = require("nodemailer");

export async function POST(request: Request, response: Response) {
  const secretKey = process?.env?.RECAPTCHA_SECRET;

  const postData = await request.json();
  const { gRecaptchaToken, name, email, message } = postData;

  console.log(
    "gRecaptchaToken,firstName,lastName,email,hearFromSponsors:",
    gRecaptchaToken?.slice(0, 10) + "...",
    name,
    email,
    message
  );

  let res: any;
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const myEmail = process.env.PERSONAL_EMAIL;

    const name = postData.name;
    const email = postData.email;
    const message = postData.message;

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: myEmail,
        pass: password,
      },
    });

    try {
      // Mail to admin
      const mail = await transporter.sendMail({
        from: email,
        to: myEmail,
        replyTo: email,
        subject: "Bericht via contactformulier",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #FABC75; padding: 20px; color: black;">
        <h2 style="">Bericht via contactformulier</h2>
        <p style="color: #333333;"><span style="font-weight: 600;">Naam afzender:</span> ${name}</p>
        <p style="color: #333333;"><span style="font-weight: 600">Email afzender:</span> ${email}</p>
        <p style="color: #333333;"><span style="font-weight: 600">Bericht:</span> ${message}</p>
          </div>
        `,
      });

      // Mail to sender
      const mailToSender = await transporter.sendMail({
        from: myEmail,
        to: email,
        subject: "Bedankt voor je bericht!",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #FABC75; padding: 20px; color: black;">
        <h2 style="">Ik heb je bericht ontvangen!</h2>
        <p style="color: #333333;">Ik zal zo snel mogelijk reageren.</p>
        <p style="color: #333333;">Groetjes, <br>Judith</p>

        <img src="https://img.freepik.com/free-vector/hand-drawn-mountain-range-silhouette_23-2150429157.jpg?size=626&ext=jpg" alt="Judith's signature" style="width: 300px; height: auto; margin-top: 20px;">
        </div>
        `,
      });

      return NextResponse.json(
        { message: "Success: email was sent" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "COULD NOT SEND MESSAGE" },
        { status: 500 }
      );
    }
  } else {
    console.log("fail: res.data?.score:", res.data?.score);
    return NextResponse.json({ success: false, name, score: res.data?.score });
  }
}
