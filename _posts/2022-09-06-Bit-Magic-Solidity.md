---
toc: true
layout: post
description: See the wonders that are possible with the manipulation of bits and save some gas as a by-product
categories: [web3, solidity, language-tricks, bit-magic, intermediate]
title: Solidity - Bit Magic
---

# Bit Magic

## Bitwise Operations

Includes all basic bitwise operations such as `and`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight` etc.

```solidity

uint x;
uint y;

x & y // and
x | y // or
x ^ y // xor
~x    // not
x << y // shift x by y bits to the left
x >> y // shift x by y bits to the right

```

## Get Last N bits

Binary representation of (x-1) can be obtained by simply flipping all the bits to the right of the rightmost 1 in x and also including the rightmost 1.

Example (Confirm using [this website](https://www.rapidtables.com/convert/number/decimal-to-binary.html) if you want)

7 = 0111
6 = 0110

70 = 1000110
69 = 1000101

420 = 110100100
419 = 110100011

So, now if you created a number of N bits with all 1's, and did an & with the number x in question, you will get the value of the last N bits.

```solidity 

function getLastNBits(uint x, uint n) external pure returns(uint256) {
    uint mask = (1 << n) - 1;
    return x & mask;
}

```

## Most significant bit position

```solidity

function mostSignificantBit(uint256 x) public pure returns(uint256) {
    uint i;
    while((x >>= 1) > 0) { 
        ++i;
    }
    return i;
}

```

## Get Last N significant bits