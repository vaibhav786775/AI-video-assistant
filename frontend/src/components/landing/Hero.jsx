import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'

const features = ['AI Summary', 'Action Items', 'Key Decisions', 'Smart Chat']

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#22C55E', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full opacity-10"
          style={{ background: '#4ADE80', filter: 'blur(60px)' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#4ADE80',
              }}
            >
              <Sparkles size={12} />
              Powered by Mistral AI & Pinecone RAG
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-[1.08] mb-6"
            >
              Understand Any{' '}
              <span className="gradient-text">YouTube Video</span>
              {' '}with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl"
            >
              Paste any YouTube URL and instantly get AI-powered summaries, action items,
              key decisions, and a smart chatbot that knows everything about your video.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start"
            >
              {features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-sm text-gray-300">
                  <CheckCircle size={14} style={{ color: '#22C55E' }} />
                  {f}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="font-semibold shadow-glow"
              >
                Start for Free
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Play size={16} />
                See How it Works
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-xs text-gray-600"
            >
              No credit card required · Free to use
            </motion.p>
          </div>

          {/* Right: Floating UI mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 max-w-lg w-full lg:w-auto"
          >
            <div className="float-animation">
              <div className="glass-card p-6 space-y-4">
                {/* Video thumb mock */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ background: '#1a2234' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}>
                      <Play size={24} style={{ color: '#22C55E' }} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full w-1/3 rounded-full" style={{ background: 'linear-gradient(90deg, #22C55E, #4ADE80)' }} />
                    </div>
                  </div>
                </div>

                {/* Summary mock */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">AI Summary</p>
                  <div className="space-y-1.5">
                    {[100, 85, 92].map((w, i) => (
                      <div key={i} className="h-2.5 rounded-full skeleton" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>

                {/* Chips mock */}
                <div className="flex flex-wrap gap-2">
                  {['✅ Action Items', '🎯 Decisions', '❓ Questions'].map((chip) => (
                    <span key={chip} className="badge-green text-xs">{chip}</span>
                  ))}
                </div>

                {/* Chat mock */}
                <div className="border-t border-white/[0.06] pt-4">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.2)', color: '#22C55E' }}>U</div>
                    <div className="text-xs text-gray-300 bg-white/[0.05] rounded-xl px-3 py-2">What were the main decisions?</div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>AI</div>
                    <div className="text-xs text-gray-300 bg-white/[0.03] rounded-xl px-3 py-2 border border-white/[0.06]">
                      Based on the transcript, three key decisions were made...
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 align-text-bottom rounded-sm animate-pulse" style={{ background: '#22C55E' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
