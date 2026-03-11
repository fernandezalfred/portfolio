'use client'

import { motion } from "framer-motion"

// Reusable wrapper that triggers a framer-motion animation when
// 80% of the element is visible in the viewport (fires only once).
// Children must supply "offscreen" and "onscreen" variants via the
// `variants` prop (or inherit them from a parent motion element).
export default function AnimationWrapper({ children, className, ...props }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
