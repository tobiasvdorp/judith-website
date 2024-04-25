import Title from "@/components/Standard/Title";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "@/components/Standard/CustomLink";
import Text from "@/components/Standard/Text";
export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex gap-2 text-center flex-col items-center max-w-[28rem]">
        <div className="relative w-full h-20 mb-4">
          <Image src="/images/forest.png" alt="Bomen" fill />
        </div>
        <Title order={1} text="404 - Oeps!" />
        <Text
          text="Het lijkt erop dat deze pagina niet bestaat."
          className="text-xl"
        />
        <CustomLink href="/" linkType="button" className="mt-4">
          Naar home
        </CustomLink>
      </div>
    </div>
  );
}
