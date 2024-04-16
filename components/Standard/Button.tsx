import { Builder } from "@builder.io/react";

type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return <button className="bg-red-700">{text}</button>;
}
