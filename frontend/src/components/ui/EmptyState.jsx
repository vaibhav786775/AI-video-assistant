import { motion } from 'framer-motion'
import { VideoOff, MessageSquare, Search, FolderOpen, Wifi } from 'lucide-react'

const icons = {
  videos: VideoOff,
  chat: MessageSquare,
  search: Search,
  folder: FolderOpen,
  network: Wifi,
}

export default function EmptyState({
  icon = 'folder',
  title = 'Nothing here yet',
  description = '',
  action,
  className = '',
}) {
  const Icon = typeof icon === 'string' ? icons[icon] || FolderOpen : icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ background: 'var(--primary)' }} />
        <div
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <Icon size={32} style={{ color: 'var(--primary)' }} />
        </div>
      </div>
      <h3 className="text-xl font-semibold font-heading text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {action && action}
    </motion.div>
  )
}
