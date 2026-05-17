import { motion } from "framer-motion"

export function WhiteAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090a0f]">
      {/* Soft floating white & royal blue blur circles */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-[150px]"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[100px]"
        animate={{
          x: [0, 50, -80, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-white/5 blur-[130px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -90, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle modern white-grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  )
}
