import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Auditoor',
    Svg: require('@site/static/img/hacker-svgrepo-com.svg').default,
    description: (
      <>
        I enjoy auditing EVM smart contracts as it is almost a direct expression of how my mind fundamentally works. I specialise in catching (some really extreme) edge-cases in your codebase.
        Previous clients include Brahama.finance, YouDonate, CantoNameService, Sablier v2, among others.
      </>
    ),
  },
  {
    title: 'Testoor',
    Svg: require('@site/static/img/test-tube-shake-svgrepo-com.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Developoor',
    Svg: require('@site/static/img/computers.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
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
