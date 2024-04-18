import Button from "@/components/Standard/Button";
import CustomLink from "@/components/Standard/CustomLink";
import Text from "@/components/Standard/Text";
import Title from "@/components/Standard/Title";
import SectionCard from "@/components/molecules/SectionCard";
export default function age() {
  return (
    <>
      <div className="pt-20 mx-20">
        <Title text="Title van iets" order={2} />
        <br></br>
        <Button text="Button" />
        <br></br> <br></br>
        <Text text="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
        <br></br>
        <SectionCard
          imageSrc={"/images/placeholder.svg"}
          title={"Buitenavonturen"}
          description={
            "Een trip door de natuur en door jezelf. Met gidsen en coaches ga je op ontdekkingstocht om je natuurlijke zelf te (her)ontdekken. We creëren een setting om de waan van de dag los te laten. Een waan waarin we nog wel eens vergeten dat we een schepsel zijn van de natuur. Hierdoor kan een volgelopen hoofd plaatsmaken voor een frisse open blik zodat je creativiteit weer gaat stromen."
          }
          buttonRef={"/contact"}
        />
        <br></br>
        <div className="flex gap-3 items-center">
          <CustomLink href="/contact" linkType="button">
            Contact
          </CustomLink>
          <CustomLink href="/contact" linkType="text">
            Contact
          </CustomLink>
        </div>
      </div>
    </>
  );
}
