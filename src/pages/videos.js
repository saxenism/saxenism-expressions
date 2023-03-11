import React from 'react';
import Layout from '@theme/Layout';
import YoutubeEmbed from '../components/VideoComponents/YoutubeEmbed';
import "../components/VideoComponents/youtubeEmbedStyle.css";

export default function VideosPage() {

    let videoInformation = [
        {
            embedId: '8ZMC62u3Dog',
            videoName: 'Bullet-proof your protocol or earn a million dollars. Guide to an anti-fragile testing framework'
        },
        {
            embedId: 'BsDWR2lCk-E',
            videoName: 'Create, deploy and test an on-chain DAO using Foundry' 
        },
        {
            embedId: 'BC71jg8OJx0',
            videoName: 'Create and deploy an ERC20 Token' 
        },
        {
            embedId: 'ndzLdjX1mMg',
            videoName: 'Hackathon Project: Solana Roads'
        },
        {
            embedId: '0jyrSCDVZjY',
            videoName: 'Hackathon Project: RunETH' 
        },
        {
            embedId: 'Y48JIoiOTSA',
            videoName: 'Post GSoC Selection Interview'
        }
    ];

  return (
    <Layout>
    <div className="App">
        <h1 align="center">Pre <mark class="green">Hollywood</mark> star <mark class="red">Arc</mark></h1>
        <br />
        <br />
        {
            videoInformation.map(video => <YoutubeEmbed videoInformation={video} />)
        }
        
    </div>
    </Layout>
  );
}