/**
 * Format ISO date string into readable format
 * e.g. "Jan 15, 2025"
 */
export function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format seconds into "Xm Ys" or "Xs" string
 */
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '—'
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url) {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]{11})/,
    /youtube\.com\/shorts\/([^&?/\s]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Get YouTube thumbnail URL from video URL or ID
 */
export function getYouTubeThumbnail(urlOrId, quality = 'mqdefault') {
  const id = urlOrId?.length === 11 ? urlOrId : extractYouTubeId(urlOrId)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`
}

/**
 * Parse bullet-point / numbered text into array of strings
 */
export function parseListText(text) {
  if (!text) return []
  return text
    .split('\n')
    .map((line) => line.replace(/^[\d•\-\*\.]+\s*/, '').trim())
    .filter(Boolean)
}

/**
 * Truncate text to maxLength with ellipsis
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Relative time: "2 hours ago", "just now", etc.
 */
export function timeAgo(dateString) {
  if (!dateString) return ''
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

/**
 * Get initials from full name
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
