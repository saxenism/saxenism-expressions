---
toc: true
layout: post
description: Short code snippets showing how to use modern Solidity features, also including the conventional (old) methods of doing the same tasks
categories: [web3, solidity, modern-solidity, language-tricks]
title: Modern Solidity
---

## Code snippets depicting modern Solidity

```solidity
//SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

contract ModernSolidityFeatures {
    TestContract tcInstance = new TestContract();

    function modernFunctionSelector() public view returns(bytes4) {
        return tcInstance.square.selector;
    }
    
    function modernIsContract(address addr) public view returns(bool) {
        return (addr.code.length > 0 ? true : false);
    }

    function conventionalIsContract(address addr) public view returns(bool) {
        uint32 sizeOfAddressCodeSection;
        assembly {
            sizeOfAddressCodeSection := extcodesize(addr)
        }   
        return (sizeOfAddressCodeSection > 0);
    }

    function conventionalFunctionSelector(string memory functionSignature) public pure returns(bytes4) {
        return bytes4(keccak256(bytes(functionSignature)));
    }
}

contract TestContract {
    uint256 public number;

    function square(uint256 a) public pure returns(uint256) {
        return a*a;
    } 
}
```