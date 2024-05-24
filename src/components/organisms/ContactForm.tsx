"use client";
import Input from "../Standard/Input";
import HTMLButton from "../Standard/HTMLbutton";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import GoogleCaptchaWrapper from "../layouts/google-captcha-wrapper";
import axios from "axios";

type PostData = {
  gRecaptchaToken: string;
  name: string;
  email: string;
  message: string;
  important: string;
};

export default function ContactForm() {
  return (
    <GoogleCaptchaWrapper>
      <ContactFormInside />
    </GoogleCaptchaWrapper>
  );
}

export function ContactFormInside() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmitForm = function (e: any) {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");

      return;
    }

    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      submitEnquiryForm(gReCaptchaToken);
    });
  };

  const submitEnquiryForm = (gReCaptchaToken: string) => {
    async function goAsync() {
      const response = await axios({
        method: "post",
        url: "/api/contactFormSubmit",
        data: {
          name: name,
          email: email,
          message: message,
          gRecaptchaToken: gReCaptchaToken,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success === true) {
        console.log(`Success with score: ${response?.data?.score}`);
      } else {
        console.log(`Failure with score: ${response?.data?.score}`);
      }
    }
    goAsync().then(() => {}); // suppress typescript error
  };

  return (
    <>
      <form className="flex flex-col gap-5 w-96" onSubmit={handleSubmitForm}>
        <Input
          id="name"
          label="Naam"
          type="text"
          required
          placeholder=" "
          onChange={(e) => setName(e.target.value)}
          inputClassName=""
          labelClassName=""
        />
        <Input
          id="email"
          label="Email"
          type="email"
          required
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="message"
          label="Bericht"
          type="textarea"
          required
          placeholder=" "
          inputClassName="h-32"
          onChange={(e) => setMessage(e.target.value)}
        />

        <HTMLButton text={"Verstuur"} type="submit" />
      </form>
    </>
  );
}
