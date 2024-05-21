import { twMerge } from "tailwind-merge";

type MainWrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export default function MainWrapper(props: MainWrapperProps) {
  return (
    <>
      <div className="w-screen flex justify-center py-20">
        <main
          className={twMerge(
            "w-full max-w-[1100px] flex flex-col gap-16 px-4",
            props.className
          )}
        >
          {/* Page content */}
          {props.children}
        </main>
      </div>
    </>
  );
}
