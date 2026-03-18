import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import {type ReactElement} from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Learn JavaScript from absolute zero to advanced concepts with hands-on projects">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text--center padding-horiz--md">
                  <div className={styles.introSection}>
                    <h2>What is this course?</h2>
                    <p>
                      JS From Zero to Hero is a comprehensive, hands-on JavaScript course that takes
                      you from absolute beginner to advanced developer. Each module combines theory
                      with interactive exercises you can run directly in your browser, plus real-world
                      projects to build your portfolio.
                    </p>
                    <div className={styles.buttons}>
                      <Link
                        className="button button--primary button--lg"
                        to="/docs/">
                        Explore the Course
                      </Link>
                    </div>
                  </div>

                  <h2>What you will learn</h2>
                  <ul>
                    <li>JavaScript fundamentals from scratch</li>
                    <li>DOM manipulation and browser APIs</li>
                    <li>Closures, prototypes, and async patterns</li>
                    <li>29+ real-world projects with live demos</li>
                    <li>Interactive exercises with instant feedback</li>
                    <li>Security best practices and modern tooling</li>
                  </ul>

                  <h2>Help Improve This Course</h2>
                  <p>
                    This project thrives on community contributions. Whether you are learning
                    JavaScript or are an experienced developer, your insights are valuable!
                  </p>

                  <div className={styles.buttons} style={{marginBottom: '4rem'}}>
                    <Link
                      className="button button--secondary button--lg"
                      href="https://github.com/EmersonBraun/js-dev-course">
                      Contribute to the Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
