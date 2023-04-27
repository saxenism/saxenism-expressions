import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Auditoor',
    Svg: require('@site/static/img/hacker-svgrepo-com.svg').default,
    description: (
      <>
        <ul>
          <li>I enjoy auditing EVM smart contracts as it is almost a direct expression of how my mind fundamentally works. </li>
          <li>I specialise in catching (some really extreme) edge-cases in your codebase.</li>
          <li>Led a secure product development of a new-age lending product at <a href='https://sublime.finance/'>Sublime</a> along with another dev from the ground up</li>
        </ul>
      </>
    ),
  },
  {
    title: "Previous Clients",
    Svg: require('@site/static/img/ryanlerch_swords_and_shield.svg').default,
    description: (
      <>
      <p>Clients that I have helped secured, either individually or in teams</p>
        <ul>
          <li><a href='https://www.brahma.fi/'>Brahama Finance</a></li>
          <li><a href='https://sablier.finance/'>Sablier v2</a></li>
          <li><a href='https://vapornodes.finance/'>Vapor Finance</a></li>
          <li><a href='https://twitter.com/youdonated'>YouDonate</a></li>
          <li><a href='https://www.return.green/'>Return Protocol</a></li>
          <li><a href='https://cryptoavatars.io/'>CryptoAvatars</a></li>
        </ul>
      </>
    ),
  },
  {
    title: 'Testoor',
    Svg: require('@site/static/img/test-tube-shake-svgrepo-com.svg').default,
    description: (
      <>
        <ul>
          <li>I have led the efforts for theorizing, reconnaissance and implementation of an acutely thorough testing infrastructure for Sublime Finance and now the Specular L2. </li>
          <li>At Specular, my testing methodologies revelead 12+ critical bugs (code not audited until that point) and 8+ edge cases in Sublime's codebase even after multiple audits.</li>
          <li>I have offered testing review (and implementation) services to several leading DeFi protocols.</li>
        </ul>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
