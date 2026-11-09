"use client";

import { m } from "framer-motion";

/** Scroll-д ороход нэг удаа fade (200ms, 8px). Stagger байхгүй. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const Comp = as === "li" ? m.li : as === "section" ? m.section : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </Comp>
  );
}
