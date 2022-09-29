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
        return (x == 0 || x & (x-1) == 0);
    }

```

## Count number of set bits

As explained in the previous algorithm, the relationship between the bits of x and x-1. So as in x-1, the rightmost 1 and bits right to it are flipped, then by performing x&(x-1), and storing it in x, will reduce x to a number containing number of ones(in its binary form) less than the previous state of x, thus increasing the value of count in each iteration.

```solidity

function countSetBits(uint x) public pure returns(uint) {
    uint count;
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
        return ((packedBool >> position) & 1 > 0);
    }

    function findNthBool2(uint256 position) public view returns(bool) {
        return ((packedBool >> position) & 1 == 1);
    }

    function findNthBool3(uint256 position) public view returns(bool) {
        return ((packedBool >> position) & 1 != 0);
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

# Extreme Basics - Part 1

The XOR operator (^) returns 0 for same bits and 1 for different bits.


Truth Table:
| x1 | x2 | x1 ^ x2 |
| -- | -- | ------- |
| 0  | 0  | 0       |
| 0  | 1  | 1       |
| 1  | 0  | 1       |
| 1  | 1  | 0       |


## Detect if two numbers have opposite signs

Since we know that the leftmost bit for a positive integer is 0 and for negative is 1.
Therefore, with the xor of the leftmost bits, if we get 1, the signs were different.
Also, if we get x^y as 1 for the leftmost bit, it would mean that it's a negative number and therefore less than 0

```solidity

    function oppositeSigns(int x, int y) external pure returns (bool) {
        return (x ^ y < 0);
    }

```

## Detect if number is even or odd

For a number to be even, the last bit (2^0) should not be set and similarly for odd numbers the last bit is set. So, simply check what's the last bit of the number.

```solidity

    function isEven(uint x) external pure returns(bool) {
        return (x & 1 == 0);
    }

```

## Add 1 to an integer

```solidity

    /*
        Since we know that negative numbers are stored as 2's complement in Solidity (and other programming languages), we can use that fact to add 1 to a number (integer)
        2's complement is 1's complement plus 1 and 1's complement is simply inverting all bits of the given number
        Therefore, by reverse engineering, if we did -(~x) we should get x + 1, right?
    */
    function add1ToInt(int x) external pure returns(int) {
        return -(~x);
    }

```

## Swap Two Numbers

Alright agreed that this is a bit of an overkill, since Solidity natively provides a cool way to swap values of two numbers, but I'm autistic and let's just go with the flow :P

Also, the native method to swap two values is ofc more gas efficient.

```solidity

    uint public a = 5;
    uint public b = 10;

    function swapTwoNumbers() external {
        (a, b) = (b, a);
    }

    function swapTwoNumbersBitManipulation() external {
        a = a ^ b;
        b = b ^ a;
        a = a ^ b;
    }

```

## Turn off n'th bit in a number

```solidity

    /*
        What we want to accomplish here is a bitwise & of the nth bit with 0 so that it becomes 0 and since we do not want to disturb the 
        other bits of the number x, we do a bitwise & of bits of number x with all 1's.
    */

    function turnOffNthBit(uint x, uint n) external pure returns(uint) {
        return x & ~(1 << n);
    }

```

## Turn on Nth bit in a number

```solidity
    
    /*
    Similar to the last function, here since we want to turn ON a bit, we will do a bitwise OR of the nth bit with 1 and for the rest of the bits, we'll do a bitwise OR with 0, so that they do not get disturbed.
    */

    function turnOnNthBit(uint x, uint n) external pure returns(uint) {
        return x | (1 << n);
    }

```

## Check if the nth bit is set for a number

```solidity

    function checkNthBit(uint x, uint n) external pure returns(bool) {
        return x & (1 << n) != 0;
    }

```

## Toggle nth bit

```solidity

    // We'll use the fact that: 0 ^ 1 = 1 and 1 ^ 1 = 0

    function toggleNthBit(uint x, uint n) external pure returns (uint) {
        return x ^ (1 << n);
    }

```

## Unset the rightmost set bit in a number

```solidity

    // We'll use the property of n and n-1 here again.

    function unsetRightmostBit(uint x) external pure returns(uint) {
        return x & (x-1);
    }

```

## Find position of rightmost set bit

The idea here would be to first do n & (n - 1) and then do a xor of the resultant with the original number n. After this the only set bit in the number would be the rightmost one.

The latter part of the logic can also be used to **determine the position of the only set bit** in a number.

```solidity

    function findPositionOfRightmostSetBit(uint n) external pure returns(uint count) {
        uint num = n ^ (n & (n-1));
        while (num != 0) {
            num >>= 1;
            ++count;
        }
    }

    function findPositionOfRightmostSetBit_Negation (int n) external pure returns(uint count) {
        if(n & 1 == 1) {
            return 1; // Number is odd
        }
        int num = n & -n;
        while(num != 0) {
            num >>= 1;
            ++count;
        }
    }

```

# Puzzles (Incorporating multiple tricks)

## Find number of bits to be flipped to change one number to another

The idea here is to xor the two numbers. This will result in a number whose bit representation will only have set bits where the bits were different in the input numbers.

After that the problem is reduced to simply counting the set bits.

```solidity

    function bitsToFlip(uint x, uint y) external pure returns (uint counter) {
        uint xoredNumber = x ^ y;
        while(xoredNumber != 0) {
            xoredNumber = xoredNumber & (xoredNumber - 1);
            ++counter;
        }
    }
 
```

## Calculate xor from 1 to N

Given a number N, calculate the value of xoring all number from 1 to N.

```solidity

    // This is the naive method to calculate the xor from 1 to N.

    function calculateXorToN(uint N) external pure returns (uint result) {
        for(uint i = 1; i <= N; ) {
            result ^= i;
            unchecked {
                ++i;
            }
        }
    }

    /*
    There isn't some big brain math happening behind (hopefully). This is just observed as a pattern that repeats and hence we use the deductions from observing that pattern while calculating xor from 1 to N. And ofc this function is also much more gas efficient
    */
    function calculateXorToNEfficient(uint N) external pure returns (uint result) {
        uint moduloN = N%4;
        if(moduloN == 0) {
            result = N;
        } else if(moduloN == 1) {
            result = 1;
        } else if(moduloN == 2) {
            result = N + 1;
        } else {
            result = 0;
        }
    }

```

## Equal Sum and XOR

Given a positive integer N, find all `i` such that N+i == N^i, where 0 <= i <= N

```solidity

    function findSumEqualToXor(uint n) external pure returns (uint counter) {
        for(uint i; i <= n; ) {
            if((n^i) == (n+i)) {
                unchecked {
                    ++counter;
                }
            }
            unchecked {
                ++i;
            }
        }
    }

    // This function is made possible because of the formula:
    // (n + i) = (n ^ i) + 2*(n & i)
    // So, according to the requirement we only need to find all instances where n & i == 0
    // To do that we find all unset bits of n and find number of possible combinations (which is 2 raised to the power no of unset bits)
    function findSumEqualToXorEfficient(uint n) external pure returns (uint counter) {
        uint unsetBits;
        while(n != 0) {
            if(n & 1 == 0) {
                ++unsetBits;
            }
            n >>= 1;
        }
        counter = (1 << unsetBits);
    }

```

> Takeaway: Remember this formula if you can -> (n+i) = (n^i) + 2*(n&i)

## Get the most significant bit position in a given number

```solidity

    function findMSB(uint256 n) external pure returns (uint) {
        // Since this is uint256, this will have 256 bits. So we will have to take appropriate number of steps.
        // The number of ORs we do would be based on the bits present in number n.

        n = n | (n >> 1); // Now starting 2 bits are set in n
        n = n | (n >> 2); // Now starting 4 bits are set in n
        n = n | (n >> 4); // Now starting 8 bits are set in n
        n = n | (n >> 8); // Now starting 16 bits are set in n
        n = n | (n >> 16); // Now starting 32 bits are set in n
        n = n | (n >> 32); // Now starting 64 bits are set in n
        n = n | (n >> 64); // Now starting 128 bits are set in n
        n = n | (n >> 128); // Now starting 256 bits are set in n

        n += 1; // Now it's 1 set bit (higher than the original MSB) and rest are 0s

        return (n >> 1);
    }

```

# Advanced problems solved via bit manipulations