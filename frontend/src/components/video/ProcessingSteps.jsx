import { motion } from 'framer-motion'
import { Download, FileText, Sparkles, Database, CheckCircle2 } from 'lucide-react'
import Spinner from '../ui/Spinner'
import ProgressBar from '../ui/ProgressBar'

const steps = [
  { id: 1, label: 'Downloading audio', icon: Download, desc: 'Fetching audio from YouTube...' },
  { id: 2, label: 'Transcribing', icon: FileText, desc: 'Converting speech to text...' },
  { id: 3, label: 'Generating insights', icon: Sparkles, desc: 'AI summarizing & extracting...' },
  { id: 4, label: 'Embedding vectors', icon: Database, desc: 'Uploading to Pinecone for chat...' },
  { id: 5, label: 'Completed!', icon: CheckCircle2, desc: 'All done. Redirecting...' },
]

const progressMap = { 0: 0, 1: 10, 2: 35, 3: 60, 4: 85, 5: 100 }

export default function ProcessingSteps({ currentStep = 1 }) {
  const progress = progressMap[currentStep] || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-medium text-white">Processing your video...</span>
          <span className="text-primary font-medium">{progress}%</span>
        </div>
        <ProgressBar value={progress} height="h-2" />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map(({ id, label, icon: Icon, desc }) => {
          const state = id < currentStep ? 'done' : id === currentStep ? 'active' : 'pending'

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: state === 'pending' ? 0.35 : 1, x: 0 }}
              transition={{ delay: id * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
              style={{
                background: state === 'active'
                  ? 'rgba(34,197,94,0.08)'
                  : state === 'done'
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
                border: state === 'active'
                  ? '1px solid rgba(34,197,94,0.2)'
                  : '1px solid transparent',
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: state === 'done'
                    ? 'rgba(34,197,94,0.15)'
                    : state === 'active'
                    ? 'rgba(34,197,94,0.1)'
                    : 'rgba(255,255,255,0.04)',
                  border: state !== 'pending' ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {state === 'active' ? (
                  <Spinner size="sm" />
                ) : state === 'done' ? (
                  <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
                ) : (
                  <Icon size={18} style={{ color: '#4B5563' }} />
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className={`text-sm font-medium ${state === 'pending' ? 'text-gray-600' : 'text-white'}`}>
                  {label}
                </p>
                {state === 'active' && (
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                )}
              </div>

              {/* Checkmark indicator for done */}
              {state === 'done' && (
                <div className="badge-green text-[11px]">Done</div>
              )}
            </motion.div>
          )
        })}
      </div>

      <p className="text-xs text-center text-gray-600">
        ☕ This may take up to 90 seconds for longer videos. Please don't close this tab.
      </p>
    </motion.div>
  )
}
