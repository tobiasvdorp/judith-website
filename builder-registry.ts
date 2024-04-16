"use client";
import { builder, Builder } from "@builder.io/react";
import Button from "./components/Standard/Button";
import Text from "./components/Standard/Text";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Button, {
  name: "Button",
  override: true,
  inputs: [
    {
      name: "text",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(Text, {
  name: "Text",
  inputs: [
    {
      name: "fontSize",
      type: "number",
      required: true,
    },
    {
      name: "kaas",
      type: "string",
      required: true,
    },
    {
      name: "melk",
      type: "string",
      required: true,
    },
    {
      name: "name",
      type: "string",
      required: true,
    },
  ],
});
