import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-off-white pt-10 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <img src="/logo.webp" alt="FRAME Bengal" className="h-10 w-auto mb-2" />
          <p className="text-sm text-gray-400 italic">Shaping futures, beyond barriers.</p>
        </div>
        <div className="flex flex-col gap-3 sm:text-right">
          <Link to="/" className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-teal transition-colors">Home</Link>
          <Link to="/infographic" className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-teal transition-colors">Impact</Link>
          <Link to="/fellows" className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-teal transition-colors">Fellows</Link>
          <a href="https://framebengal.com" target="_blank" rel="noopener noreferrer" className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-teal transition-colors">framebengal.com</a>
        </div>
        <p className="col-span-full text-xs text-gray-500 border-t border-white/8 pt-6">
          © {new Date().getFullYear()} FRAME Bengal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
