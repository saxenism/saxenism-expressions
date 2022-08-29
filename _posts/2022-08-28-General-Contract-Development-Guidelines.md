---
toc: true
layout: post
description: Best practices of smart contract development for the EVM chains, focussed on Solidity.
categories: [markdown, smart-contract, solidity, security, development, best-practices]
title: Smart Contract Development - Best Practices
---

# General Contract Development Guidelines (Best Practices)

Smart contract programming requires a different engineering mindset than what you may be used to.

The cost of failure is high and changes can be difficult, making it in some ways similar to hardware programming or financial services programming rather than web or mobile app development.

It is therefore not enough to defend against known vulnerabilities. Instead you will need to learn a new philosophy of development.

## Prepare for Failure

+ Place circuit breakers
+ Manage money at risk (rate limiting, maximum usage,etc)
+ Effective mechanism for proxy upgrades

## Stay up to Date

+ Check your contracts for any new bug as soon as it is discovered
+ Keep on upgrading all tools and libraries
+ Adopt new security techniques that emerge (and seem useful)

## Keep it simple

+ Keep contract logic simple. Modularize code. Use already written code, use as many lego blocks as you can, before writing custom logic
+ Clarity over performance (Debatable)
    > For example one could argue that the OpenSea Seaport contract is so damned performant that it affects the auditability of the contracts. But realise the fact that the Seaport contract will be deployed on the Ethereum mainnet and will be used to mint hundereds of thousands of NFTs, saving the users **millions of dollars** over the course of time.

    > So, based on the nature of your contract, do have healthy, sane discussions on whether you will place 
    more impetus on performance or clarity.

+ Roll out in phases. Have a bug bounty in place, test your code-base thoroughly and immediately add relevant tests to your codebase as soon as a new attack is discovered.

## Blockchain Properties

+ Randomness can be gamified.
+ Timestamps are imprecise. Miners can influence the time of execution of a txn within a margin of several seconds
+ Beware of external calls. Private data is not actually private and public functions can be called by anyone in any order.
+ Prefer reusing contract code only when you have proven previously-deployed contracts which you own. Otherwise go for duplication of code.
    > Efforts such as OpenZeppelin's Solidity Library seek to provide patterns such that secure code can be re-used without duplication

# Development best practices:

## External Calls

+ External calls are very risky. 
    + Try and avoid doing that, prefer duplicating code over using a call to an external contract. 
    + And when you absolutely have to do that, make sure that the contract is owned/maintained/managed by a trusted party. 
    + Always mark your function making external calls as unsafe via comments and naming convention
    + Avoid making state changes after the external call. The usual *re-entrancy attack* and following the *check-effects-interactions* pattern circus.

+ Prefer `call` over `transfer` and `send`.
    + `transfer` and `send` forward exactly 2300 gas to the recipient. This was done to limit the `reentrancy vulnerability`. 
        + However, post the Instanbul hard fork, the cost of `SLOAD` operation was increased and it made it quite possible that 2300 gas might not be enough for the contract to carry out the logic in its fallback function
        + But with the same fact, we also have a benefit here that, these methods can act as a filter to ensure that only EOA's can call the withdraw function instead of contracts.
        + Therefore, it is a matter of design choice rather than a *best practice* in this case. 
    + A disadvantage of using `call` is that it does nothing to mitigate the `reentrancy attack` and that attack has to be handled separately.

+ For low-level call methods(call, callcode, delegatecall), always handle the case of your call failing by checking the return value.

Example:

```solidity
someAddress.call.value(100)(bytes(sha3("deposit()")));
// If deposit throws an exception, the raw call() will only return false and transaction will NOT be reverted
```

+ Avoid combining multiple ether transfers in a single transaction.
Favor pull over push for external calls.

+ `delegatecall` is made by the caller contract to a callee as if the callee was the same contract. Therefore, we must remain vigilant with `delegatecall` as it can modify the state of the caller contract.

Example:

```solidity

contract OneBeingCalled {
    function doSomeGoodWork() external {
        selfdestruct(0);
    }
}

contract OneWhoCalled {
    function outsourceSomeGoodWork(address _callee) public {
        _callee.delegatecall(bytes4(keccak256("doSomeGoodWork()")));
    }
}

```

## Force Feeding Ether

+ Do not rely on `address(this).balance` for your contract logic because it is possible to force send Ether to any contract.

+ The contract can implement a fallback function that does a revert, but it will not be able to stop these three method of force sending Ether:
    + Attacker creates a contract, funds it and calls `selfdestruct(victimAddress)`
    + Attacker is a miner, wins some block reward and redirects the award to your address
    + Attacker pre-computes your contract address and sends some Ether to it even before the victim contract is deployed.

## Public on-chain Data

+ Applications like **On Chain Rock-Paper-Scissors** require submitted data (player's move) to be private until some point in time in order to work.

+ The best strategy to use here is to use *commitment scheme* with separate phases: commit phase and then the reveal phase.

+ Also, don't implement your own random number generator. Ethereum is a deterministic protocol, so no variable within this protocol can be used as an unpredictable random number.
> Miners can influence the `block.blockhash() value`
