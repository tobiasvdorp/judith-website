"use client";
type testComponentProps = {
  text: string;
};

export default function TestComponent({ text }: testComponentProps) {
  return <div>{text}</div>;
}
