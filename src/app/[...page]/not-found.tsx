import Title from "@/components/Standard/Title";
import Link from "next/link";
import Image from "next/legacy/image";

import Text from "@/components/Standard/Text";
import Button from "@/components/Standard/Button";
export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex gap-2 text-center flex-col items-center max-w-[28rem]">
        <div className="relative w-full h-20 mb-4">
          <Image src="/images/forest.png" alt="Bomen" layout="fill" priority />
        </div>
        <Title order={1} text="404 - Oeps!" />
        <Text
          text="Het lijkt erop dat deze pagina niet bestaat."
          className="text-xl"
        />
        <Button url="/" className="mt-4" text="Naar home"></Button>
      </div>
    </div>
  );
}
