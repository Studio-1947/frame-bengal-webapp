import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './FellowCard.module.css'

const countryFlag = {
  'India': '🇮🇳',
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
}

const mentorColors = {
  'Academia': { bg: '#e0f6fb', text: '#007d94' },
  'Industry': { bg: '#eef5e4', text: '#5e7d39' },
  'Research': { bg: '#fff3e0', text: '#b35900' },
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
      <Link to={`/fellows/${fellow.id}`} className={styles.card}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.body}>
          <h3 className={styles.name}>{fellow.name}</h3>
          <p className={styles.district}>
            <span className={styles.dot} />
            {fellow.homeDistrict}
          </p>
          <p className={styles.college}>{fellow.college}</p>
          <div className={styles.foot}>
            <span
              className={styles.badge}
              style={{ background: mc.bg, color: mc.text }}
            >
              {fellow.mentorType}
            </span>
            <span className={styles.flag} title={fellow.country}>{flag}</span>
          </div>
          <p className={styles.mentor}>{fellow.mentor}</p>
        </div>
      </Link>
    </motion.div>
  )
}
