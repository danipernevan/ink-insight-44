import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FrameCrane = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),  // diagonal drawn
      setTimeout(() => setPhase(2), 2500),  // triangle highlight
      setTimeout(() => setPhase(3), 4000),  // crane appears
      setTimeout(() => onComplete(), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 800 500" className="w-full max-w-3xl h-auto">
        {phase < 3 && (
          <>
            {/* Rectangle */}
            <motion.path
              d="M250,150 L550,150 L550,350 L250,350 Z"
              fill="none"
              stroke="hsl(var(--ink))"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Diagonal */}
            <motion.line
              x1="250" y1="150" x2="550" y2="350"
              stroke="hsl(var(--ink))"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Triangle highlight */}
            {phase >= 2 && (
              <motion.polygon
                points="250,150 550,150 550,350"
                fill="hsl(var(--ink-red))"
                fillOpacity="0.15"
                stroke="hsl(var(--ink-red))"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ duration: 1.2 }}
              />
            )}
          </>
        )}

        {/* Crane silhouette */}
        {phase >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Base */}
            <rect x="340" y="400" width="120" height="20" fill="hsl(var(--ink))" />
            {/* Vertical tower */}
            <rect x="385" y="120" width="30" height="280" fill="hsl(var(--ink))" />
            {/* Cross bracing (triangles) */}
            <path d="M385,180 L415,180 L400,140 Z" fill="hsl(var(--ink-red))" fillOpacity="0.3" stroke="hsl(var(--ink))" strokeWidth="2" />
            <path d="M385,240 L415,240 L400,200 Z" fill="hsl(var(--ink-red))" fillOpacity="0.3" stroke="hsl(var(--ink))" strokeWidth="2" />
            <path d="M385,300 L415,300 L400,260 Z" fill="hsl(var(--ink-red))" fillOpacity="0.3" stroke="hsl(var(--ink))" strokeWidth="2" />
            <path d="M385,360 L415,360 L400,320 Z" fill="hsl(var(--ink-red))" fillOpacity="0.3" stroke="hsl(var(--ink))" strokeWidth="2" />
            {/* Boom arm */}
            <line x1="400" y1="130" x2="650" y2="130" stroke="hsl(var(--ink))" strokeWidth="4" />
            {/* Counter weight arm */}
            <line x1="400" y1="130" x2="250" y2="130" stroke="hsl(var(--ink))" strokeWidth="4" />
            {/* Cables */}
            <line x1="400" y1="100" x2="650" y2="130" stroke="hsl(var(--ink))" strokeWidth="1.5" />
            <line x1="400" y1="100" x2="250" y2="130" stroke="hsl(var(--ink))" strokeWidth="1.5" />
            {/* Top */}
            <path d="M390,120 L400,100 L410,120" fill="none" stroke="hsl(var(--ink))" strokeWidth="2" />
            {/* Hook */}
            <motion.g
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <line x1="620" y1="130" x2="620" y2="200" stroke="hsl(var(--ink))" strokeWidth="1.5" />
              <path d="M610,200 Q620,220 630,200" fill="none" stroke="hsl(var(--ink))" strokeWidth="2" />
            </motion.g>
            {/* Counterweight */}
            <rect x="245" y="130" width="30" height="25" fill="hsl(var(--ink))" />
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
          Triunghiurile au cea mai bună rezistență.
        </p>
        {phase >= 3 && (
          <motion.p
            className="font-body text-lg md:text-xl text-ink-light mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Din forme simple construim structuri complexe.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default FrameCrane;
