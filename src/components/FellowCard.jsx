import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const countryFlag = {
  'India': '🇮🇳',
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
}

const mentorColors = {
  'Academia': { bg: 'bg-teal-light', text: 'text-teal-dark' },
  'Industry': { bg: 'bg-green-light', text: 'text-green-dark' },
  'Research': { bg: 'bg-[#fff3e0]', text: 'text-[#b35900]' },
}

export default function FellowCard({ fellow, index = 0 }) {
  const flag = countryFlag[fellow.country] || '🌐'
  const mc = mentorColors[fellow.mentorType] || mentorColors.Academia
  const initials = fellow.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/fellows/${fellow.id}`} className="flex flex-col bg-dark-200 rounded-2xl border border-dark-300 overflow-hidden h-full transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,166,196,0.14)] hover:border-teal">
        <div className="bg-gradient-to-br from-teal to-green text-white font-display text-xl font-extrabold flex items-center justify-center h-[90px] tracking-wider">
          {initials}
        </div>
        <div className="p-5 flex flex-col gap-1 flex-1">
          <h3 className="font-display text-base font-bold leading-tight text-off-white">{fellow.name}</h3>
          <p className="text-xs font-medium text-teal uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
            {fellow.homeDistrict}
          </p>
          <p className="text-sm text-gray-500 leading-snug">{fellow.college}</p>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${mc.bg} ${mc.text}`}>
              {fellow.mentorType}
            </span>
            <span className="text-xl leading-none" title={fellow.country}>{flag}</span>
          </div>
          <p className="text-xs text-gray-400 italic mt-0.5">{fellow.mentor}</p>
        </div>
      </Link>
    </motion.div>
  )
}
