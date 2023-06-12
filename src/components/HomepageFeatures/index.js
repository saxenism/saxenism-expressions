import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const AchievementsList = [
  {
    title: "Previous Work",
    Svg: require('@site/static/img/ryanlerch_swords_and_shield.svg').default,
    description: (
      <>
      <p style={{textAlign: 'center'}}>Clients that I have helped secured, either via private audits, audit contests or bug bounties.</p>
        <ul>
          <li style={{textAlign: 'left'}}> <b>[BUG BOUNTY] &nbsp; &nbsp;</b> <a href='https://twitter.com/hoprnet/status/1666430539656581120' target='_blank'> Discovered a medium severity bug in HOPR with $3.3M staked at the time of disclosure</a>  </li>
          <li style={{textAlign: 'left'}}> <b>[AUDIT CONTEST] &nbsp; &nbsp;</b> <a href='https://twitter.com/HatsFinance/status/1658887827466375168' target='_blank'>   Top 3 Finish in Gravita Audit Contest</a>  </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://www.brahma.fi/' target='_blank'>   Brahma Finance: Polygains Vault</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://twitter.com/0xdanzu/status/1658486994299920388?s=20' target='_blank'>    Brahma Finance: Brahma Console</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://sablier.finance/' target='_blank'>   Sablier v2</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://vapornodes.finance/' target='_blank'>    Vapor Finance</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://twitter.com/youdonated' target='_blank'>   YouDonate</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://www.return.green/' target='_blank'>    Return Protocol</a> </li>
          <li style={{textAlign: 'left'}}> <b>[PRIVATE AUDIT] &nbsp; &nbsp;</b> <a href='https://cryptoavatars.io/' target='_blank'>    CryptoAvatars</a>  </li>
        </ul>
      </>
    ),
  }
];

const FeatureList = [
  {
    title: 'Auditoor & Developoor',
    Svg: require('@site/static/img/hacker-svgrepo-com.svg').default,
    description: (
      <>
        <ul>
          <li style={{textAlign: 'left'}}>Auditing EVM smart contracts is almost a direct expression of how my mind fundamentally works, and I LOVE IT!! </li>
          <li style={{textAlign: 'left'}}>I specialise in catching (some really extreme) edge-casey bugs in your codebase.</li>
          <li style={{textAlign: 'left'}}>Have led secure product development of a new-age lending product at <a href='https://sublime.finance/'>Sublime</a> called <b>Pooled Credit Lines</b> from the ground up</li>
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
          <li style={{textAlign: 'left'}}>Led efforts for theorizing and implementing the entire testing infra for <a href='https://sublime.finance/' target='_blank'>Sublime</a> & <a href='https://specular.network/' target='_blank'>Specular L2</a>. </li>
          <li style={{textAlign: 'left'}}><b>12+ critical bugs</b> & <b>8+ edge cases</b> uncovered at Specular & Sublime respectively following my testing process.</li>
          <li style={{textAlign: 'left'}}>You can listen to <a href='https://youtu.be/8ZMC62u3Dog' target='_blank'>my presentation</a> on testing pyschology.</li>
        </ul>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
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

function Achievements({Svg, title, description}) {
  return (
    <div className={clsx('col col--12')}>
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
    <>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {AchievementsList.map((props, idx) => (
            <Achievements key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
