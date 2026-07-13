import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DiaTextRevealProps {
  text: string;
  className?: string;
  /** Single solid text color — applied uniformly to every character */
  color?: string;
  /** Seconds before the reveal starts */
  delay?: number;
  /** Seconds between each character */
  stagger?: number;
}

/**
 * Magic UI–style "DIA" text reveal: characters rise out of blur one by one.
 * Characters are a single solid, fully opaque color — no per-character
 * gradients or shimmer, so the text stays stable over animated backgrounds
 * (translucent/clip effects visibly re-composite against them and look glitchy).
 */
export function DiaTextReveal({
  text,
  className,
  color = "hsl(210 30% 96%)",
  delay = 0,
  stagger = 0.045,
}: DiaTextRevealProps) {
  const reducedMotion = useReducedMotion();
  const characters = Array.from(text);

  return (
    <span className={cn("inline-block whitespace-pre-wrap", className)} style={{ color }}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 14, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + index * (reducedMotion ? 0 : stagger),
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export default DiaTextReveal;
