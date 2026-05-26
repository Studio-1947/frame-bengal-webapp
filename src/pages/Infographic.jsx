import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import AnimatedCounter from '../components/AnimatedCounter'
import { fellows, districtCounts, countryCounts, mentorTypeCounts, STATS } from '../data/fellows'

const COLORS = {
  teal: '#00a6c4',
  green: '#88B253',
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
      <div className="bg-dark-200 border border-dark-300 rounded-lg px-3.5 py-2 font-body text-sm text-off-white">
        <strong>{payload[0].name || payload[0].payload?.name}</strong>: {payload[0].value}
      </div>
    )
  }
  return null
}

const countryBadgeColors = {
  'India': 'bg-[#fff3e0] text-[#b35900]',
  'United States': 'bg-teal-light text-teal-dark',
  'Germany': 'bg-green-light text-green-dark',
  'France': 'bg-[#f3e8fd] text-[#6b3fa0]',
}

export default function Infographic() {
  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="relative bg-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_90%_50%,rgba(0,166,196,0.2)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_80%,rgba(136,178,83,0.12)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-8 relative">
          <motion.p
            className="font-display text-xs font-bold tracking-[0.16em] uppercase text-teal mb-5 flex items-center gap-3 before:content-[''] before:w-7 before:h-px before:bg-teal"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            FRAME Impact Report
          </motion.p>
          <motion.h1
            className="text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold text-off-white tracking-tighter leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Mapping opportunity<br />
            <span className="text-teal">across West Bengal</span>
          </motion.h1>
          <motion.p
            className="text-base text-white/50 max-w-[56ch] leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            A snapshot of FRAME's first cohort — {STATS.fellows} fellows, {STATS.districts}+ home districts,
            and mentors spanning 5 countries and 15+ institutions.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark-200 py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: STATS.fellows, suffix: '', label: 'Fellows selected', sub: 'From across West Bengal' },
              { num: STATS.districts, suffix: '+', label: 'Home districts', sub: 'Geographic representation' },
              { num: STATS.countries, suffix: '', label: 'Mentor countries', sub: 'India, USA, Germany, France + more' },
              { num: STATS.mentors, suffix: '+', label: 'Mentor institutions', sub: 'IITs, IISERs, global universities' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="bg-dark-100 rounded-2xl border border-dark-300 p-8 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="font-display text-[clamp(2.5rem,5vw,3.8rem)] font-extrabold text-teal tracking-tighter leading-none mb-2">
                  <AnimatedCounter to={s.num} suffix={s.suffix} />
                </div>
                <div className="font-display text-sm font-bold text-off-white mb-1">{s.label}</div>
                <div className="text-xs text-gray-400 leading-snug">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Bar Chart */}
      <section className="py-14 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            className="bg-dark-200 rounded-2xl border border-dark-300 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-2">District Representation</p>
              <h2 className="text-xl font-bold tracking-tight text-off-white mb-2">Fellows by home district</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[60ch]">
                FRAME reaches students from {Object.keys(districtCounts).length} distinct home districts,
                demonstrating the program's geographic breadth across West Bengal.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={districtData} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 150 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a35" horizontal={false} />
                <XAxis type="number" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#a0a09a' }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#e0dfd9' }} width={145} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={COLORS.teal} radius={[0, 4, 4, 0]}>
                  {districtData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? COLORS.teal : i < 3 ? '#33b8d4' : '#80d4e6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Two Charts Row */}
      <section className="pb-14 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-dark-200 rounded-2xl border border-dark-300 p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-2">Global Reach</p>
                <h2 className="text-xl font-bold tracking-tight text-off-white">Mentor countries</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={countryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                    {countryData.map((_, i) => <Cell key={i} fill={countryColors[i % countryColors.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(val) => <span className="font-body text-sm text-off-white">{val}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="bg-dark-200 rounded-2xl border border-dark-300 p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-2">Mentor Sectors</p>
                <h2 className="text-xl font-bold tracking-tight text-off-white">Academia, Industry, Research</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={mentorData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                    {mentorData.map((_, i) => <Cell key={i} fill={[COLORS.teal, COLORS.green, COLORS.orange][i % 3]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(val) => <span className="font-body text-sm text-off-white">{val}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notable Mentors */}
      <section className="bg-dark py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-2">Mentor Network</p>
            <h2 className="text-xl font-bold tracking-tight text-off-white">Where our fellows learn</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {[
              'IIT Delhi', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Gandhinagar',
              'IISc Bangalore', 'IISER Kolkata', 'MIT', 'Harvard University',
              'Ohio State University', 'University of Illinois', 'TU Clausthal',
              'CNRS Montpellier', 'Jadavpur University', 'Physical Research Lab',
              'Bristol Myers Squibb', 'Videonetics', 'Target Inc.',
            ].map((m, i) => (
              <motion.span
                key={m}
                className="font-display text-sm font-semibold px-4 py-2 rounded-full border border-white/15 text-white/70 transition-all cursor-default hover:border-teal hover:text-teal hover:bg-teal/8"
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

      {/* Fellows Table */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-[0.72rem] font-bold tracking-[0.14em] uppercase text-teal mb-2">Full Cohort</p>
            <h2 className="text-xl font-bold tracking-tight text-off-white mb-6">All {STATS.fellows} FRAME Fellows</h2>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-dark-300 shadow-sm">
            <table className="w-full border-collapse bg-dark-200 text-sm">
              <thead className="bg-dark-300 border-b border-dark-300">
                <tr>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">#</th>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">Name</th>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">Home District</th>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">College</th>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">Mentor / Institution</th>
                  <th className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400 px-4 py-3 text-left whitespace-nowrap">Country</th>
                </tr>
              </thead>
              <tbody>
                {fellows.map((f, i) => (
                  <motion.tr
                    key={f.id}
                    className="border-b border-dark-300 last:border-b-0 hover:bg-dark-300/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.02, 0.6) }}
                  >
                    <td className="px-4 py-3 font-display font-bold text-teal">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-off-white whitespace-nowrap">{f.name}</td>
                    <td className="px-4 py-3 text-gray-500">{f.homeDistrict}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[220px]">{f.college}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[220px]">{f.mentor}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${countryBadgeColors[f.country] || 'bg-dark-300 text-gray-500'}`}>
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
