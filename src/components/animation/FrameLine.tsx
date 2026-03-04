import { motion } from "framer-motion";

const FrameLine = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 800 500" className="w-full max-w-3xl h-auto">
        {/* Dot */}
        <motion.circle
          cx="100" cy="380"
          r="6"
          fill="hsl(var(--ink))"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Line 1: SW to NE */}
        <motion.line
          x1="100" y1="380" x2="700" y2="120"
          stroke="hsl(var(--ink))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          style={{ pathLength: 0 }}
        />

        {/* Line 2: parallel */}
        <motion.line
          x1="150" y1="420" x2="750" y2="160"
          stroke="hsl(var(--ink))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: "easeInOut" }}
          style={{ pathLength: 0 }}
          onAnimationComplete={onComplete}
        />

        {/* Parallel markers */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.4 }}
        >
          <line x1="380" y1="245" x2="395" y2="255" stroke="hsl(var(--ink-red))" strokeWidth="2" />
          <line x1="390" y1="240" x2="405" y2="250" stroke="hsl(var(--ink-red))" strokeWidth="2" />
          <line x1="405" y1="290" x2="420" y2="300" stroke="hsl(var(--ink-red))" strokeWidth="2" />
          <line x1="415" y1="285" x2="430" y2="295" stroke="hsl(var(--ink-red))" strokeWidth="2" />
        </motion.g>
      </svg>

      {/* Caption */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="font-body text-xl md:text-2xl text-foreground">
          Totul începe dintr-un punct. Prin mișcare, punctul formează o linie.
        </p>
        <p className="font-body text-lg md:text-xl text-ink-light mt-2">
          Liniile care nu se întâlnesc niciodată sunt paralele.
        </p>
      </motion.div>
    </div>
  );
};

export default FrameLine;
