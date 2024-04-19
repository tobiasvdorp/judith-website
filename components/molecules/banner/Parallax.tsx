"use client";
import React from "react";

// Parallax effect
export default function Parallax({ children }: { children: React.ReactNode }) {
  const [offsetY, setOffsetY] = React.useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${offsetY * 0.4}px)`,
      }}
    >
      {children}
    </div>
  );
}
