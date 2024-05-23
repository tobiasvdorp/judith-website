import { RegisteredComponent } from "@builder.io/sdk-react-nextjs";
import Button from "@/components/Standard/Button";
import WhatIDo from "@/components/organisms/WhatIDo";
import { Children } from "react";

// export const customComponents: RegisteredComponent[] = [
//   {
//     component: Button,
//     name: "Button",
//     inputs: [
//       {
//         name: "text",
//         type: "string",
//         required: true,
//       },
//     ],
//     isRSC: true,
//   },
//   {
//     component: WhatIDo,
//     name: "WhatIDo",
//     inputs: [
//       {
//         name: "title",
//         type: "string",
//         required: true,
//       },
//       {
//         name: "description",
//         type: "string",
//       },
//       {
//         name: "sectionCards",
//         type: "list",
//         subFields: [
//           {
//             name: "imageSrc",
//             type: "file",
//             allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
//             required: true,
//           },
//           {
//             name: "title",
//             type: "string",
//             required: true,
//           },
//           {
//             name: "description",
//             type: "string",
//             required: true,
//           },
//           {
//             name: "buttonRef",
//             type: "string",
//             required: true,
//           },
//         ],
//         meta: {
//           ts: "SectionCardProps[]",
//         },
//       },
//     ],
//   },
// ];
const componentsConfig = [
  {
    name: "Button",
    path: "Standard/Button",
    inputs: [
      {
        name: "text",
        type: "string",
        required: true,
      },
      {
        name: "url",
        friendlyName: "URL",
        type: "string",
        required: true,
      },
    ],
    isRSC: true,
  },

  {
    name: "WhatIDo",
    path: "organisms/WhatIDo",
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
        required: true,
      },
    ],
    isRSC: true,
  },
  {
    name: "Banner",
    path: "molecules/banner/Banner",
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
    isRSC: true,
  },

  {
    name: "WhoIAm",
    path: "organisms/WhoIAm",
    inputs: [
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["png", "jpg", "webp", "svg", "jpeg"],
        required: true,
        defaultValue: "/images/placeholder.png",
      },
      // {
      //   name: "title",
      //   type: "string",
      //   required: true,
      //   defaultValue: "Wie ben ik?",
      // },
      {
        name: "text",
        type: "richText",
        required: true,
        defaultValue: "Text",
      },
      {
        name: "buttonText",
        type: "string",
        required: true,
        defaultValue: "Button",
      },
      {
        name: "buttonRef",
        type: "string",
        required: true,
        defaultValue: "/",
      },
    ],
    isRSC: true,
  },
  {
    name: "Text",
    path: "Standard/Text",
    inputs: [
      // {
      //   name: "title",
      //   type: "string",
      //   friendlyName: "Title",
      // },
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
        friendlyName: "Button URL",
        showIf: `options.get('showButton') === true`,
      },
    ],
    isRSC: true,
  },
  {
    name: "MainWrapper",
    path: "layouts/MainWrapper",
    inputs: [
      {
        name: "children",
        type: "uiBlocks",
      },
    ],
    isRSC: true,
  },

  {
    name: "BlogPosts",
    path: "organisms/BlogPosts",
    isRSC: true,
  },

  {
    name: "AgendaItems",
    path: "organisms/AgendaItems",
    isRSC: true,
    inputs: [
      {
        name: "isHomeComponent",
        friendlyName: "On homepage",
        type: "boolean",
        defaultValue: false,
        required: true,
      },
      {
        name: "title",
        type: "string",
        required: false,
        showIf: `options.get('isHomeComponent') === true`,
      },
    ],
  },
];

export default componentsConfig;

export async function loadComponents() {
  const imports = componentsConfig.map((conf) =>
    import(`@/components/${conf.path}`).then((module) => ({
      name: conf.name,
      component: module.default,
      inputs: conf.inputs,
      isRSC: conf.isRSC,
    }))
  );
  return Promise.all(imports);
}
