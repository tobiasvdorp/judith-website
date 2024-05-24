"use client";
import Input from "../Standard/Input";
import HTMLButton from "../Standard/HTMLbutton";
import { useState } from "react";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(name, email, message);
  };
  return (
    <>
      <form className="flex flex-col gap-5 w-96" onSubmit={handleSubmit}>
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
        {/* Honeypot */}
        <Input
          id="website"
          label="Website"
          type="text"
          placeholder=" "
          className="important"
          onChange={(e) => console.log("Honeypot triggered")}
        />
        <HTMLButton text={"Verstuur"} type="submit" />
      </form>
    </>
  );
}
