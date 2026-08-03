import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: '#09090B' }}>
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md relative z-10"
      >
        {/* 404 number */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <span
            className="text-[120px] font-bold font-heading leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Content */}
        <h1 className="text-3xl font-bold font-heading text-white mb-3">Page not found</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button onClick={() => window.history.back()} variant="ghost" icon={ArrowLeft}>
            Go Back
          </Button>
          <Link to="/">
            <Button icon={Home}>
              Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
