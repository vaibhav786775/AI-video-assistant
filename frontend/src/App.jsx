import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import Spinner from './components/ui/Spinner.jsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary.jsx'

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const NewVideoPage = lazy(() => import('./pages/NewVideoPage.jsx'))
const VideoDetailsPage = lazy(() => import('./pages/VideoDetailsPage.jsx'))
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'))
const ChatPage = lazy(() => import('./pages/ChatPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen" style={{ background: '#09090B' }}>
    <Spinner size="lg" />
  </div>
)

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <ErrorBoundary key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/new" element={<NewVideoPage />} />
              <Route path="/dashboard/video/:videoId" element={<VideoDetailsPage />} />
              <Route path="/dashboard/history" element={<HistoryPage />} />
              <Route path="/dashboard/chat/:videoId" element={<ChatPage />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </ErrorBoundary>
    </AnimatePresence>
  )
}
