import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Which YouTube videos are supported?',
    a: 'Any publicly available YouTube video with audio. This includes lectures, meetings, tutorials, podcasts, interviews, and more. Private or age-restricted videos may not work.',
  },
  {
    q: 'How long does processing take?',
    a: 'Most videos process in 30–90 seconds depending on length and server load. You\'ll see a live progress indicator while we work.',
  },
  {
    q: 'What languages are supported?',
    a: 'Currently English and Hinglish (Hindi + English mix). English uses Whisper for transcription; Hinglish uses the Sarvam AI API.',
  },
  {
    q: 'How does the AI Chat work?',
    a: 'We use Retrieval-Augmented Generation (RAG) with Pinecone vector embeddings. When you ask a question, we retrieve relevant transcript chunks and pass them to Mistral AI for a grounded answer.',
  },
  {
    q: 'Are my videos stored permanently?',
    a: 'Your processed videos and their AI analysis are saved to your account indefinitely. You can delete them at any time from the History page.',
  },
  {
    q: 'Is there a video length limit?',
    a: 'No hard limit, but very long videos (3+ hours) may take longer and consume more API quota. For best results, use videos under 2 hours.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: isOpen ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isOpen ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-all"
      >
        <span className="font-medium text-white text-sm pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} style={{ color: isOpen ? '#22C55E' : '#6B7280' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="section-pad">
      <div className="container-max max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-green mb-4 inline-block">FAQ</span>
          <h2 className="text-4xl font-bold font-heading text-white">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <FAQItem
                question={item.q}
                answer={item.a}
                isOpen={openIdx === idx}
                onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
