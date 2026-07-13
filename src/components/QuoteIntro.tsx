import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const QUOTES = [
  {
    text: "There's plenty of room at the bottom.",
    author: "Richard Feynman",
  },
  {
    text: "What I cannot create, I do not understand.",
    author: "Richard Feynman",
  },
  {
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
  },
  {
    text: "Nothing in life is to be feared, it is only to be understood.",
    author: "Marie Curie",
  },
  {
    text: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
];

/** How long the quote stays on screen before the site reveals (ms) */
const HOLD_MS = 3500;

interface QuoteIntroProps {
  /** Fires the moment the overlay starts fading — sync the page reveal to this */
  onReveal: () => void;
}

/**
 * Pitch-black intro screen showing one randomly chosen quote in white cursive.
 * Holds a few seconds (or until click), then fades out to reveal the site.
 */
const QuoteIntro = ({ onReveal }: QuoteIntroProps) => {
  const reducedMotion = useReducedMotion();
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );
  const [visible, setVisible] = useState(true);

  const dismiss = () => {
    if (!visible) return;
    setVisible(false);
    document.documentElement.style.overflowY = "";
    onReveal();
  };

  // While the quote is up, the page is completely locked: no scrolling,
  // and the opaque overlay swallows every click/tap. The site is revealed
  // exactly as the user last would have seen it — at the top.
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(dismiss, reducedMotion ? 1800 : HOLD_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center px-6 cursor-pointer select-none touch-none overscroll-none"
          onClick={dismiss}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-label="Click to skip intro"
        >
          <div className="max-w-3xl text-center">
            <motion.blockquote
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="font-elegant italic text-2xl md:text-4xl text-white leading-snug mb-6"
            >
              “{quote.text}”
            </motion.blockquote>
            <motion.cite
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="font-sans text-base md:text-lg text-white/60 not-italic tracking-wide"
            >
              — {quote.author}
            </motion.cite>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteIntro;
