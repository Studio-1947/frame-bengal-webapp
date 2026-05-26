import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/infographic', label: 'Impact' },
    { to: '/fellows', label: 'Fellows' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-100/92 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.08)]' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1200px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.webp" alt="FRAME Bengal" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `font-display text-sm font-semibold uppercase tracking-wider relative transition-colors duration-200 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-teal after:transition-all after:duration-250 ${isActive ? 'text-teal after:w-full' : 'text-gray-500 hover:text-off-white after:w-0 hover:after:w-full'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://framebengal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs font-bold tracking-wider px-5 py-2 bg-teal text-white rounded-full transition-all duration-200 hover:bg-teal-dark hover:-translate-y-0.5"
          >
            About FRAME
          </a>
        </div>

        <button className="flex md:hidden flex-col gap-[5px] p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden bg-dark-100 border-t border-dark-300 px-8 pb-6 pt-4 flex flex-col gap-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `font-display text-lg font-bold ${isActive ? 'text-teal' : 'text-gray-500'}`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
