import { motion } from 'framer-motion'
import {
  FileText,
  CheckSquare,
  Target,
  HelpCircle,
  MessageSquare,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'AI Summary',
    description: 'Get a concise, bullet-point summary of any YouTube video in seconds. No more watching hour-long videos.',
    color: '#22C55E',
  },
  {
    icon: CheckSquare,
    title: 'Action Items',
    description: 'Automatically extract tasks and action items from meetings, lectures, and tutorials.',
    color: '#4ADE80',
  },
  {
    icon: Target,
    title: 'Key Decisions',
    description: 'Never miss an important decision. AI identifies and lists every major choice discussed.',
    color: '#86EFAC',
  },
  {
    icon: HelpCircle,
    title: 'Open Questions',
    description: 'Surfaces unanswered questions from the video so you know what still needs resolution.',
    color: '#22C55E',
  },
  {
    icon: MessageSquare,
    title: 'Smart Chat',
    description: 'Ask anything about the video. Powered by RAG — answers grounded in the actual transcript.',
    color: '#4ADE80',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'From URL to insights in under a minute. No manual setup, no copy-pasting transcripts.',
    color: '#86EFAC',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Features() {
  return (
    <section id="features" className="section-pad">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-green mb-4 inline-block">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-4">
            Everything you need to{' '}
            <span className="gradient-text">understand video content</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stop wasting time watching long videos. Let AI extract the insights that matter to you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map(({ icon: Icon, title, description, color }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glass-card p-6 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-lg font-semibold font-heading text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
