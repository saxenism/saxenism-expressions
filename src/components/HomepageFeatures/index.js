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
          <li>Previous clients include Sablier v2, Brahama.finance, YouDonate, Return Protocol, CantoNameService, CrytoAvatar among others.</li>
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
  {
    title: 'Developoor',
    Svg: require('@site/static/img/computers.svg').default,
    description: (
      <>
        <ul>
          <li>Led the product development of a new-age lending product at Sublime along with another dev from the ground up.</li>
          <li>Led a team of devs for creating a decentralised Upwork-like platform</li>
          <li>I have written a bunch of code here-and-there. Overall, I just love writing, super-safe yet gas-efficient code. Given my security background, the fundamentals of writing sound code are just hardwired into me :P </li>
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
