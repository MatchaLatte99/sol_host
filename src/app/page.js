// Next.js Landing Page Component
import Head from 'next/head';
import styles from './page.module.css'; // Assuming you have a CSS module file
import Chatbot from "../component/Chatbot";


export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to my landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.logo}>My Landing Page</h1>
        <nav className={styles.nav}>
          <a href="#home" className={styles.link}>Home</a>
          <a href="#about" className={styles.link}>About</a>
          <a href="#services" className={styles.link}>Services</a>
          <a href="#contact" className={styles.link}>Contact</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to My Landing Page</h2>
        <p className={styles.heroSubtitle}>This is where your journey begins.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>

      <section className={styles.chatbotSection}>
      </section>

      <footer className={styles.footer}>
        © 2024 My Landing Page. All rights reserved.
      </footer>
       <Chatbot />
    </div>
  );
}
