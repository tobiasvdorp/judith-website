"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Banner from "./components/molecules/banner/Banner";
import Button from "./components/Standard/Button";
import MainWrapper from "./components/layouts/MainWrapper";
import Navbar from "./components/Navbar/NavBar";
import Text from "./components/Standard/Text";
import { ThemeProvider } from "./components/theme-provider";
import WhatIDo from "./components/molecules/what-i-do/WhatIDo";
import WhoIAm from "./components/molecules/WhoIAm";

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

Builder.registerComponent(Navbar, {
  name: "Navbar",
  inputs: [
    {
      name: "items",
      type: "list",
      subFields: [
        {
          name: "href",
          type: "string",
          required: true,
          defaultValue: "https://",
        },
        {
          name: "label",
          type: "string",
          required: true,
          defaultValue: "New Item",
        },
      ],
      required: true,
      defaultValue: [],
    },
    {
      name: "logoSrc",
      type: "file",
      allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
      required: true,
      defaultValue: "",
    },
    {
      name: "themeSwitcher",
      type: "boolean",
      defaultValue: true,
    },
  ],
});

Builder.registerComponent(WhatIDo, {
  name: "WhatIDo",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "sectionCards",
      type: "list",
      subFields: [
        {
          name: "imageSrc",
          type: "file",
          allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
          required: true,
        },
        {
          name: "title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          type: "string",
          required: true,
        },
        {
          name: "buttonRef",
          type: "string",
          required: true,
        },
      ],
      meta: {
        ts: "SectionCardProps[]",
      },
    },
  ],
});

Builder.registerComponent(Banner, {
  name: "Banner",
  inputs: [
    {
      name: "bannerType",
      type: "string",
      enum: ["links", "description"],
      required: true,
    },
    {
      name: "description",
      type: "string",
      showIf: `options.get('bannerType') === 'description'`,
    },
    {
      name: "items",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
          required: true,
        },
        {
          name: "url",
          type: "string",
          required: true,
        },
      ],
      showIf: `options.get('bannerType') === 'links'`,
    },
    {
      name: "imageUrl",
      type: "file",
      allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
      required: true,
    },
    {
      name: "alt",
      type: "string",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(withChildren(MainWrapper), {
  name: "MainWrapper",
  inputs: [
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "ReactNode",
      },
    },
  ],
});

Builder.registerComponent(WhoIAm, {
  name: "WhoIAm",
  inputs: [
    {
      name: "image",
      type: "file",
      allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "text",
      type: "richText",
      required: true,
    },
    {
      name: "buttonText",
      type: "string",
      required: true,
    },
    {
      name: "buttonRef",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(Text, {
  name: "Text",
  inputs: [
    {
      name: "title",
      type: "string",
      friendlyName: "Title",
    },
    {
      name: "text",
      type: "richText",
      friendlyName: "Text",
      required: true,
    },
    {
      name: "showButton",
      type: "boolean",
      defaultValue: false,
      friendlyName: "Show button",
      meta: {
        ts: "true",
      },
      required: true,
    },
    {
      name: "buttonText",
      type: "string",
      friendlyName: "Button text",
      showIf: `options.get('showButton') === true`,
    },
    {
      name: "buttonRef",
      type: "string",
      friendlyName: "Button ref",
      showIf: `options.get('showButton') === true`,
    },
  ],
});
