import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Auditoor (Security Researcher)',
    Svg: require('@site/static/img/hacker_svgrepo_com.svg').default,
    description: (
      <>
        I review smart contracts professionally as well as independently. Previous clients include Canto Name Services, Brahma Finance, YouDonate and many more.
      </>
    ),
  },
  {
    title: 'Testoor',
    Svg: require('@site/static/img/tester.svg').default,
    description: (
      <>
        Led the efforts for theorizing, designing and implementing THE most comprehensive testing suites for smart contract at <a href='https://sublime.finance/' target='_blank'>Sublime Finance</a> and <a href='https://specular.network/' target='_blank'>Specular L2</a>,
        which led to the capture of multiple bugs (some really extreme ones) even after multiple audits.
      </>
    ),
  },
  {
    title: 'Develepoor',
    Svg: require('@site/static/img/coder.svg').default,
    description: (
      <>
        Armed with my security background and my panache to constantly update my knowledge, I have been writing fast and secure smart contract code in Solidity for a few years both professionally and for personal use.
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
