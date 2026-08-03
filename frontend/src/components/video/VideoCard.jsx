import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, Calendar, Trash2, MessageSquare } from 'lucide-react'
import { getYouTubeThumbnail, formatDate, truncate } from '../../utils/helpers'

export default function VideoCard({ video, onDelete }) {
  const navigate = useNavigate()
  const thumbnail = video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="glass-card overflow-hidden group !p-0 flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-video overflow-hidden cursor-pointer"
        style={{ background: 'var(--bg)' }}
        onClick={() => navigate(`/dashboard/video/${video.videoId}`)}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play size={28} style={{ color: 'var(--text-muted)' }} />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            <Play size={16} className="text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-[15px] font-semibold text-white mb-2 line-clamp-2 cursor-pointer hover:text-emerald-500 transition-colors leading-snug"
          onClick={() => navigate(`/dashboard/video/${video.videoId}`)}
        >
          {video.title || 'Untitled Video'}
        </h3>

        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-4 mt-auto">
          <Calendar size={13} />
          {formatDate(video.createdAt)}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/dashboard/chat/${video.videoId}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
          >
            <MessageSquare size={14} />
            Chat
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(video.videoId) }}
            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            title="Delete video"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
