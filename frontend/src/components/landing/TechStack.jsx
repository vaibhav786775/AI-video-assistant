import { motion } from 'framer-motion'

const techs = [
  { name: 'Mistral AI', color: '#FF7000' },
  { name: 'Pinecone', color: '#22C55E' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Node.js', color: '#539E43' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'JWT Auth', color: '#FB923C' },
  { name: 'RAG Pipeline', color: '#4ADE80' },
  { name: 'Whisper STT', color: '#A78BFA' },
  { name: 'Express.js', color: '#9CA3AF' },
]

// Duplicate for infinite scroll
const doubled = [...techs, ...techs]

export default function TechStack() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container-max px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest font-medium mb-2">
            Built with
          </p>
          <h2 className="text-3xl font-bold font-heading text-white">
            Best-in-class <span className="gradient-text">AI & Web stack</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #09090B, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #09090B, transparent)' }} />

        <div className="flex animate-marquee gap-6" style={{ width: 'max-content' }}>
          {doubled.map(({ name, color }, idx) => (
            <div
              key={`${name}-${idx}`}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl flex-shrink-0"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-sm font-medium text-gray-300 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
