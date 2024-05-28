"use client";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import Title from "@/components/Standard/Title";
import HTMLButton from "@/components/Standard/HTMLbutton";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  if (typeof window === "object") {
    return createPortal(
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center px-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 h-screen w-screen backdrop-blur-sm backdrop-brightness-50 backdrop-grayscale"
        ></motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative flex w-full flex-col gap-xl bg-neutral-dark p-5 rounded-xl max-w-[450px]">
            <header className="flex w-full items-baseline justify-between">
              <Title order={3} text={title}></Title>
            </header>
            <div>{children}</div>
            <div className="flex items-center justify-end gap-md">
              <HTMLButton onClick={onClose} text="Oke!"></HTMLButton>
            </div>
          </div>
        </motion.div>
      </div>,
      document.body
    );
  }
}
