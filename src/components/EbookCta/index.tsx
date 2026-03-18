import {type ReactElement} from 'react';

import styles from './styles.module.css';

export function EbookCta(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Tired of failing technical interviews?
      </h3>
      <p className={styles.description}>
        Get my <strong>FREE e-book</strong> "Cracking The Technical Interview" and learn proven strategies
        to ace your next technical interview with confidence!
      </p>
      <a
        href="https://ebook.emersonbraun.dev/"
        className={styles.cta}
        target="_blank"
        rel="noopener noreferrer">
        Get My Free E-book
      </a>
      <p className={styles.footer}>
        Trusted by 2,000+ developers
      </p>
    </div>
  );
}
