"use client";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Only show arrow on top of the page. When you scroll down, the arrow will disappear
export default function Arrow() {
  const [showArrow, setShowArrow] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    });
  }, []);

  return (
    <>
      <div className="absolute -bottom-1 pl-8 invert">
        <AnimatePresence>
          {showArrow && (
            <motion.div
              className=""
              initial={{ opacity: 0, rotate: 40, y: -40 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, rotate: 40, y: -40 }}
            >
              <div className="relative w-24 h-24">
                <Image
                  src="/images/bent-arrow.svg"
                  alt="Pijl naar beneden"
                  layout="fill"
                  objectFit="contain"
                  className="-rotate-[40deg]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
