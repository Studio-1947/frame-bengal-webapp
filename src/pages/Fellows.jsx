import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import FellowCard from '../components/FellowCard'
import { fellows } from '../data/fellows'

const allDistricts = ['All', ...Array.from(new Set(fellows.map(f => f.homeDistrict))).sort()]
const allCountries = ['All', ...Array.from(new Set(fellows.map(f => f.country))).sort()]
const allTypes = ['All', 'Academia', 'Industry', 'Research']

export default function Fellows() {
  const [district, setDistrict] = useState('All')
  const [country, setCountry] = useState('All')
  const [mentorType, setMentorType] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => fellows.filter(f => {
    if (district !== 'All' && f.homeDistrict !== district) return false
    if (country !== 'All' && f.country !== country) return false
    if (mentorType !== 'All' && f.mentorType !== mentorType) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        f.name.toLowerCase().includes(q) ||
        f.homeDistrict.toLowerCase().includes(q) ||
        f.college.toLowerCase().includes(q) ||
        f.mentor.toLowerCase().includes(q)
      )
    }
    return true
  }), [district, country, mentorType, search])

  const reset = () => {
    setDistrict('All')
    setCountry('All')
    setMentorType('All')
    setSearch('')
  }

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="relative bg-dark py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_100%_50%,rgba(136,178,83,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.p
            className="font-display text-xs font-bold tracking-[0.16em] uppercase text-green mb-3 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-green"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            FRAME Cohort
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-off-white tracking-tighter mb-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Our Fellows
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base text-white/50 max-w-[52ch]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            {fellows.length} talented STEM students from across West Bengal, connected with world-class mentors.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-dark-200 border-b border-dark-300 py-4 sm:py-6 sticky top-[72px] z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center mb-3">
            <input
              type="text"
              placeholder="Search fellows, colleges, mentors…"
              className="w-full sm:flex-1 sm:min-w-[200px] h-10 px-4 border-[1.5px] border-dark-300 rounded-full text-sm text-off-white bg-dark-100 outline-none transition-colors focus:border-teal placeholder:text-gray-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
              <select className="h-10 px-3 sm:px-4 border-[1.5px] border-dark-300 rounded-full text-xs sm:text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal flex-1 sm:flex-none" value={district} onChange={e => setDistrict(e.target.value)}>
                {allDistricts.map(d => <option key={d}>{d}</option>)}
              </select>
              <select className="h-10 px-3 sm:px-4 border-[1.5px] border-dark-300 rounded-full text-xs sm:text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal flex-1 sm:flex-none" value={country} onChange={e => setCountry(e.target.value)}>
                {allCountries.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="h-10 px-3 sm:px-4 border-[1.5px] border-dark-300 rounded-full text-xs sm:text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal flex-1 sm:flex-none" value={mentorType} onChange={e => setMentorType(e.target.value)}>
                {allTypes.map(t => <option key={t}>{t}</option>)}
              </select>
              {(district !== 'All' || country !== 'All' || mentorType !== 'All' || search) && (
                <button className="h-10 px-4 rounded-full border-[1.5px] border-teal text-teal font-display text-xs font-bold bg-transparent cursor-pointer transition-all hover:bg-teal hover:text-white" onClick={reset}>
                  Clear
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Showing <strong className="text-teal">{filtered.length}</strong> of {fellows.length} fellows
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-12 pb-16 sm:pb-24 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((f, i) => (
                <FellowCard key={f.id} fellow={f} index={i} />
              ))}
            </div>
          ) : (
            <motion.div className="text-center py-20 text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-5xl mb-4">🔍</div>
              <p>No fellows match your filters.</p>
              <button className="mt-4 h-10 px-5 rounded-full border-[1.5px] border-teal text-teal font-display text-xs font-bold bg-transparent cursor-pointer transition-all hover:bg-teal hover:text-white" onClick={reset}>Reset</button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
