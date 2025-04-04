import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex gap-2 text-center flex-col items-center max-w-[28rem]">
        {/* <div className="relative w-full h-full mb-4"> */}
        {/* <Image
            src="/images/forest.png"
            alt="Bomen"
            layout="fill"
            objectFit="cover"
            priority
            sizes="400px"
          /> */}
        <Title order={1} text="404" className="text-8xl" />
        {/* </div> */}
        {/* <Title order={1} text="Oeps!" /> */}
        <Text text="Deze pagina bestaat niet." className="text-xl" />
        {/* <Button url="/" className="mt-4" text="Naar home"></Button> */}
      </div>
    </div>
  );
}
