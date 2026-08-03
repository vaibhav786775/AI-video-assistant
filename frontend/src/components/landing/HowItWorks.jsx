import { motion } from 'framer-motion'
import { Link2, Cpu, MessageSquare, Archive } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Link2,
    title: 'Paste YouTube URL',
    description: 'Copy any YouTube video link — meetings, lectures, tutorials, podcasts. We handle the rest.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Processes the Video',
    description: 'We download audio, transcribe it with speech-to-text, then run it through Mistral AI for insights.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Chat with Your Video',
    description: 'Ask questions in natural language. Our RAG system retrieves precise answers from the transcript.',
  },
  {
    number: '04',
    icon: Archive,
    title: 'Access Anytime',
    description: 'All your processed videos are saved. Come back later to review insights or continue chatting.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-green mb-4 inline-block">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-4">
            From URL to insights in{' '}
            <span className="gradient-text">4 simple steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), rgba(34,197,94,0.3), transparent)' }}
          />

          {steps.map(({ number, icon: Icon, title, description }, idx) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative text-center"
            >
              {/* Step circle */}
              <div className="relative flex justify-center mb-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))',
                    border: '1px solid rgba(34,197,94,0.2)',
                  }}
                >
                  <Icon size={28} style={{ color: '#22C55E' }} />
                  <span
                    className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: '#22C55E', color: '#000' }}
                  >
                    {number}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold font-heading text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed px-2">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
