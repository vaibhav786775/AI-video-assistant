import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Clock, ChevronRight } from 'lucide-react'
import { getYouTubeThumbnail, timeAgo, truncate } from '../../utils/helpers'
import EmptyState from '../ui/EmptyState'
import Button from '../ui/Button'

function VideoMini({ video, onClick }) {
  const thumbnail = video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      onClick={onClick}
      className="flex-shrink-0 w-56 rounded-xl overflow-hidden cursor-pointer group"
      style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="relative w-full aspect-video overflow-hidden" style={{ background: '#1a2234' }}>
        {thumbnail ? (
          <img src={thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play size={20} style={{ color: '#4B5563' }} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(34,197,94,0.8)' }}>
            <Play size={14} className="text-black ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-white line-clamp-2 mb-1.5 leading-snug">
          {truncate(video.title || 'Untitled Video', 60)}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <Clock size={10} />
          {timeAgo(video.createdAt)}
        </div>
      </div>
    </motion.div>
  )
}

export default function RecentVideos({ videos = [] }) {
  const navigate = useNavigate()

  if (!videos.length) {
    return (
      <EmptyState
        icon="videos"
        title="No videos yet"
        description="Process your first YouTube video to see it here."
        action={
          <Button onClick={() => navigate('/dashboard/new')}>
            Process First Video
          </Button>
        }
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Videos</h3>
        <button
          onClick={() => navigate('/dashboard/history')}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
        >
          View all <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {videos.slice(0, 8).map((video) => (
          <VideoMini
            key={video.videoId}
            video={video}
            onClick={() => navigate(`/dashboard/video/${video.videoId}`)}
          />
        ))}
      </div>
    </div>
  )
}
