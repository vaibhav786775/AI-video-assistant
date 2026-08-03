import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Spinner from '../ui/Spinner'

export default function ChatInput({ value, onChange, onSend, isLoading, disabled }) {
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && !isLoading && value.trim()) onSend()
    }
  }

  return (
    <div
      className="flex items-end gap-3 p-3 rounded-2xl transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${value ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: value ? '0 0 0 3px rgba(34,197,94,0.06)' : 'none',
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about this video..."
        rows={1}
        disabled={disabled || isLoading}
        className="flex-1 bg-transparent text-sm text-white resize-none outline-none placeholder:text-gray-600 leading-relaxed"
        style={{ maxHeight: '160px', minHeight: '24px' }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        disabled={disabled || isLoading || !value.trim()}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
        style={{
          background: value.trim() && !isLoading ? 'linear-gradient(135deg, #22C55E, #16A34A)' : 'rgba(255,255,255,0.06)',
          cursor: value.trim() && !isLoading ? 'pointer' : 'not-allowed',
        }}
      >
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Send size={16} style={{ color: value.trim() ? '#000' : '#4B5563' }} />
        )}
      </motion.button>
    </div>
  )
}
