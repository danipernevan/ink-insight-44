import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FrameMotion = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),   // wheels drawn
      setTimeout(() => setPhase(2), 2500),   // car body
      setTimeout(() => setPhase(3), 4000),   // sun + motion
      setTimeout(() => onComplete(), 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 800 500" className="w-full max-w-3xl h-auto">
        {/* Ground line */}
        <motion.line
          x1="50" y1="380" x2="750" y2="380"
          stroke="hsl(var(--ink))"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Wheels */}
        {phase >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back wheel */}
            <motion.circle
              cx="280" cy="370" r="30"
              fill="none"
              stroke="hsl(var(--ink))"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
            <g transform="translate(280, 370)">
              <motion.g
                animate={phase >= 3 ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                {[0, 72, 144, 216, 288].map((angle) => (
                  <circle
                    key={angle}
                    cx={Math.cos((angle * Math.PI) / 180) * 15}
                    cy={Math.sin((angle * Math.PI) / 180) * 15}
                    r="3"
                    fill="hsl(var(--ink))"
                  />
                ))}
              </motion.g>
            </g>

            {/* Front wheel */}
            <motion.circle
              cx="500" cy="370" r="30"
              fill="none"
              stroke="hsl(var(--ink))"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <g transform="translate(500, 370)">
              <motion.g
                animate={phase >= 3 ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                {[0, 72, 144, 216, 288].map((angle) => (
                  <circle
                    key={angle}
                    cx={Math.cos((angle * Math.PI) / 180) * 15}
                    cy={Math.sin((angle * Math.PI) / 180) * 15}
                    r="3"
                    fill="hsl(var(--ink))"
                  />
                ))}
              </motion.g>
            </g>
          </motion.g>
        )}

        {/* Car body */}
        {phase >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Lower body (rectangle) */}
            <rect x="240" y="310" width="300" height="35" rx="3"
              fill="none" stroke="hsl(var(--ink))" strokeWidth="3" />
            {/* Cabin (trapezoid using path) */}
            <path d="M310,310 L340,270 L480,270 L510,310"
              fill="none" stroke="hsl(var(--ink))" strokeWidth="3" strokeLinejoin="round" />
            {/* Windows */}
            <line x1="410" y1="270" x2="410" y2="310" stroke="hsl(var(--ink))" strokeWidth="2" />
          </motion.g>
        )}

        {/* Sun */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ originX: "650px", originY: "100px" }}
            >
              <circle cx="650" cy="100" r="30" fill="none" stroke="hsl(var(--ink-red))" strokeWidth="2.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1={650 + Math.cos((angle * Math.PI) / 180) * 35}
                  y1={100 + Math.sin((angle * Math.PI) / 180) * 35}
                  x2={650 + Math.cos((angle * Math.PI) / 180) * 50}
                  y2={100 + Math.sin((angle * Math.PI) / 180) * 50}
                  stroke="hsl(var(--ink-red))"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </motion.g>
          </motion.g>
        )}

        {/* Motion lines behind car */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 0.5 }}
          >
            <line x1="200" y1="320" x2="230" y2="320" stroke="hsl(var(--ink-light))" strokeWidth="2" />
            <line x1="190" y1="335" x2="230" y2="335" stroke="hsl(var(--ink-light))" strokeWidth="2" />
            <line x1="210" y1="350" x2="235" y2="350" stroke="hsl(var(--ink-light))" strokeWidth="2" />
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
          Cercurile sunt folosite la lucrurile care se rotesc.
        </p>
        {phase >= 3 && (
          <motion.p
            className="font-body text-lg md:text-xl text-ink-light mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Tot ce vezi în jur este matematică în mișcare.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default FrameMotion;
