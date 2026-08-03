import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  FileText,
  CheckSquare,
  Target,
  Video,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { videoService } from '../services/video.service'
import { chatService } from '../services/chat.service'
import ChatMessage from '../components/chat/ChatMessage'
import ChatInput from '../components/chat/ChatInput'
import SuggestedQuestions from '../components/chat/SuggestedQuestions'
import { SkeletonCard } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import { parseListText, truncate, getYouTubeThumbnail } from '../utils/helpers'

export default function ChatPage() {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const messagesEndRef = useRef(null)

  const { data: video, isLoading: videoLoading, isError, error, refetch } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => videoService.getVideoDetails(videoId).then((r) => r.data),
    enabled: !!videoId,
    retry: false,
  })

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full space-y-4 p-8">
        <AlertCircle size={48} className="text-red-400 mb-2" />
        <h2 className="text-xl font-semibold text-white">Failed to load video</h2>
        <p className="text-gray-400 text-sm max-w-md text-center">
          {error?.response?.data?.error || 'Something went wrong while fetching the video context.'}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
          <Button onClick={refetch} icon={RefreshCw} size="sm">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!videoLoading && !video) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full space-y-4 p-8">
        <AlertCircle size={48} className="text-orange-400 mb-2" />
        <h2 className="text-xl font-semibold text-white">Video Not Found</h2>
        <p className="text-gray-400 text-sm max-w-md text-center">
          The video you are looking for does not exist or you do not have permission to view it.
        </p>
        <Button onClick={() => navigate('/dashboard')} variant="ghost" size="sm" className="mt-4">
          Return to Dashboard
        </Button>
      </div>
    )
  }

  const sendMessage = async (text) => {
    const question = (text || input).trim()
    if (!question || isLoading) return

    const userMsg = { id: Date.now(), role: 'user', content: question }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await chatService.sendMessage({ videoId, question })
      const aiMsg = { id: Date.now() + 1, role: 'ai', content: res.data.answer }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to get answer')
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id))
    } finally {
      setIsLoading(false)
    }
  }

  const thumbnail = video ? (video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)) : null
  const summaryLines = video ? parseListText(video.summary) : []
  const actionItems = video ? parseListText(video.actionItems) : []
  const keyDecisions = video ? parseListText(video.keyDecisions) : []

  return (
    <div className="flex h-full overflow-hidden" style={{ height: 'calc(100vh - 0px)' }}>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0"
          style={{ background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(12px)' }}
        >
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={16} />
          </Button>
          {thumbnail && (
            <img src={thumbnail} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white truncate">
              {videoLoading ? 'Loading...' : truncate(video?.title || 'Chat', 50)}
            </h2>
            <p className="text-xs text-gray-500">AI-powered video chat</p>
          </div>
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all hidden lg:flex items-center gap-1.5 text-xs"
          >
            {panelOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {panelOpen ? 'Hide panel' : 'Show panel'}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
                >
                  <Video size={24} style={{ color: '#22C55E' }} />
                </div>
                <h3 className="text-lg font-semibold font-heading text-white mb-2">
                  {videoLoading ? '...' : truncate(video?.title || 'Video Chat', 55)}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  Ask anything about this video. The AI uses only the video transcript to answer.
                </p>
              </div>
              {!isLoading && (
                <SuggestedQuestions onSelect={sendMessage} isLoading={isLoading} />
              )}
            </motion.div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <ChatMessage
              message={{ role: 'ai', content: '' }}
              isTyping
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-white/[0.06] flex-shrink-0">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage()}
            isLoading={isLoading}
            disabled={videoLoading}
          />
          <p className="text-[11px] text-center text-gray-700 mt-2">
            AI answers are grounded in the video transcript via RAG
          </p>
        </div>
      </div>

      {/* Context Panel */}
      <motion.div
        animate={{ width: panelOpen ? 360 : 0, opacity: panelOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="hidden lg:flex flex-col overflow-hidden flex-shrink-0 border-l border-white/[0.06]"
        style={{ background: 'var(--bg)' }}
      >
        <div className="overflow-y-auto flex-1 p-6 space-y-6" style={{ width: 360 }}>
          <h3 className="text-[15px] font-semibold text-white border-b border-white/[0.06] pb-3">Video Context</h3>

          {videoLoading ? (
            <SkeletonCard />
          ) : video ? (
            <>
              {/* Thumbnail */}
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-full aspect-video rounded-xl object-cover border border-white/[0.06]"
                />
              )}

              {/* Insights */}
              <div
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] shadow-sm"
              >
                <div className="prose-custom prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {`**Summary**\n${video.summary ? video.summary.substring(0, 200) + '...' : 'No summary available.'}\n\n**Action Items**\n${video.actionItems ? video.actionItems.substring(0, 150) + '...' : 'None found.'}\n\n**Key Decisions**\n${video.keyDecisions ? video.keyDecisions.substring(0, 150) + '...' : 'None found.'}`}
                  </ReactMarkdown>
                </div>
              </div>

              <Button
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => navigate(`/dashboard/video/${videoId}`)}
              >
                View Full Details
              </Button>
            </>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}
