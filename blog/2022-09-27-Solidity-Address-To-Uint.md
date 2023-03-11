---
slug: address-to-uint
title: Solidity - Typecasting Addresses to Uint
authors:
  name: Rahul Saxena
  title: EVM Enjoyoor
  url: https://twitter.com/saxenism
  image_url: https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg
tags: [web3, language-tricks, beginner, solidity]
---

## Convert address to uint and back

This conversion exploits the fact that addresses take up 20 bytes and so does a uint160 (20 * 8). 


```solidity

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// The theory behind this is that addresses take up 20 bytes in a word which is equivalent to (20*8) 160 bits and hence should be correctly casted to and from uint160.

contract AddressToUint {

    address public targetAddress;
    uint256 public targetUint;

    function convertAddressToUint(address _targetAddress) external returns(uint256) {
        targetAddress = _targetAddress;
        targetUint = uint256(uint160(_targetAddress));
        return targetUint;
    }

    function convertUintToAddress(uint256 _targetUint) external returns(address) {
        targetUint = _targetUint;
        targetAddress = address(uint160(_targetUint));
        return targetAddress;
    }

}

// 0xabD0127D996A468A79a0a8e88F4D419E40402e95
// 980877587572537262620952019491558306941665029781

```

<!--truncate-->