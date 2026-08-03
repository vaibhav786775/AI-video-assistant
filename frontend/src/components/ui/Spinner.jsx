const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-2',
  xl: 'h-16 w-16 border-[3px]',
}

export default function Spinner({ size = 'md', className = '' }) {
  return (
    <div
      className={`${sizeMap[size]} rounded-full border-white/10 border-t-primary animate-spin ${className}`}
    />
  )
}
