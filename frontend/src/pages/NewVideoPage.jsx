import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import ProcessForm from '../components/video/ProcessForm'
import Button from '../components/ui/Button'

export default function NewVideoPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleSuccess = (data) => {
    // Invalidate history cache so dashboard updates
    queryClient.invalidateQueries({ queryKey: ['video-history'] })
    queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })

    if (data.videoId) {
      navigate(`/dashboard/video/${data.videoId}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8 max-w-2xl mx-auto"
    >
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-6 -ml-2">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <Sparkles size={20} style={{ color: '#22C55E' }} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Process New Video</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Paste a YouTube URL below and let AI extract summaries, action items, key decisions, and enable smart chat.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card p-8">
        <ProcessForm onSuccess={handleSuccess} />
      </div>

      {/* Tips */}
      <div className="mt-6 space-y-2">
        {[
          '💡 Works best with meetings, lectures, tutorials & interviews',
          '🌐 Supports English and Hinglish (Hindi+English)',
          '⚡ Processing usually completes in 30–90 seconds',
        ].map((tip) => (
          <p key={tip} className="text-xs text-gray-600 flex items-start gap-2">
            {tip}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
