import {type ReactElement} from 'react';

import styles from './AwsCheatsheetCard.module.css';

export default function AwsCheatsheetCard(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Ready to master AWS?
      </h3>
      <p className={styles.description}>
        Get my <strong>FREE AWS Cheatsheet</strong> — your definitive preparation guide for AWS certifications
        with structured insights on the most important services!
      </p>
      <a
        href="https://emersonbraun.github.io/aws-cheatsheet/"
        className={styles.cta}
        target="_blank"
        rel="noopener noreferrer">
        Open AWS Cheatsheet
      </a>
      <p className={styles.footer}>
        Free - Always up to date - Made for developers
      </p>
    </div>
  );
}
