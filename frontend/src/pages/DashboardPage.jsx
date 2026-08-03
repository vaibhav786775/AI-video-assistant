import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import {
  Video,
  MessageSquare,
  Clock,
  Plus,
  TrendingUp,
  ArrowRight,
  History,
} from 'lucide-react'
import { videoService } from '../services/video.service'
import { useAuth } from '../hooks/useAuth'
import StatsCard from '../components/dashboard/StatsCard'
import RecentVideos from '../components/dashboard/RecentVideos'
import { SkeletonCard } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import { formatDuration, truncate } from '../utils/helpers'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => videoService.getDashboardStats().then((r) => r.data),
  })

  const { data: videos = [], isLoading: videosLoading } = useQuery({
    queryKey: ['video-history'],
    queryFn: () => videoService.getHistory().then((r) => r.data),
  })

  const statsCards = [
    {
      icon: Video,
      title: 'Videos Processed',
      value: statsLoading ? '—' : stats?.totalVideos ?? 0,
      subtitle: 'All time',
      color: '#22C55E',
    },
    {
      icon: MessageSquare,
      title: 'Questions Asked',
      value: statsLoading ? '—' : stats?.totalQuestionsAsked ?? 0,
      subtitle: 'Chat interactions',
      color: '#4ADE80',
    },
    {
      icon: Clock,
      title: 'Processing Time',
      value: statsLoading ? '—' : formatDuration(stats?.totalProcessingTime),
      subtitle: 'Total compute',
      color: '#86EFAC',
    },
    {
      icon: TrendingUp,
      title: 'Last Processed',
      value: statsLoading ? '—' : (stats?.lastProcessedVideo ? '1 video' : 'None yet'),
      subtitle: stats?.lastProcessedVideo ? truncate(stats.lastProcessedVideo.title, 30) : 'Start processing',
      color: '#22C55E',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-heading text-white"
          >
            Good {getGreeting()},{' '}
            <span className="gradient-text">{user?.name?.split(' ')[0] || 'there'}</span> 👋
          </motion.h1>
          <p className="text-gray-400 text-sm mt-1">Here's what's happening with your videos</p>
        </div>
        <Button onClick={() => navigate('/dashboard/new')} icon={Plus}>
          New Video
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statsLoading
          ? Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)
          : statsCards.map((card, i) => <StatsCard key={card.title} {...card} delay={i * 0.08} />)}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Videos */}
        <div className="lg:col-span-2">
          <div className="glass-card h-full">
            <h2 className="text-xl font-bold font-heading text-white mb-6">Recent Videos</h2>
            {videosLoading ? (
              <div className="space-y-4">
                <SkeletonCard />
              </div>
            ) : (
              <RecentVideos videos={videos} />
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/dashboard/new')}
            className="glass-card cursor-pointer group hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:scale-105 transition-transform">
                  <Plus size={24} />
                </div>
                <h3 className="font-semibold text-white mb-1">Process New Video</h3>
                <p className="text-[14px] text-gray-500">Paste any YouTube URL to extract insights instantly.</p>
              </div>
              <ArrowRight size={20} className="text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200 mt-2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/dashboard/history')}
            className="glass-card cursor-pointer group hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/10 text-gray-300 group-hover:scale-105 transition-transform group-hover:text-emerald-500 group-hover:border-emerald-500/20">
                  <History size={24} />
                </div>
                <h3 className="font-semibold text-white mb-1">Browse History</h3>
                <p className="text-[14px] text-gray-500">View and manage your {videos.length} processed video{videos.length !== 1 ? 's' : ''}.</p>
              </div>
              <ArrowRight size={20} className="text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200 mt-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}
