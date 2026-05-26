import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import FellowCard from '../components/FellowCard'
import { fellows } from '../data/fellows'
import styles from './Fellows.module.css'

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
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headerBg} />
        <div className={styles.container}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            FRAME Cohort
          </motion.p>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Our Fellows
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            {fellows.length} talented STEM students from across West Bengal, connected with world-class mentors.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filtersBar}>
        <div className={styles.container}>
          <div className={styles.filtersRow}>
            <input
              type="text"
              placeholder="Search fellows, colleges, mentors…"
              className={styles.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className={styles.filters}>
              <select
                className={styles.select}
                value={district}
                onChange={e => setDistrict(e.target.value)}
              >
                {allDistricts.map(d => <option key={d}>{d}</option>)}
              </select>

              <select
                className={styles.select}
                value={country}
                onChange={e => setCountry(e.target.value)}
              >
                {allCountries.map(c => <option key={c}>{c}</option>)}
              </select>

              <select
                className={styles.select}
                value={mentorType}
                onChange={e => setMentorType(e.target.value)}
              >
                {allTypes.map(t => <option key={t}>{t}</option>)}
              </select>

              {(district !== 'All' || country !== 'All' || mentorType !== 'All' || search) && (
                <button className={styles.resetBtn} onClick={reset}>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <p className={styles.resultCount}>
            Showing <strong>{filtered.length}</strong> of {fellows.length} fellows
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((f, i) => (
                <FellowCard key={f.id} fellow={f} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className={styles.emptyIcon}>🔍</div>
              <p>No fellows match your filters.</p>
              <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
