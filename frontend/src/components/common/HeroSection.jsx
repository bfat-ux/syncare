import React from 'react';
import styles from './HeroSection.module.css';

function HeroSection({ title, backgroundImage, children }) {
  return (
    <div className={styles.heroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default HeroSection;