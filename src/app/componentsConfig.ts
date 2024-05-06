const componentsConfig = [
  {
    name: "TestComponent",
    path: "testComponent.tsx",
    inputs: [
      {
        name: "text",
        type: "string",
        required: true,
      },
      {
        name: "number",
        friendlyName: "Numberja",
        type: "number",
        required: true,
      },
    ],
    isRSC: false,
  },
];

export default componentsConfig;

export async function loadComponents() {
  const imports = componentsConfig.map((conf) =>
    import(`@/app/components/${conf.path}`).then((module) => ({
      name: conf.name,
      component: module.default,
      inputs: conf.inputs,
      isRSC: conf.isRSC,
    }))
  );
  return Promise.all(imports);
}
