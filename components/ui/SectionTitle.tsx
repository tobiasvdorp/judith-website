import Title from "../Standard/Title";

type SectionTitle = {
  title: string;
};
export default function SectionTitle({ title }: SectionTitle) {
  return (
    <>
      <div className="w-full flex flex-row items-center">
        {/* Line */}
        <hr className="w-full text-center border border-black opacity-70" />
        {/* Title */}
        <div className="w-fit text-nowrap px-3 md:px-8 text-center">
          <Title order={2} text={title} />
        </div>
        {/* Line */}
        <hr className="w-full text-center border border-black opacity-70" />
      </div>
    </>
  );
}
