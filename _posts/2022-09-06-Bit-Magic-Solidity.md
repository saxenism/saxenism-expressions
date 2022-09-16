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

## Count number of set bits

As explained in the previous algorithm, the relationship between the bits of x and x-1. So as in x-1, the rightmost 1 and bits right to it are flipped, then by performing x&(x-1), and storing it in x, will reduce x to a number containing number of ones(in its binary form) less than the previous state of x, thus increasing the value of count in each iteration.

```solidity

function countSetBits(uint x) public pure returns(uint) {
    uint count = 0;
    while (x != 0) {
        x = x & (x-1);
        ++count;
    }
    return count;
}

```

## Pack a number of bools into a single slot (inside uint256)

As you may know the most expensive operation in Ethereum is storing data (SSTORE). So you should always look for ways to reduce the storage requirements.

Don't need to explain much. Code is enough.

```solidity

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract BitManipulations {
    bool[33] public arr = [true, false, true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false,true, false, false];
    /*
    0: true     
    1: false
    2: true
    3: false
    4: true
    5: false
    6: true
    7: false
    8: true
    9: false
    10: true
    11: false
    12: true
    13: false
    14: true
    .
    .
    .
    */
    uint256 public packedBool;

    function findNthBool(uint256 position) public view returns(bool) {
        return (true ? ((packedBool >> position) & 1) > 0 : false);
    }

    function findNthBool2(uint256 position) public view returns(bool) {
        return (true ? ((packedBool >> position) & 1) == 1 : false);
    }

    function findNthBool3(uint256 position) public view returns(bool) {
        return (true ? ((packedBool >> position) & 1) != 0 : false);
    }

    function packBool() external {
        uint256 length = arr.length;
    
        for(uint i; i < length; ) {
            setNthBool(i, arr[i]);
            unchecked {
                ++i;
            }
        }
    }

    function setNthBool(uint256 _position, bool _value) internal {
        if(_value) {
            packedBool |= (1 << _position);
        } else {
            packedBool &=  ~ (1 << _position);
        }
    }
}

```