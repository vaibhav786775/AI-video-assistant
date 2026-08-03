import { motion } from 'framer-motion'
import Card from '../ui/Card'

export default function StatsCard({ icon: Icon, title, value, subtitle, color = '#22C55E', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${color}15`, border: `1px solid ${color}25` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div
            className="w-2 h-2 rounded-full animate-pulse-slow"
            style={{ background: color }}
          />
        </div>
        <div className="text-3xl font-bold font-heading text-white mb-1">{value}</div>
        <div className="text-sm font-medium text-white mb-0.5">{title}</div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </Card>
    </motion.div>
  )
}
