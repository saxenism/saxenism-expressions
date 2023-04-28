import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Auditoor & Developoor',
    Svg: require('@site/static/img/hacker-svgrepo-com.svg').default,
    description: (
      <>
        <ul>
          <li>Auditing EVM smart contracts is almost a direct expression of how my mind fundamentally works, and I LOVE IT!! </li>
          <li>I specialise in catching (some really extreme) edge-casey bugs in your codebase.</li>
          <li>Have led secure product development of a new-age lending product at <a href='https://sublime.finance/'>Sublime</a> called <b>Pooled Credit Lines</b> from the ground up</li>
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
          <li>Led efforts for theorizing and implementing the entire testing infra for <a href='https://sublime.finance/' target='_blank'>Sublime</a> & <a href='https://specular.network/' target='_blank'>Specular L2</a>. </li>
          <li><b>12+ critical bugs</b> & <b>8+ edge cases</b> uncovered at Specular & Sublime respectively following my testing process.</li>
          <li>You can listen to <a href='https://youtu.be/8ZMC62u3Dog' target='_blank'>my presentation</a> on testing pyschology.</li>
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
