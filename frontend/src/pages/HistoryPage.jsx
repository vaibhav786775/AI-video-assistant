import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Search, SortAsc, SortDesc, Plus, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { videoService } from '../services/video.service'
import VideoCard from '../components/video/VideoCard'
import EmptyState from '../components/ui/EmptyState'
import { SkeletonVideoCard } from '../components/ui/Skeleton'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

export default function HistoryPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['video-history'],
    queryFn: () => videoService.getHistory().then((r) => r.data),
  })

  const filtered = videos
    .filter((v) => (v.title || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const da = new Date(a.createdAt)
      const db = new Date(b.createdAt)
      return sort === 'newest' ? db - da : da - db
    })

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await videoService.deleteVideo(deleteTarget)
      queryClient.invalidateQueries({ queryKey: ['video-history'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Video deleted successfully')
      setDeleteTarget(null)
    } catch {
      toast.error('Failed to delete video')
    } finally {
      setIsDeleting(false)
    }
  }

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
          <h1 className="text-2xl font-bold font-heading text-white">Video History</h1>
          <p className="text-sm text-gray-400 mt-1">{videos.length} video{videos.length !== 1 ? 's' : ''} processed</p>
        </div>
        <Button onClick={() => navigate('/dashboard/new')} icon={Plus}>
          New Video
        </Button>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort:</span>
          {[
            { value: 'newest', icon: SortDesc, label: 'Newest' },
            { value: 'oldest', icon: SortAsc, label: 'Oldest' },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => setSort(value)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: sort === value ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${sort === value ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'}`,
                color: sort === value ? '#22C55E' : '#6B7280',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }, (_, i) => <SkeletonVideoCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="videos"
          title={search ? 'No videos match your search' : 'No videos yet'}
          description={search ? 'Try a different search term.' : 'Process your first YouTube video to get started.'}
          action={
            !search && (
              <Button onClick={() => navigate('/dashboard/new')} icon={Plus}>
                Process First Video
              </Button>
            )
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((video, i) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <VideoCard
                video={video}
                onDelete={(id) => setDeleteTarget(id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Video"
        size="sm"
      >
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete this video? This will also remove all chat data from Pinecone. This action cannot be undone.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" isLoading={isDeleting} onClick={handleDelete} icon={Trash2}>
            Delete
          </Button>
        </div>
      </Modal>
    </motion.div>
  )
}
