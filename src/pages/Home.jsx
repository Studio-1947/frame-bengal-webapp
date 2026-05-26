import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'
import { fellows, STATS } from '../data/fellows'
import { mentors } from '../data/mentors'
import FellowCard from '../components/FellowCard'

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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark" ref={heroRef}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/website_home_page.mp4" type="video/mp4" />
        </video>
        <motion.div className="absolute inset-0 bg-dark/60" style={{ y: heroY }} />

        <motion.div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[calc(72px+3rem)] md:pt-[calc(72px+4rem)] pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
          <motion.div
            className="font-display text-[0.7rem] sm:text-xs font-bold tracking-[0.16em] uppercase text-teal mb-4 sm:mb-6 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-teal"
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
          >
            West Bengal · STEM Mentorship
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-off-white mb-4 sm:mb-6 tracking-tighter"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            Shaping futures,
            <br />
            <span className="text-teal">beyond barriers.</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/55 max-w-[52ch] mb-8 sm:mb-10 leading-relaxed"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
          >
            FRAME connects STEM students from across West Bengal with world-class
            mentors at leading universities and industries — bridging geography,
            opportunity, and aspiration.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <Link to="/fellows" className="inline-flex items-center justify-center font-display text-sm font-bold px-6 sm:px-8 py-3 sm:py-3.5 bg-teal text-white rounded-full tracking-wide transition-all duration-200 hover:bg-teal-dark hover:-translate-y-0.5">
              Meet the Fellows
            </Link>
            <Link to="/infographic" className="inline-flex items-center justify-center font-display text-sm font-bold px-6 sm:px-8 py-3 sm:py-3.5 border-[1.5px] border-white/25 text-white rounded-full transition-all duration-200 hover:border-teal hover:text-teal">
              See our Impact
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-4 sm:left-8 flex-col items-center gap-2 font-display text-[0.7rem] tracking-[0.12em] uppercase text-white/30 hidden sm:flex"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        >
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-dark-200 border-b border-dark-300 grid grid-cols-2 md:grid-cols-4">
        {[
          { num: STATS.fellows, suffix: '', label: 'Fellows' },
          { num: STATS.districts, suffix: '+', label: 'Districts' },
          { num: STATS.countries, suffix: '', label: 'Countries' },
          { num: STATS.mentors, suffix: '+', label: 'Mentor Institutions' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="py-6 sm:py-10 px-4 sm:px-6 text-center border-r border-dark-300 last:border-r-0 [&:nth-child(2)]:max-md:border-r-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal leading-none mb-1 tracking-tighter">
              <AnimatedCounter to={s.num} suffix={s.suffix} />
            </div>
            <div className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.08em] text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* ── Mission ── */}
      <section className="py-16 md:py-28 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-teal mb-4">Our Mission</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight text-off-white mb-6 tracking-tight">Breaking the barriers of geography and access</h2>
              <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base">
                FRAME believes that where you grow up shouldn't determine how far you can go.
                Through structured mentorship, we connect bright STEM minds from every corner
                of West Bengal — from Cooch Behar to Purba Medinipur — with mentors at IITs,
                IISERs, Ivy League universities, and global industry leaders.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base">
                Our fellows gain not just guidance, but a community, a network, and a proven
                pathway to academic and professional excellence.
              </p>
              <Link to="/infographic" className="inline-flex items-center font-display text-sm font-bold px-6 sm:px-8 py-3 sm:py-3.5 bg-teal text-white rounded-full tracking-wide transition-all duration-200 hover:bg-teal-dark hover:-translate-y-0.5">
                Explore our Impact →
              </Link>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={fadeUp} custom={1}>
              {[
                { icon: '🎓', title: 'Elite Mentors', desc: 'IITs, IISERs, MIT, Harvard, Ohio State and more' },
                { icon: '🗺️', title: 'Statewide Reach', desc: 'Students from 13+ districts across West Bengal' },
                { icon: '🌍', title: 'Global Connections', desc: 'Mentors across India, USA, Germany, France' },
                { icon: '🔬', title: 'STEM Focused', desc: 'Science, technology, engineering, mathematics' },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className="bg-dark-200 rounded-xl border border-dark-300 p-5 sm:p-6 transition-all duration-200 hover:shadow-[0_6px_24px_rgba(0,166,196,0.1)]"
                  whileHover={{ y: -4, borderColor: '#00a6c4' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl sm:text-3xl mb-3">{c.icon}</div>
                  <h4 className="font-display text-sm font-bold mb-1 text-off-white">{c.title}</h4>
                  <p className="text-xs text-gray-500 leading-snug">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Fellows ── */}
      <section className="py-16 md:py-24 bg-dark-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-teal mb-3">Success Stories</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-off-white">Meet some of our fellows</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 md:mb-12">
            {fellows.slice(0, 6).map((f, i) => (
              <FellowCard key={f.id} fellow={f} index={i} />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <Link to="/fellows" className="inline-flex items-center font-display text-sm font-bold px-6 sm:px-8 py-3 sm:py-3.5 border-[1.5px] border-gray-400 text-off-white rounded-full transition-all duration-200 hover:border-teal hover:text-teal">
              View all {fellows.length} fellows →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Mentors ── */}
      <section className="py-16 md:py-24 bg-dark-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-teal mb-3">Our Mentors</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-off-white">Guided by the best</h2>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
            {mentors.map((m, i) => (
              <motion.div
                key={m.id}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              >
                <img src={m.image} alt={m.name} className="w-full aspect-square object-cover rounded-full border-2 sm:border-3 border-dark-300 group-hover:border-teal transition-colors" />
                <p className="font-display text-[0.65rem] sm:text-xs font-semibold mt-2 text-off-white">{m.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-br from-teal-dark via-teal to-[#00bfe0] py-16 md:py-24 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="relative max-w-[600px] mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Every student deserves a mentor.
          </motion.h2>
          <motion.p
            className="text-white/75 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed"
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
            className="inline-block font-display font-bold text-sm px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-teal-dark rounded-full transition-transform duration-200 hover:scale-105"
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
