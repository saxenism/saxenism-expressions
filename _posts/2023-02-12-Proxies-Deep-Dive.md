---
toc: true
layout: post
description: The only resource you will ever need for all your proxy related queries.
categories: [defi, diamond, beacon, UUPS, web3, proxies, proxy, upgradable-contracts]
title: A Deep Dive on Solidity Smart Contract Proxies
---

# Introduction

For a primer on all things you **MUST** understand before going ahead with learning about proxies in depth, please navigate to the end of this article, find the section named **Pre-Requisites** and make sure you understand all concepts listed there.

All proxy patterns are linked together by a distinct feature. It is the combination of **`delegatecall` along with the `fallback` function**.

# Types of Proxies

Different proxy patterns came up to solve different(or incremental) problems related to gas cost efficiency, security and upgradability. Let's have a look at the different kinds of proxies out there.

## Minimal Proxy Pattern

### Problem Statement

How to repeatedly deploy the same contract with minimum gas cost? For example, if I have a wallet contract and for every user I want to deploy a new smart contract representing that particular user's wallet (with the same logic implementation), how do I do that in the most gas-efficient manner?

### Solution

Instead of sending the bytecode for the (repeated) contract over and over again to the blockchain for deployment, we create a `minimal contract` which simply references a `boilerplate` contract (the logic implementation contract) and redirects `calls` from the users to the `boilerplate` contract via `delegatecalls`.

#### Sequence for this pattern

(user) `call` ---> (in the minimal contract) fallback ---> (from minimal contract to implementation contract) delegatecall ---> (implementation contract invocation of) target Function() 

> Official reading material: [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167).

## Pre-Requisites

This section contains all concepts you must be aware of, to gain a comprehensive understanding of different proxy patterns.

### 1. `delegatecall`

## Resources Consulted

1. [Felix's EVM Expedition: Proxies, Beacons and Diamond Pattern](https://www.youtube.com/watch?v=iXLoSVcVhUg)