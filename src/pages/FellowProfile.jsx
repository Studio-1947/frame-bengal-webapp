import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fellows } from '../data/fellows'
import styles from './FellowProfile.module.css'

const countryFlag = {
  'India': '🇮🇳',
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
}

const mentorColors = {
  'Academia': { bg: '#e0f6fb', text: '#007d94', label: '🎓 Academia' },
  'Industry': { bg: '#eef5e4', text: '#5e7d39', label: '🏢 Industry' },
  'Research': { bg: '#fff3e0', text: '#b35900', label: '🔬 Research' },
}

export default function FellowProfile() {
  const { id } = useParams()
  const fellow = fellows.find(f => f.id === Number(id))

  if (!fellow) {
    return (
      <main className={styles.notFound}>
        <h1>Fellow not found</h1>
        <Link to="/fellows">← Back to fellows</Link>
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
    <main className={styles.main}>
      <div className={styles.heroBg} />

      <div className={styles.container}>
        <motion.div
          className={styles.breadcrumb}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/fellows">← All Fellows</Link>
          <span>/</span>
          <span>{fellow.name}</span>
        </motion.div>

        <div className={styles.layout}>
          {/* ── Sidebar ── */}
          <motion.aside
            className={styles.sidebar}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.avatar}>{initials}</div>
            <h1 className={styles.name}>{fellow.name}</h1>

            <div className={styles.districtTag}>
              <span className={styles.dot} />
              {fellow.homeDistrict}
            </div>

            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>College</span>
                <span className={styles.metaValue}>{fellow.college}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>College District</span>
                <span className={styles.metaValue}>{fellow.collegeDistrict}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Mentor Institution</span>
                <span className={styles.metaValue}>{fellow.mentor}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Country</span>
                <span className={styles.metaValue}>{flag} {fellow.country}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Mentor Sector</span>
                <span
                  className={styles.badge}
                  style={{ background: mc.bg, color: mc.text }}
                >
                  {mc.label}
                </span>
              </div>
            </div>
          </motion.aside>

          {/* ── Main Card ── */}
          <div className={styles.content}>
            <motion.div
              className={styles.profileCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.cardHeader}>
                <p className={styles.sectionLabel}>Fellow Profile</p>
                <h2 className={styles.cardTitle}>Success Story</h2>
              </div>

              <div className={styles.storyPlaceholder}>
                <div className={styles.storyIcon}>✍️</div>
                <h3 className={styles.storyH}>Story coming soon</h3>
                <p className={styles.storyP}>
                  Each FRAME fellow has a unique journey. {fellow.name}'s full story —
                  their background, challenges, and how mentorship from {fellow.mentor} shaped
                  their path — will be featured here.
                </p>
                <p className={styles.storyP}>
                  This template is ready for individual stories, quotes, achievements,
                  and media to be added for each of the {fellows.length} fellows.
                </p>
              </div>

              {/* Key Info Chips */}
              <div className={styles.chips}>
                <div className={styles.chip}>
                  <span className={styles.chipIcon}>🏠</span>
                  <div>
                    <div className={styles.chipLabel}>From</div>
                    <div className={styles.chipValue}>{fellow.homeDistrict}</div>
                  </div>
                </div>
                <div className={styles.chip}>
                  <span className={styles.chipIcon}>🎓</span>
                  <div>
                    <div className={styles.chipLabel}>Studying at</div>
                    <div className={styles.chipValue}>{fellow.college}</div>
                  </div>
                </div>
                <div className={styles.chip}>
                  <span className={styles.chipIcon}>🌍</span>
                  <div>
                    <div className={styles.chipLabel}>Mentored by</div>
                    <div className={styles.chipValue}>{fellow.mentor}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className={styles.nav}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              {prev ? (
                <Link to={`/fellows/${prev.id}`} className={styles.navBtn}>
                  <span className={styles.navDir}>← Previous</span>
                  <span className={styles.navName}>{prev.name}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/fellows/${next.id}`} className={`${styles.navBtn} ${styles.navRight}`}>
                  <span className={styles.navDir}>Next →</span>
                  <span className={styles.navName}>{next.name}</span>
                </Link>
              ) : <div />}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
