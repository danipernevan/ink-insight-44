import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FrameSquare = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),  // parallelogram drawn
      setTimeout(() => setPhase(2), 3000),  // rotate to rectangle
      setTimeout(() => setPhase(3), 4500),  // show 90° marks
      setTimeout(() => onComplete(), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Parallelogram points → rectangle
  const parallelogram = "200,150 600,150 650,350 250,350";
  const rectangle = "200,150 600,150 600,350 200,350";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 800 500" className="w-full max-w-3xl h-auto">
        <motion.polygon
          points={parallelogram}
          fill="none"
          stroke="hsl(var(--ink))"
          strokeWidth="3"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            points: phase >= 2 ? rectangle : parallelogram,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            strokeDasharray: "1800",
            strokeDashoffset: phase >= 1 ? "0" : "1800",
            transition: "stroke-dashoffset 1.5s ease-in-out, points 1s ease-in-out",
          }}
        />

        {/* Draw the shape with paths instead for animation */}
        <motion.path
          d={phase >= 2
            ? "M200,150 L600,150 L600,350 L200,350 Z"
            : "M200,150 L600,150 L650,350 L250,350 Z"
          }
          fill="none"
          stroke="hsl(var(--ink))"
          strokeWidth="3"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 90° marks */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top-left */}
            <polyline points="200,175 225,175 225,150" fill="none" stroke="hsl(var(--ink-red))" strokeWidth="2" />
            {/* Top-right */}
            <polyline points="575,150 575,175 600,175" fill="none" stroke="hsl(var(--ink-red))" strokeWidth="2" />
            {/* Bottom-right */}
            <polyline points="600,325 575,325 575,350" fill="none" stroke="hsl(var(--ink-red))" strokeWidth="2" />
            {/* Bottom-left */}
            <polyline points="225,350 225,325 200,325" fill="none" stroke="hsl(var(--ink-red))" strokeWidth="2" />
          </motion.g>
        )}
      </svg>

      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="font-body text-xl md:text-2xl text-foreground">
          Patru linii paralele formează un paralelipiped.
        </p>
        <p className="font-body text-lg md:text-xl text-ink-light mt-2">
          Când unghiul dintre paralele este drept, se formează un dreptunghi.
        </p>
      </motion.div>
    </div>
  );
};

export default FrameSquare;
