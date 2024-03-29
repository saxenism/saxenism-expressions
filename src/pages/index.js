import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const margin = {
    'margin-right': '20px'
  };
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link 
            style={margin}
            className="button button--secondary button--lg"
            to= '/testimonials'>
            💫 Testimonials 🌟
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://t.me/saxenism">
            ✍️ Get In Touch 🕊️ 
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`EVM Expressions`}
      description="Personal website of Rahul Saxena, an EVM Engineer providing security and testing consulting focussed on DeFi protocols">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
