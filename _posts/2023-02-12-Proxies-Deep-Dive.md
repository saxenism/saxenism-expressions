---
toc: true
layout: post
description: The only resource you will ever need for all your proxy related queries.
categories: [defi, diamond, beacon, UUPS, web3, proxies, proxy, upgradable-contracts]
title: Smart Contract Proxies - A Deep Dive
---

# Introduction

For a primer on all things you **MUST** understand before going ahead with learning about proxies in depth, please navigate to the end of this article, find the section named **Pre-Requisites** and make sure you understand all concepts listed there.

I did a short article on proxies sometime back, but it was really basic and surface-level. If you want, you can read that [here](https://saxenism.com/web3/solidity/security/proxy/upgradation/2022/04/30/All-About-Proxies.html).

All proxy patterns are linked together by a distinct feature. It is the combination of **`delegatecall` along with the `fallback` function**.

# Types of Proxies

Different proxy patterns came up to solve different(or incremental) problems related to gas cost efficiency, security and upgradability. Let's have a look at the different kinds of proxies out there.

## Minimal Proxy Pattern

### Problem Statement

How to repeatedly deploy the same contract with minimum gas cost? For example, if I have a wallet contract and for every user I want to deploy a new smart contract representing that particular user's wallet (with the same logic implementation), how do I do that in the most gas-efficient manner?

### Solution

Instead of sending the bytecode for the (repeated) contract over and over again to the blockchain for deployment, we create a `minimal contract` which simply references a `boilerplate` contract (the logic implementation contract) and redirects `calls` from the users to the `boilerplate` contract via `delegatecalls`.

#### Sequence for this pattern

(user) `call` ---> (in the minimal contract) `fallback` ---> (from minimal contract to implementation contract) `delegatecall` ---> (implementation contract invocation of) target Function() 

> Official reading material: [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167).

# Pre-Requisites

This section contains all concepts you must be aware of, to gain a comprehensive understanding of different proxy patterns.

## 1. `delegatecall`

If a contract A calls a function in Contract B via `delegatecall`, then the function from contract B is executed with the context provided by contract A.

That means, only the function logic is borrowed from contract B, other things such as `address(this)`, `msg.sender` and `msg.value` do not change.

No change in the state variables of contract B is noticed. For example, let's consider the following code snippet.

```solidity

contract A {

    string internal tokenName = "FunToken";

    function changeTokenNameWithFunctionLogicFromContractB() external {
        address contractBAddress = 0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c; // Assume this is the address of the deployed contract B.
        (bool success, bytes memory returnData) = contractBAddress.delegatecall(abi.encodeWithSelector(contractB.setTokenName.selector, "BoringToken"));

        // This is one big logic block to get the reason of revert of the `delegatecall` since, the reason is not returned by default.
        if(success == false) {
            if(returnData.size > 0) {
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert("delegatecall reverted");
            }
        }
    }

    function getContractATokenName() external view returns(string memory) {
        return tokenName;
    }

}

contract B {
    string internal tokenName = "TokenB";

    function setTokenName(string calldata _newName) external {
        tokenName = _newName;
    }

    function getContractBTokenName() external view returns(string memory) {
        return tokenName;
    }
}

```

Here, when you call the function `changeTokenNameWithFunctionLogicFromContractB`, the value of the `tokenName` variable in contract A changes to `BoringToken` while the `tokenName` variable of contract B remains `TokenB`.

This is the usecase and power of `delegatecall`.

### 1. Do not `delegatecall` to an untrusted contract

If the contract that you `delegatecall` to, executes `selfdestruct`, then your contract itself gets completely deleted from the blockchain. This is less than ideal in most cases. 

Here's an example:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OneWhoDelegates {

    address public oneWhoIsDelegatedTo;

    constructor(address _attacker) {
        oneWhoIsDelegatedTo = _attacker;
    }

    function getBTCPriceFromOracle() external returns(bytes memory) {
        (bool success, bytes memory returnData) = oneWhoIsDelegatedTo.delegatecall(
            abi.encodeWithSelector(OneWhoIsDelegatedTo.fetchBTCPriceLatest.selector)
        );

        if(success) {
            return returnData;
        } else {
            return bytes("");
        }
    }

    function giveMeSomeEther() external payable {} // This function is used to make 
                        // sure that this contract has some Ether in the first place
}

contract OneWhoIsDelegatedTo {

    address public oracleContract;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // This function was hidden away in some distinct file
    function _fetchBTCPriceLatest() private {
        selfdestruct(payable(oracleContract));
    }

    function fetchBTCPriceLatest() external {
        _fetchBTCPriceLatest();
    }
}
```

In the above contract, if the contract `OneWhoDelegates` calls `getBTCPriceFromOracle`, then the contract `OneWhoDelegates` would be deleted from the blockchain and the ether inside of that contract would be transferred to the contract `OneWhoIsDelegatedTo`.

So, make sure all your `delegatecalls` are to trusted contracts and be extra careful incase those contracts that you are delegating to, are upgradable.

### 2. Use `delegatecall` only on contracts

Since `delegatecall` is a low level call, it will always return `true` if the call(`delegatecall`) is made to a contract/function that does not exist. Therefore, we must always make sure that the address that we are using `delegatecall` on must be contract.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OneWhoDelegates {
    address public deployerEOA;
    bool internal _fundsWithdrawable = false;

    constructor() {
        deployerEOA = msg.sender;
    }

    function checkIfFundsAreWithdrawable() external returns(bool) {
        address priceOracleContractAddress = deployerEOA; // This was done due to some misunderstanding
        (bool success, ) = priceOracleContractAddress.delegatecall(abi.encodeWithSelector(OneWhoIsDelegatedTo.isFundWithdrawable.selector));
        _fundsWithdrawable = success;
        return _fundsWithdrawable;
    }

}

contract OneWhoIsDelegatedTo {
    function isFundWithdrawable() external view returns(bool) {
        if(block.timestamp % 5 == 0) {
            return true;
        } else {
            return false;
        }
    }
}
```

In this contract, there is simply no way that `_fundsWithdrawable` can remain `false` if `checkIfFundsAreWithdrawable` even once since it will always return `true` and set `_fundsWithdrawable` to true.

We can always use the following code snippet to check if a given address is indeed a contract with some code.

```solidity
    function checkIfFundsAreWithdrawable() external returns(bool) {
        address priceOracleContractAddress = deployerEOA; // This was done due to some misunderstanding
        if(isContract(priceOracleContractAddress)) {
            (bool success, ) = priceOracleContractAddress.delegatecall(abi.encodeWithSelector(OneWhoIsDelegatedTo.isFundWithdrawable.selector));
            _fundsWithdrawable = success;
            return _fundsWithdrawable;
        } else {
            revert("Price Oracle contract address not set correctly");
        }
    }

    function isContract(address contractAddress) public view returns(bool) {
        uint256 contractSize;
        assembly {
            contractSize := extcodesize(contractAddress)
        }
        return (contractSize > 0);
    }
```

### 3. Managing State Variable Layout

Since contractB is called in the context of contractA, therefore both of these contracts must have the same state variable layout, implying, that the same state variables are declared in the same order in both contracts.

For example, consider the following code snippet:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OneWhoDelegates {

    address public oneWhoIsDelegatedTo;

    constructor(address _attacker) {
        oneWhoIsDelegatedTo = _attacker;
    }

    function getBTCPriceFromOracle() external returns(bytes memory) {
        (bool success, bytes memory returnData) = oneWhoIsDelegatedTo.delegatecall(
            abi.encodeWithSelector(OneWhoIsDelegatedTo.fetchBTCPriceLatest.selector)
        );

        if(success) {
            return returnData;
        } else {
            return bytes("");
        }
    }

    function giveMeSomeEther() external payable {} // This function is used to make 
                        // sure that this contract has some Ether in the first place
}

contract OneWhoIsDelegatedTo {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // This function was hidden away in some distinct file
    function _fetchBTCPriceLatest() private {
        selfdestruct(payable(owner));
    }

    function fetchBTCPriceLatest() external {
        _fetchBTCPriceLatest();
    }
}
```

Here in this code snippet, once `selfdestruct` is called via `fetchBTCPriceLatest()`, the stored ether in contract `OneWhoDelegates` should have gone to the address `_owner` as mentioned in the parameter of `selfdestruct`. However, if you run this code, you will notice that the Ether from contract `OneWhoDelegates` is transferred to the contract `OneWhoIsDelegatedTo`. This is because, at the place the `_owner` address is declared in contract `OneWhoIsDelegatedTo`, in the contract `OneWhoDelegates` at the same place the contract address of `OneWhoIsDelegatedTo` is stored and since `deleagatecall` ran `selfdestruct` in the context of `OneWhoDelegates`, the Ether was transferred to the address `oneWhoIsDelegatedTo` instead of address `_owner`.

Now, let's see a few ways in which we manage the **State Variable Layout** :

#### 3.1 Inherited Storage

All contracts who indulge in this `delegatecall` circus, inherit their state variables from a central `storage` contract which declares all the state variables used in all the contracts.

Limitations: 
1. Local variable/function names can overshadow pre-existing storage variable names from the parent contract.
2. Reduces the composabilty of all contracts inheriting from the main contract. (Composability => Ability to work with other smart contracts)

#### 3.2 Diamond Storage

# Resources Consulted

1. [Felix's EVM Expedition: Proxies, Beacons and Diamond Pattern](https://www.youtube.com/watch?v=iXLoSVcVhUg)
2. [Nick Mudge's Substack: Understanding delegatecall And How to Use It Safely](https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how)