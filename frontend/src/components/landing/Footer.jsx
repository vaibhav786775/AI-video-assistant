import { Link } from 'react-router-dom'
import { Zap, GitBranch, Globe, ExternalLink } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers'],
  Legal: ['Privacy', 'Terms', 'Security'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                <Zap size={16} className="text-black" />
              </div>
              <span className="font-heading font-bold text-white text-lg">VidAI</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              AI-powered YouTube video analysis. Understand any video instantly.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[GitBranch, Globe, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} VidAI. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with ❤️ using Mistral AI, Pinecone & React
          </p>
        </div>
      </div>
    </footer>
  )
}
