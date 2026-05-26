import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'
import { fellows, STATS } from '../data/fellows'
import { mentors } from '../data/mentors'
import FellowCard from '../components/FellowCard'
import styles from './Home.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/website_home_page.mp4" type="video/mp4" />
        </video>
        <motion.div className={styles.heroBg} style={{ y: heroY }} />
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft} />
          <div className={styles.heroRight} />
        </div>

        <motion.div className={styles.heroContent} style={{ opacity: heroOpacity }}>
          <motion.div
            className={styles.eyebrow}
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
          >
            West Bengal · STEM Mentorship
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            <span className={styles.heroWord}>Shaping</span>
            <span className={styles.heroWord}>futures,</span>
            <br />
            <span className={styles.heroAccent}>beyond barriers.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
          >
            FRAME connects STEM students from across West Bengal with world-class
            mentors at leading universities and industries — bridging geography,
            opportunity, and aspiration.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <Link to="/fellows" className={styles.btnPrimary}>Meet the Fellows</Link>
            <Link to="/infographic" className={styles.btnSecondary}>See our Impact</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroScroll}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        >
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className={styles.statsBar}>
        {[
          { num: STATS.fellows, suffix: '', label: 'Fellows' },
          { num: STATS.districts, suffix: '+', label: 'Districts' },
          { num: STATS.countries, suffix: '', label: 'Countries' },
          { num: STATS.mentors, suffix: '+', label: 'Mentor Institutions' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={styles.stat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className={styles.statNum}>
              <AnimatedCounter to={s.num} suffix={s.suffix} />
            </div>
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* ── Mission ── */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <motion.div
            className={styles.missionGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className={styles.missionText} variants={fadeUp} custom={0}>
              <p className={styles.sectionLabel}>Our Mission</p>
              <h2 className={styles.missionH}>Breaking the barriers of geography and access</h2>
              <p className={styles.missionP}>
                FRAME believes that where you grow up shouldn't determine how far you can go.
                Through structured mentorship, we connect bright STEM minds from every corner
                of West Bengal — from Cooch Behar to Purba Medinipur — with mentors at IITs,
                IISERs, Ivy League universities, and global industry leaders.
              </p>
              <p className={styles.missionP}>
                Our fellows gain not just guidance, but a community, a network, and a proven
                pathway to academic and professional excellence.
              </p>
              <Link to="/infographic" className={styles.btnPrimary} style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                Explore our Impact →
              </Link>
            </motion.div>

            <motion.div className={styles.missionCards} variants={fadeUp} custom={1}>
              {[
                { icon: '🎓', title: 'Elite Mentors', desc: 'IITs, IISERs, MIT, Harvard, Ohio State and more' },
                { icon: '🗺️', title: 'Statewide Reach', desc: 'Students from 13+ districts across West Bengal' },
                { icon: '🌍', title: 'Global Connections', desc: 'Mentors across India, USA, Germany, France' },
                { icon: '🔬', title: 'STEM Focused', desc: 'Science, technology, engineering, mathematics' },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className={styles.missionCard}
                  whileHover={{ y: -4, borderColor: 'var(--teal)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.cardIcon}>{c.icon}</div>
                  <h4 className={styles.cardTitle}>{c.title}</h4>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Fellows ── */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.featuredHeader}
          >
            <p className={styles.sectionLabel}>Success Stories</p>
            <h2 className={styles.featuredH}>Meet some of our fellows</h2>
          </motion.div>

          <div className={styles.fellowsGrid}>
            {fellows.slice(0, 6).map((f, i) => (
              <FellowCard key={f.id} fellow={f} index={i} />
            ))}
          </div>

          <motion.div
            className={styles.viewAll}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <Link to="/fellows" className={styles.btnSecondary}>View all {fellows.length} fellows →</Link>
          </motion.div>
        </div>
      </section>

      {/* ── Mentors ── */}
      <section className={styles.mentors}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.featuredHeader}
          >
            <p className={styles.sectionLabel}>Our Mentors</p>
            <h2 className={styles.featuredH}>Guided by the best</h2>
          </motion.div>

          <div className={styles.mentorsGrid}>
            {mentors.map((m, i) => (
              <motion.div
                key={m.id}
                className={styles.mentorCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              >
                <img src={m.image} alt={m.name} className={styles.mentorImg} />
                <p className={styles.mentorName}>{m.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <motion.h2
            className={styles.ctaH}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Every student deserves a mentor.
          </motion.h2>
          <motion.p
            className={styles.ctaP}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            FRAME is reshaping how talent is discovered and nurtured across West Bengal.
          </motion.p>
          <motion.a
            href="https://framebengal.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            Learn more about FRAME
          </motion.a>
        </div>
      </section>
    </main>
  )
}
