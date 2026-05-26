import { motion } from 'framer-motion'

export default function WhoWeAre() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[720px]"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-teal mb-4">Who We Are</p>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
            FRAME is a nonprofit initiative led by STEM PhD students, postdoctoral researchers, and early-career academics. We are guided by an advisory board of distinguished scholars and professionals from leading universities and industries worldwide. Together, we are aiming to shape futures beyond barriers by building an inclusive ecosystem that connects talent with global guidance and resources across disciplines and borders.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
