
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
}

const Parallax = ({ children, offset = 30 }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduced offset for better performance
  const y = useTransform(scrollYProgress, [0, 1], [-offset/2, offset/2]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
