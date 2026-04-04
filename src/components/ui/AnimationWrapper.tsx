'use client'

import { motion, HTMLMotionProps } from "framer-motion"

interface AnimationWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function AnimationWrapper({ children, className, ...props }: AnimationWrapperProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
