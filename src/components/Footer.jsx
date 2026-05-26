import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoF}>F</span>RAME
          </div>
          <p className={styles.tagline}>Shaping futures, beyond barriers.</p>
        </div>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/infographic">Impact</Link>
          <Link to="/fellows">Fellows</Link>
          <a href="https://framebengal.com" target="_blank" rel="noopener noreferrer">framebengal.com</a>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} FRAME Bengal. All rights reserved.</p>
      </div>
    </footer>
  )
}
