import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import CracoLogo from '@site/static/img/craco.png';

export default function Home() {
  const [stars, setStars] = useState('-');

  useEffect(() => {
    fetch('https://api.github.com/repos/dilanx/craco')
      .then((response) => response.json())
      .then((data) =>
        setStars(
          data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        )
      );
  }, []);

  return (
    <Layout
      title={`Configure CRA without ejecting.`}
      description="Create React App Configuration Override"
    >
      <main className="craco-main">
        <div className="header">
          <img src={CracoLogo} alt="CRACO logo" />
          <div className="text">
            <p>
              <span>C</span>REATE
            </p>
            <p>
              <span>R</span>EACT
            </p>
            <p>
              <span>A</span>PP
            </p>
            <p>
              <span>C</span>ONFIGURATION
            </p>
            <p>
              <span>O</span>VERRIDE
            </p>
          </div>
        </div>
        <div className="buttons">
          <a href="/docs/" style={{ '--color': 'white' }}>
            <PlayIcon />
            <p>Get Started</p>
          </a>
          <a
            href="https://github.com/dilanx/craco"
            style={{ '--color': 'gold' }}
          >
            <StarIcon />
            <p>{stars}</p>
          </a>
        </div>
      </main>
    </Layout>
  );
}
