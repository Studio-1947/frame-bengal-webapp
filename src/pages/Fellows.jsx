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
      <section className="relative bg-dark py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_100%_50%,rgba(136,178,83,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-8 relative">
          <motion.p
            className="font-display text-xs font-bold tracking-[0.16em] uppercase text-green mb-4 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-green"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            FRAME Cohort
          </motion.p>
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-off-white tracking-tighter mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Our Fellows
          </motion.h1>
          <motion.p
            className="text-base text-white/50 max-w-[52ch]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            {fellows.length} talented STEM students from across West Bengal, connected with world-class mentors.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-dark-200 border-b border-dark-300 py-6 sticky top-[72px] z-10">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex gap-4 flex-wrap items-center mb-3">
            <input
              type="text"
              placeholder="Search fellows, colleges, mentors…"
              className="flex-1 min-w-[220px] h-[42px] px-4 border-[1.5px] border-dark-300 rounded-full font-body text-sm text-off-white bg-dark-100 outline-none transition-colors focus:border-teal placeholder:text-gray-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex gap-3 flex-wrap items-center">
              <select className="h-[42px] px-4 border-[1.5px] border-dark-300 rounded-full font-body text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal" value={district} onChange={e => setDistrict(e.target.value)}>
                {allDistricts.map(d => <option key={d}>{d}</option>)}
              </select>
              <select className="h-[42px] px-4 border-[1.5px] border-dark-300 rounded-full font-body text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal" value={country} onChange={e => setCountry(e.target.value)}>
                {allCountries.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="h-[42px] px-4 border-[1.5px] border-dark-300 rounded-full font-body text-sm text-off-white bg-dark-100 cursor-pointer outline-none focus:border-teal" value={mentorType} onChange={e => setMentorType(e.target.value)}>
                {allTypes.map(t => <option key={t}>{t}</option>)}
              </select>
              {(district !== 'All' || country !== 'All' || mentorType !== 'All' || search) && (
                <button className="h-[42px] px-5 rounded-full border-[1.5px] border-teal text-teal font-display text-xs font-bold bg-transparent cursor-pointer transition-all hover:bg-teal hover:text-white" onClick={reset}>
                  Clear filters
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
      <section className="py-12 pb-24 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
              {filtered.map((f, i) => (
                <FellowCard key={f.id} fellow={f} index={i} />
              ))}
            </div>
          ) : (
            <motion.div className="text-center py-20 text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-5xl mb-4">🔍</div>
              <p>No fellows match your filters.</p>
              <button className="mt-4 h-[42px] px-5 rounded-full border-[1.5px] border-teal text-teal font-display text-xs font-bold bg-transparent cursor-pointer transition-all hover:bg-teal hover:text-white" onClick={reset}>Reset</button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
