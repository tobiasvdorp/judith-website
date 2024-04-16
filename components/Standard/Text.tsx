import { Builder } from "@builder.io/react";

type TextProps = {
  melk: string;
  kaas: string;
  name: string;
  fontSize: number;
};

export default function Text({ melk, kaas, name, fontSize }: TextProps) {
  return (
    <>
      <p className="">
        {melk}
        {name}
        {fontSize}
      </p>
      <p>
        De {melk} is duur {kaas}
      </p>
    </>
  );
}
