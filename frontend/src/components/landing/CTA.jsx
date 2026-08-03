import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import Button from '../ui/Button'

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="section-pad">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(22,163,74,0.06) 100%)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center top, rgba(34,197,94,0.4), transparent 70%)' }}
          />

          <div className="relative z-10 text-center py-20 px-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}
            >
              <Zap size={28} className="text-black" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-4">
              Ready to transform how you<br />
              <span className="gradient-text">consume video content?</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Join developers, researchers, and teams who use VidAI to extract insights from YouTube videos instantly.
            </p>

            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="font-semibold shadow-glow mx-auto"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Button>

            <p className="mt-4 text-xs text-gray-600">
              No credit card · Setup in 30 seconds
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
