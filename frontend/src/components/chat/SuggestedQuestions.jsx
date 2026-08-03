import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const suggestions = [
  'What is this video about?',
  'Summarize the main points.',
  'What decisions were made?',
  'What action items were mentioned?',
  'What technologies are discussed?',
  'What are the open questions?',
]

export default function SuggestedQuestions({ onSelect, isLoading }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <Lightbulb size={13} />
        Suggested questions
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((q, i) => (
          <motion.button
            key={q}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => !isLoading && onSelect(q)}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-left"
            style={{
              background: 'rgba(34,197,94,0.07)',
              border: '1px solid rgba(34,197,94,0.15)',
              color: '#9CA3AF',
            }}
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
