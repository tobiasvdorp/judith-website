"use client";
import Input from "../Standard/Input";
import HTMLButton from "../Standard/HTMLbutton";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import GoogleCaptchaWrapper from "../layouts/google-captcha-wrapper";
import axios from "axios";
import Link from "next/link";
import Text from "../Standard/Text";
import Title from "../Standard/Title";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";

type PostData = {
  gRecaptchaToken: string;
  name: string;
  email: string;
  message: string;
  important: string;
};

type ContactFormProps = {
  title?: string;
  text?: string;
};

export default function ContactForm(props: ContactFormProps) {
  return (
    <GoogleCaptchaWrapper>
      <ContactFormInside text={props.text} title={props.title} />
    </GoogleCaptchaWrapper>
  );
}

export function ContactFormInside(props: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [error, setError] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmitForm = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!executeRecaptcha) {
      return;
    }

    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      submitEnquiryForm(gReCaptchaToken);
    });
  };

  const submitEnquiryForm = (gReCaptchaToken: string) => {
    setLoading(true); // Start loading
    async function goAsync() {
      try {
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

        if (response.status === 200) {
          setModalName(name);
          setModal(true);
          setName("");
          setEmail("");
          setMessage("");
        } else {
          null;
        }
      } catch (error) {
        setError(
          "Er is iets misgegaan met het versturen van het formulier. Probeer het later opnieuw."
        );
      } finally {
        setLoading(false); // Always stop loading
      }
    }
    goAsync().catch((error) => {
      setLoading(false); // Stop loading
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-5 max-w-96"
        onSubmit={handleSubmitForm}
      >
        {props.title && <Title text={props.title} order={2} />}
        {props.text && (
          <Title text={props.text} order={2} className="text-base font-space" />
        )}
        <AnimatePresence>
          {modal && (
            <Modal
              isOpen={modal}
              onClose={() => setModal(false)}
              title={`Bedankt ${modalName.split(" ")[0]}!`}
            >
              <Text text="Ik heb je bericht ontvangen en zal zo snel mogelijk reageren. Je krijgt via de mail een bevestiging." />
            </Modal>
          )}
        </AnimatePresence>

        <Input
          id="name"
          label="Naam"
          type="text"
          value={name}
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
          value={email}
          required
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <Input
          id="message"
          label="Bericht"
          type="textarea"
          value={message}
          required
          placeholder=" "
          inputClassName="h-32"
          onChange={(e) => setMessage(e.target.value)}
        />

        <AnimatePresence>
          {error && (
            <Modal
              title="Oh nee!"
              isOpen={error ? true : false}
              onClose={() => setError("")}
            >
              {error}
            </Modal>
          )}
        </AnimatePresence>
        <HTMLButton
          text={"Verstuur"}
          type="submit"
          loading={loading}
          loadingText="Versturen..."
          disabled={loading}
        />
      </form>
      <div className="text-xs  opacity-80 -my-3 absolute -bottom-16">
        *Deze site is beschermd door reCAPTCHA en de {""}
        <Link
          href="https://policies.google.com/privacy"
          className="underline text-blue-500"
        >
          Privacyverklaring
        </Link>
        {""} en {""}
        <Link
          href="https://policies.google.com/terms"
          className="underline text-blue-500"
        >
          Algemene voorwaarden
        </Link>
        {""} van Google zijn van toepassing.
      </div>
    </>
  );
}
