import { motion } from 'framer-motion'
import {
  MessageSquare,
  Calendar,
  Clock,
  Globe,
  ExternalLink,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate, formatDuration, getYouTubeThumbnail, extractYouTubeId } from '../../utils/helpers'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

export default function VideoDetails({ video }) {
  const navigate = useNavigate()
  const thumbnail = video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)
  const youtubeId = extractYouTubeId(video.youtubeUrl)

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar: Meta & Actions */}
      <div className="lg:w-[320px] flex-shrink-0 space-y-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden" style={{ background: 'var(--bg)' }}>
          {thumbnail ? (
            <img src={thumbnail} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">No thumbnail</div>
          )}
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <ExternalLink size={18} className="text-white" />
            </div>
          </a>
        </div>

        <div>
          <h1 className="text-xl font-bold font-heading text-white mb-4 leading-tight">
            {video.title || 'Untitled Video'}
          </h1>
          
          <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar size={14} className="text-emerald-500" />
              {formatDate(video.createdAt)}
            </div>
            {video.processingTime && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} className="text-emerald-500" />
                Processed in {formatDuration(video.processingTime)}
              </div>
            )}
            {video.language && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe size={14} className="text-emerald-500" />
                <span className="capitalize">{video.language}</span>
              </div>
            )}
          </div>

          <Button
            onClick={() => navigate(`/dashboard/chat/${video.videoId}`)}
            icon={MessageSquare}
            size="lg"
            className="w-full font-semibold"
          >
            Ask Questions
          </Button>
        </div>
      </div>

      {/* Right Content: Insights (Markdown) */}
      <div className="flex-1 space-y-6 min-w-0">
        <Card className="flex-1 h-full min-h-[400px]">
          <h2 className="text-lg font-semibold font-heading text-white mb-6 border-b border-white/[0.06] pb-4">AI Extraction</h2>
          <div className="prose-custom max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {`### Summary\n${video.summary || 'No summary available.'}\n\n### Action Items\n${video.actionItems || 'No action items found.'}\n\n### Key Decisions\n${video.keyDecisions || 'No key decisions found.'}\n\n### Open Questions\n${video.openQuestions || 'No open questions identified.'}`}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
    </div>
  )
}
