import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-1 py-2">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: '#22C55E' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function ChatMessage({ message, isTyping = false }) {
  const { user } = useAuth()
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 mt-1 shadow-sm"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#000' }
            : { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981' }
        }
      >
        {isUser ? getInitials(user?.name) : <Bot size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-tr-sm'
            : 'rounded-tl-sm'
        }`}
        style={
          isUser
            ? {
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#fff',
              }
            : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E5E7EB',
              }
        }
      >
        {isTyping ? (
          <TypingIndicator />
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose-custom max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  )
}
