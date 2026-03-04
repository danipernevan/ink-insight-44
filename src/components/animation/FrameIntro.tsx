import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const text = "Știai că tot universul poate fi desenat din 5 forme?";

const FrameIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"typing" | "shatter" | "done">("typing");
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (phase === "typing") {
      if (visibleChars < text.length) {
        const t = setTimeout(() => setVisibleChars((v) => v + 1), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("shatter"), 800);
        return () => clearTimeout(t);
      }
    }
    if (phase === "shatter") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, visibleChars, onComplete]);

  const letters = text.split("");

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence>
        {phase !== "done" && (
          <div className="relative px-8">
            {phase === "typing" && (
              <motion.h1
                className="font-hand text-4xl md:text-6xl lg:text-7xl text-foreground text-center leading-tight max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {text.slice(0, visibleChars)}
                <motion.span
                  className="inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
              </motion.h1>
            )}
            {phase === "shatter" && (
              <div className="flex flex-wrap justify-center max-w-4xl">
                {letters.map((letter, i) => {
                  const angle = Math.random() * 360;
                  const distance = 200 + Math.random() * 600;
                  const tx = Math.cos((angle * Math.PI) / 180) * distance;
                  const ty = Math.sin((angle * Math.PI) / 180) * distance;
                  return (
                    <motion.span
                      key={i}
                      className="font-hand text-4xl md:text-6xl lg:text-7xl text-foreground inline-block"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        x: tx,
                        y: ty,
                        opacity: 0,
                        rotate: Math.random() * 720 - 360,
                        scale: Math.random() * 0.5,
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                        delay: Math.random() * 0.15,
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FrameIntro;
