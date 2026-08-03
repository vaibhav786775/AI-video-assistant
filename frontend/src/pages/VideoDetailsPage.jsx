import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react'
import { videoService } from '../services/video.service'
import VideoDetails from '../components/video/VideoDetails'
import { SkeletonCard } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'

export default function VideoDetailsPage() {
  const { videoId } = useParams()
  const navigate = useNavigate()

  const { data: video, isLoading, error, refetch } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => videoService.getVideoDetails(videoId).then((r) => r.data),
    enabled: !!videoId,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8 max-w-4xl mx-auto"
    >
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 -ml-2">
        <ArrowLeft size={16} />
        Back
      </Button>

      {isLoading ? (
        <div className="space-y-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        <div className="glass-card p-10 text-center">
          <AlertCircle size={40} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-lg font-semibold text-white mb-2">Failed to load video</h2>
          <p className="text-gray-400 text-sm mb-6">
            {error?.response?.data?.error || 'Something went wrong. Please try again.'}
          </p>
          <Button onClick={refetch} icon={RefreshCw} variant="ghost">
            Retry
          </Button>
        </div>
      ) : video ? (
        <VideoDetails video={video} />
      ) : null}
    </motion.div>
  )
}
