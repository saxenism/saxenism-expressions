import React from 'react';
import Layout from '@theme/Layout';
import YoutubeEmbed from "../components/YoutubeEmbeds/YoutubeEmbed";"components/YoutubeEmbeds/YoutubeEmbed.js";
import "../components/YoutubeEmbeds/style.css";

export default function MyVideos() {

    let videoInformation = [
        {
            title: "Bullet-proof your protocol or earn a million dollars. Guide to an anti-fragile testing framework",
            embedID: "8ZMC62u3Dog"
        },
        {
            title: "Create, deploy and test an on-chain DAO using Foundry",
            embedID: "BsDWR2lCk-E"
        },
        {
            title: "Create and deploy an ERC20 Token",
            embedID: "BC71jg8OJx0"
        },
        {
            title: "Hackathon Project: Solana Roads",
            embedID: "ndzLdjX1mMg"
        },
        {
            title: "Hackathon Project: RunETH",
            embedID: "0jyrSCDVZjY"
        },
        {
            title: "Post GSoC Selection Interview",
            embedID: "Y48JIoiOTSA"
        }
    ];

  return (
    <Layout>
    <div className="App">
    <h1 align="center">A few videos from me</h1>
    <br />
    <br />
    {
        videoInformation.map(video => <YoutubeEmbed video={video} />)
    }
    </div>
    </Layout>
  );
}