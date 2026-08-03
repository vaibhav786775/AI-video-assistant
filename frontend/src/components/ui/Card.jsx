import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'p-6',
}) {
  const Component = hover || onClick ? motion.div : 'div'
  const motionProps = hover || onClick
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }
    : {}

  return (
    <Component
      onClick={onClick}
      className={`glass-card ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
