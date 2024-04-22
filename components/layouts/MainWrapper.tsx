type MainWrapperProps = {
  children: React.ReactNode;
};
export default function MainWrapper(props: MainWrapperProps) {
  return (
    <>
      <div className="w-screen flex justify-center">
        <main className="w-full max-w-[1000px] flex flex-col gap-16 px-4">
          {props.children}
        </main>
      </div>
    </>
  );
}
