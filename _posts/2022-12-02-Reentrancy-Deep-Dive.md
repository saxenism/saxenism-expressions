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

+ This is a standard for generating tokens in the Ethereum Blockchain.
+ This is backwards compatible with ERC20, which means, you can interact with these tokens as if they were ERC20, using the standard functions, while still getting all of the niceties, including send hooks.
+ Ether compliant interface in the sense that you can use the `send` function to transfer ERC777 tokens much like how you transfer Ether.
+ This standard introduces something called **hooks**, to counter the issues with ERC20.
    + A hook is simply a function in a contract that is called when tokens are sent to it, meaning accounts and contracts can react to receiving tokens.
    + The hooks are registered and discovered using the [ERC-1820 standard](https://eips.ethereum.org/EIPS/eip-1820).
    + Hooks allow sending tokens to a contract and notifying the contract in a single transaction, unlike ERC-20, which requires a double call (approve/transferFrom) to achieve this.
    + Hooks can reject transactions.
    + Token transfers to other contracts may revert with the following message: `ERC777: token recipient contract has no implementer for ERC777TokensRecipient`. This is good since this reflects that fact that whatever contract you were trying to send the tokens to, was not aware of the ERC777 standard and hence we can avoid tokens from being locked forever with this.
    + As an example, the Golem contract currently holds over 350k GNT tokens, worth multiple tens of thousands of dollars, and lacks methods to get them out of there. This has happened to virtually every ERC20-backed project, usually due to user error.
+ The token holder can “authorize” and “revoke” operators who can manage their tokens. These operators generally are going to be verified contracts like an exchange, a cheque processor or an automatic charging system.
+ Every token transaction contains a userData bytes field and a similar operatorData -- in case of an operator transaction -- to be used freely by the user (sender) and the operator respectively to pass data to the recipient.

#### Relevant Links

1. [Official EIP 777](https://eips.ethereum.org/EIPS/eip-777)
2. [In-depth Primer on ERC777](https://medium.com/coinmonks/erc-777-a-new-advanced-token-standard-c841788ab3cb)
3. [Discussions around the safety of this standard](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)

### The issue with ERC777 tokens

Everyone of us can agree that Bitcoin is *safer* than Ethereum, right? Well, yes, and that is because Bitcoin is much more limited in the scope of what is possible with it than Ethereum. The same is the case with ERC777. The standard in and of itself is not bad, rather one can argue that it's really cool. But since using this standard is non-trivial and the developer is required to pay attention to slightly more details than a normal ERC20 token, the surface area for this standard to get attacked also increases.

And one such attack vector led to our `imBTC Uniswap Pool Attack`.

In Uniswap's audit by Consensys, they explained in some detail how it will be possible to drain a pool using the ERC777 token standard if the token allowed re-entrancy on `transferFrom(address from, address to, uint tokens)` function by someone except the recipient.

The link to the detailed vulnerability report can be found [here](https://github.com/ConsenSys/Uniswap-audit-report-2018-12#31-liquidity-pool-can-be-stolen-in-some-tokens-eg-erc-777-29).
