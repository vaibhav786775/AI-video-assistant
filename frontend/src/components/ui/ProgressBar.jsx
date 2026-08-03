import { motion } from 'framer-motion'

export default function ProgressBar({
  value = 0,       // 0–100
  label,
  showValue = false,
  animated = true,
  height = 'h-1.5',
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          {label && <span>{label}</span>}
          {showValue && <span>{clamped}%</span>}
        </div>
      )}
      <div className={`w-full ${height} rounded-full overflow-hidden`} style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: animated ? 0.6 : 0, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #22C55E, #4ADE80)' }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 1.8s infinite',
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
