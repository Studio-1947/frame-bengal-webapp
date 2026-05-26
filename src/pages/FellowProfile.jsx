import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fellows } from '../data/fellows'

const countryFlag = {
  'India': '🇮🇳',
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
}

const mentorColors = {
  'Academia': { bg: 'bg-teal-light', text: 'text-teal-dark', label: '🎓 Academia' },
  'Industry': { bg: 'bg-green-light', text: 'text-green-dark', label: '🏢 Industry' },
  'Research': { bg: 'bg-[#fff3e0]', text: 'text-[#b35900]', label: '🔬 Research' },
}

export default function FellowProfile() {
  const { id } = useParams()
  const fellow = fellows.find(f => f.id === Number(id))

  if (!fellow) {
    return (
      <main className="pt-[calc(72px+4rem)] text-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-off-white">Fellow not found</h1>
        <Link to="/fellows" className="text-teal mt-4 inline-block">← Back to fellows</Link>
      </main>
    )
  }

  const flag = countryFlag[fellow.country] || '🌐'
  const mc = mentorColors[fellow.mentorType] || mentorColors.Academia
  const initials = fellow.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const index = fellows.findIndex(f => f.id === fellow.id)
  const prev = fellows[index - 1]
  const next = fellows[index + 1]

  return (
    <main className="pt-[72px] min-h-screen bg-dark-100 relative">
      <div className="absolute top-0 left-0 right-0 h-[340px] bg-dark z-0" />

      <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pb-16 sm:pb-24">
        <motion.div
          className="flex items-center gap-3 py-6 sm:py-8 text-sm text-white/45"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/fellows" className="text-white/60 hover:text-teal transition-colors">← All Fellows</Link>
          <span>/</span>
          <span className="text-white/90">{fellow.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 sm:gap-8 items-start">
          {/* Sidebar */}
          <motion.aside
            className="bg-dark-200 rounded-2xl border border-dark-300 overflow-hidden lg:sticky lg:top-[calc(72px+1.5rem)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-teal to-green text-white font-display text-4xl font-extrabold flex items-center justify-center h-[140px] tracking-wider">
              {initials}
            </div>
            <h1 className="font-display text-xl font-bold leading-tight text-off-white px-5 pt-5 pb-2">{fellow.name}</h1>
            <div className="flex items-center gap-1.5 px-5 pb-4 text-xs font-semibold uppercase tracking-wider text-teal">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              {fellow.homeDistrict}
            </div>
            <div className="border-t border-dark-300 px-5 py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">College</span>
                <span className="text-sm text-off-white font-medium leading-snug">{fellow.college}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">College District</span>
                <span className="text-sm text-off-white font-medium">{fellow.collegeDistrict}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">Mentor Institution</span>
                <span className="text-sm text-off-white font-medium">{fellow.mentor}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">Country</span>
                <span className="text-sm text-off-white font-medium">{flag} {fellow.country}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">Mentor Sector</span>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-0.5 ${mc.bg} ${mc.text}`}>
                  {mc.label}
                </span>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="bg-dark-200 rounded-2xl border border-dark-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="px-8 pt-7">
                <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-1">Fellow Profile</p>
                <h2 className="text-2xl font-bold tracking-tight text-off-white mb-6">Success Story</h2>
              </div>

              <div className="border-[1.5px] border-dashed border-dark-300 rounded-xl mx-8 mb-8 p-12 text-center bg-dark-100">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-lg font-bold text-gray-500 mb-3">Story coming soon</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[48ch] mx-auto mb-3">
                  Each FRAME fellow has a unique journey. {fellow.name}'s full story —
                  their background, challenges, and how mentorship from {fellow.mentor} shaped
                  their path — will be featured here.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[48ch] mx-auto">
                  This template is ready for individual stories, quotes, achievements,
                  and media to be added for each of the {fellows.length} fellows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-dark-300">
                {[
                  { icon: '🏠', label: 'From', value: fellow.homeDistrict },
                  { icon: '🎓', label: 'Studying at', value: fellow.college },
                  { icon: '🌍', label: 'Mentored by', value: fellow.mentor },
                ].map((chip, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 border-r border-dark-300 last:border-r-0 max-md:border-r-0 max-md:border-b max-md:border-dark-300 max-md:last:border-b-0">
                    <span className="text-xl shrink-0 mt-0.5">{chip.icon}</span>
                    <div>
                      <div className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 mb-1">{chip.label}</div>
                      <div className="text-sm font-medium text-off-white leading-snug">{chip.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              {prev ? (
                <Link to={`/fellows/${prev.id}`} className="flex-1 bg-dark-200 border border-dark-300 rounded-xl p-5 flex flex-col gap-1 transition-all hover:border-teal hover:shadow-[0_4px_16px_rgba(0,166,196,0.1)] max-w-full sm:max-w-[48%]">
                  <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-teal">← Previous</span>
                  <span className="font-display text-sm font-bold text-off-white">{prev.name}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/fellows/${next.id}`} className="flex-1 bg-dark-200 border border-dark-300 rounded-xl p-5 flex flex-col gap-1 items-end transition-all hover:border-teal hover:shadow-[0_4px_16px_rgba(0,166,196,0.1)] max-w-full sm:max-w-[48%]">
                  <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-teal">Next →</span>
                  <span className="font-display text-sm font-bold text-off-white">{next.name}</span>
                </Link>
              ) : <div />}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
