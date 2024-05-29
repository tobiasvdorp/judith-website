import { LiaMountainSolid } from "react-icons/lia";

type NoContentProps = {
  text: string;
};

export default function NoContent(props: NoContentProps) {
  return (
    <div className="flex items-center flex-col gap-2">
      <LiaMountainSolid className="text-6xl" />

      <p className="text-center">{props.text}</p>
    </div>
  );
}
