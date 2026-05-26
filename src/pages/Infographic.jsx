import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import AnimatedCounter from '../components/AnimatedCounter'
import { fellows, districtCounts, countryCounts, mentorTypeCounts, STATS } from '../data/fellows'
import styles from './Infographic.module.css'

const COLORS = {
  teal: '#00a6c4',
  green: '#88B253',
  black: '#0d0d0d',
  gray: '#a0a09a',
  accent1: '#005f70',
  accent2: '#5e7d39',
  orange: '#e07b39',
  purple: '#7b6fc4',
}

const countryData = Object.entries(countryCounts).map(([name, value]) => ({ name, value }))
const countryColors = ['#00a6c4', '#88B253', '#e07b39', '#7b6fc4']

const districtData = Object.entries(districtCounts)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)

const mentorData = Object.entries(mentorTypeCounts).map(([name, value]) => ({ name, value }))

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #e0dfd9', borderRadius: 8, padding: '8px 14px', fontFamily: 'DM Sans', fontSize: 13 }}>
        <strong>{payload[0].name || payload[0].payload?.name}</strong>: {payload[0].value}
      </div>
    )
  }
  return null
}

export default function Infographic() {
  return (
    <main className={styles.main}>
      {/* ── Page Header ── */}
      <section className={styles.header}>
        <div className={styles.headerBg} />
        <div className={styles.container}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            FRAME Impact Report
          </motion.p>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Mapping opportunity<br />
            <span className={styles.titleAccent}>across West Bengal</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            A snapshot of FRAME's first cohort — {STATS.fellows} fellows, {STATS.districts}+ home districts,
            and mentors spanning 5 countries and 15+ institutions.
          </motion.p>
        </div>
      </section>

      {/* ── Big Stats ── */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              { num: STATS.fellows, suffix: '', label: 'Fellows selected', sub: 'From across West Bengal' },
              { num: STATS.districts, suffix: '+', label: 'Home districts', sub: 'Geographic representation' },
              { num: STATS.countries, suffix: '', label: 'Mentor countries', sub: 'India, USA, Germany, France + more' },
              { num: STATS.mentors, suffix: '+', label: 'Mentor institutions', sub: 'IITs, IISERs, global universities' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className={styles.statCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className={styles.statNum}>
                  <AnimatedCounter to={s.num} suffix={s.suffix} />
                </div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statSub}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── District Bar Chart ── */}
      <section className={styles.chartSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.chartHeader}>
              <p className={styles.chartLabel}>District Representation</p>
              <h2 className={styles.chartTitle}>Fellows by home district</h2>
              <p className={styles.chartDesc}>
                FRAME reaches students from {Object.keys(districtCounts).length} distinct home districts,
                demonstrating the program's geographic breadth across West Bengal.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                data={districtData}
                layout="vertical"
                margin={{ top: 0, right: 40, bottom: 0, left: 150 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0dfd9" horizontal={false} />
                <XAxis type="number" tick={{ fontFamily: 'DM Sans', fontSize: 12, fill: '#6a6a63' }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontFamily: 'DM Sans', fontSize: 12, fill: '#2c2c28' }}
                  width={145}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={COLORS.teal} radius={[0, 4, 4, 0]}>
                  {districtData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? COLORS.teal : i < 3 ? '#33b8d4' : '#80d4e6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* ── Two Charts Row ── */}
      <section className={styles.chartSection} style={{ paddingTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.chartsRow}>
            {/* Mentor Country Pie */}
            <motion.div
              className={styles.chartCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.chartHeader}>
                <p className={styles.chartLabel}>Global Reach</p>
                <h2 className={styles.chartTitle}>Mentor countries</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {countryData.map((_, i) => (
                      <Cell key={i} fill={countryColors[i % countryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(val) => <span style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#2c2c28' }}>{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Mentor Type Pie */}
            <motion.div
              className={styles.chartCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.chartHeader}>
                <p className={styles.chartLabel}>Mentor Sectors</p>
                <h2 className={styles.chartTitle}>Academia, Industry, Research</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={mentorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mentorData.map((_, i) => (
                      <Cell key={i} fill={[COLORS.teal, COLORS.green, COLORS.orange][i % 3]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(val) => <span style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#2c2c28' }}>{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Notable Mentors ── */}
      <section className={styles.mentorsSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.mentorsHeader}
          >
            <p className={styles.chartLabel}>Mentor Network</p>
            <h2 className={styles.chartTitle}>Where our fellows learn</h2>
          </motion.div>
          <div className={styles.mentorTags}>
            {[
              'IIT Delhi', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Gandhinagar',
              'IISc Bangalore', 'IISER Kolkata', 'MIT', 'Harvard University',
              'Ohio State University', 'University of Illinois', 'TU Clausthal',
              'CNRS Montpellier', 'Jadavpur University', 'Physical Research Lab',
              'Bristol Myers Squibb', 'Videonetics', 'Target Inc.',
            ].map((m, i) => (
              <motion.span
                key={m}
                className={styles.mentorTag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                {m}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fellows Table ── */}
      <section className={styles.tableSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={styles.chartLabel}>Full Cohort</p>
            <h2 className={styles.chartTitle} style={{ marginBottom: '1.5rem' }}>All {STATS.fellows} FRAME Fellows</h2>
          </motion.div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Home District</th>
                  <th>College</th>
                  <th>Mentor / Institution</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {fellows.map((f, i) => (
                  <motion.tr
                    key={f.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.02, 0.6) }}
                  >
                    <td className={styles.num}>{i + 1}</td>
                    <td className={styles.nameCell}>{f.name}</td>
                    <td>{f.homeDistrict}</td>
                    <td className={styles.college}>{f.college}</td>
                    <td className={styles.mentor}>{f.mentor}</td>
                    <td>
                      <span className={`${styles.countryBadge} ${styles[f.country.replace(/\s+/g,'')]}`}>
                        {f.country}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
