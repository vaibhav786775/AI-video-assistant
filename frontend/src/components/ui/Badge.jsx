const variants = {
  green: 'badge-green',
  gray: 'badge-gray',
  blue: 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20',
  yellow: 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  red: 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function Badge({ children, variant = 'green', icon: Icon, className = '' }) {
  return (
    <span className={`${variants[variant]} ${className}`}>
      {Icon && <Icon size={10} />}
      {children}
    </span>
  )
}
