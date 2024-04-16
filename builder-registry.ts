"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Button from "./components/Standard/Button";
import Text from "./components/Standard/Text";
import { ThemeProvider } from "./components/theme-provider";

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

Builder.registerComponent(withChildren(ThemeProvider), {
  name: "ThemeProvider",
  inputs: [
    {
      name: "attribute",
      type: "string",
    },
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
    {
      name: "defaultTheme",
      type: "string",
    },
    {
      name: "disableTransitionOnChange",
      type: "boolean",
    },
    {
      name: "enableColorScheme",
      type: "boolean",
    },
    {
      name: "enableSystem",
      type: "boolean",
    },
    {
      name: "forcedTheme",
      type: "string",
    },
    {
      name: "storageKey",
      type: "string",
    },
    {
      name: "themes",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "string[]",
      },
    },
    {
      name: "value",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "ValueObject",
      },
    },
  ],
});
