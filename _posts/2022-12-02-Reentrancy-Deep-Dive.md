---
toc: true
layout: post
comments: true
description: With credits to the excellent re-entrancy repository by pcaversaccio, this article is an attempt to provide a summary of the attacks.
categories: [web3, solidity, exploits, advanced, intermediate]
title: Everything about Reentrancy Attacks
---

# Introduction and Motivation

// Write Introduction and Motivation

## Note about the attacks covered

I'll only be covering re-entrancy attacks from 2020 onwards as I consider them recent and should be put out in the public domain in an easily digestable format for the long term safety of DeFi users and the eventual mass adoption of DeFi.

# imBTC Uniswap Pool Attack

## Relevant Links

1. [Victim Contract](https://etherscan.io/address/0xFFcf45b540e6C9F094Ae656D2e34aD11cdfdb187)
2. [Exploit Contract](https://etherscan.io/address/0xBD2250D713bf98b7E00c26E2907370aD30f0891a)
3. [Exploit Transaction](https://etherscan.io/tx/0x9437dde6c06a20f6d56f69b07f43d5fb918e6c57c97e1fc25a4162c693f578aa)
4. [Media Coverage](https://defirate.com/news/imbtc-uniswap-hack)

## Background

This section contains the context that you need to have before we jump in to inspect the attack. 

Also, all the information in this section is being taken off the internet as of 2nd December 2022. Therefore, it *might* not be the same as the information at the time of attack.

### Tokelon

[Tokelon](https://tokenlon.im/) is a decentralised exchange (DEX) protocol that provides a [Bitcoin Wrapping Service](https://tokenlon.im/imbtc), and thus providing a coin called **imBTC** to the markets.

### imBTC

1. imBTC is an ERC777 token, issued and regulated by Tokenlon.
2. It is backed 1:1 with Bitcoin and holders can mint, exchange and redeem their imBTC for equivalent amount of BTC
3. imBTC can be bought with BTC(from the imBTC DApp) or ERC20 tokens such as USDC or ETH.
4. You get interest by holding imBTC (generated from Tokenlon's imBTC exchange fee).
5. (The actual unwrapped) BTC will be stored in Tokenlon's cold wallet, and the <mark>cold wallet will ensure the security of BTC</mark> assets.
6. Anyone who has imBTC <mark >can trigger the function of distributing imBTC revenue</mark>. All income will be allocated to users wallet in the proportion to imBTC. 

Hmm, with point 6 they are following the pull mechanism instead of push for fund distribution which is good, security wise.

### ERC777 standard
