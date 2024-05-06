import { twMerge } from "tailwind-merge";

type MainWrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export default function MainWrapper(props: MainWrapperProps) {
  return (
    <>
      <div className="w-screen flex justify-center pt-20">
        <main
          className={twMerge(
            "w-full max-w-[1100px] flex flex-col gap-16 px-4",
            props.className
          )}
        >
          {props.children}
        </main>
      </div>
    </>
  );
}
