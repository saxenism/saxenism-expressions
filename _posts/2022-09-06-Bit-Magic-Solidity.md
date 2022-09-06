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

---

70 = 1000110

69 = 1000101

---

420 = 110100100

419 = 110100011


----

So, now if you created a number of N bits with all 1's, and did an & with the number x in question, you will get the value of the last N bits.

```solidity 

function getLastNBits(uint x, uint n) external pure returns(uint256) {
    uint mask = (1 << n) - 1;
    return x & mask;
}

```

## Most significant bit position

Keep on right-shifting the number until it all becomes 0. Count the number of times, you had to do this operations. That's all.

```solidity

function mostSignificantBit(uint256 x) public pure returns(uint256) {
    uint i;
    while((x >>= 1) > 0) { 
        ++i;
    }
    return i;
}

```

## Get first N bits

Same concept as the function `getLastNBits` we discussed above.

The only change here would be in the mask where we shift n number of 1's to the beginning of the mask and keep the rest as 0's.

Another tip would be, if length is not available, then use the function `mostSignificantBit` we discussed before.

```solidity

function getFirstNBits(uint x, uint n, uint len) public pure returns(uint256) {
    uint mask = ((1 << n) - 1) << (len - n);
    return x & mask;
}

```

## Is Power of 2

If x is a power of 2, then x will have only 1 set bit, rest all will be 0's. And then for (x-1) all bits will be set apart from the earlier leading 1. Therefore, if x would be a power of 2, then x&(x-1) will always give 0 as the result.

```solidity

function isPowerOfTwo(uint x) external pure returns(bool) {
        if(x == 0) return true;

        return (x & (x-1) == 0);
    }
    
```