import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FrameIntro from "./FrameIntro";
import FrameLine from "./FrameLine";
import FrameSquare from "./FrameSquare";
import FrameCrane from "./FrameCrane";
import FrameMotion from "./FrameMotion";

const FRAME_LABELS = ["Intro", "Linia", "Pătratul", "Macaraua", "Mișcarea"];

const AnimationPlayer = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    if (isAutoPlaying) {
      setCurrentFrame((f) => Math.min(f + 1, 4));
    }
  }, [isAutoPlaying]);

  const goTo = (frame: number) => {
    setIsAutoPlaying(false);
    setCurrentFrame(frame);
  };

  const restart = () => {
    setIsAutoPlaying(true);
    setCurrentFrame(0);
  };

  const frames = [
    <FrameIntro key="intro" onComplete={goToNext} />,
    <FrameLine key="line" onComplete={goToNext} />,
    <FrameSquare key="square" onComplete={goToNext} />,
    <FrameCrane key="crane" onComplete={goToNext} />,
    <FrameMotion key="motion" onComplete={() => setIsAutoPlaying(false)} />,
  ];

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden select-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex">
        {FRAME_LABELS.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-secondary">
            <motion.div
              className={`h-full origin-left ${i <= currentFrame ? "bg-foreground" : ""}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i <= currentFrame ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Frame content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrame}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {frames[currentFrame]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {FRAME_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={label}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentFrame
                  ? "bg-foreground scale-125"
                  : "bg-ink-light hover:bg-foreground"
              }`}
            />
            <span className="absolute -top-8 font-body text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Restart button */}
      {currentFrame === 4 && !isAutoPlaying && (
        <motion.button
          className="absolute top-6 right-6 z-20 font-body text-lg text-foreground border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          onClick={restart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↺ Reluare
        </motion.button>
      )}

      {/* Manual nav arrows */}
      {!isAutoPlaying && (
        <>
          {currentFrame > 0 && (
            <button
              onClick={() => goTo(currentFrame - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 font-hand text-4xl text-ink-light hover:text-foreground transition-colors"
            >
              ‹
            </button>
          )}
          {currentFrame < 4 && (
            <button
              onClick={() => goTo(currentFrame + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 font-hand text-4xl text-ink-light hover:text-foreground transition-colors"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AnimationPlayer;
