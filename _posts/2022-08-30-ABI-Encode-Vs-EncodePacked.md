---
toc: true
layout: post
description: Quick guide about abi.encode vs abi.encodePacked and a few others
categories: [web3, solidity, hashing, keccak256, abi]
title: ABI Encode - Solidity
---

# Different types of abi encode

Let us see today when and why do we use `abi.encode` vs `abi.encodePacked`.

## What is a hash function?

A hash function has the following characterisitics:

+ A function that takes in arbitrary size input and outputs a data of fixed size
+ Properties:
    + Deterministic
        + hash(x) = h, every time without fail
    + quick to compute the hash
    + irreversible
        + given h, (really)hard to find x such that hash(x) = h
    + small change in input changes the output significantly
        + hard to find x, y such that hash(x) = hash(y)

## String Encoding

The solidity built-in function `abi.encode` enables to encode any Solidity types into raw bytes, that can be interpreted directly by the EVM.

Note that multiple arguments can be given to this function.

So, if we do something like:
`abi.encode("Solidity");`

We get the result in the following format:

+ 1st (32 bytes) word = offset → indicates at which bytes index the string starts. Here 0x20 (in hex) = 32 (in decimals). If you count 32 from the beginning (= index 32), you will reach the starting point of where the actual encoded string starts.

+ 2nd (32 bytes) word = string length → in the case of the string, this indicates how many characters (including whitespaces) are included in the string. So simply the “string.length “

+ 3rd (32 bytes) word = the actual utf8 encoded string → each individual bytes corresponds to hex notation of a letter / character encoded in utf8. If you search each individual bytes from 536f6c6964697479 inside an utf8 table, you will be able to decode the string. For instance, 53 corresponds to uppercase S , 6f corresponds to lowercase o , 6c corresponds to lowercase l , etc…

The actual encoded bytes would look something like this:

```
{
	"0": "bytes: 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000008536f6c6964697479000000000000000000000000000000000000000000000000"
}
```

The contract code was as straightforward as it gets:

```
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

contract StringEncoding {
    bytes public encodedString = abi.encode("Solidity");
}
```

## Few other ABI Encodings

+ address payable -> address
+ contract -> address
+ enum -> uint8
+ struct -> tuple of elementry types

## Few points on abi.encode, abi.encodePacked, abi.encodeWithSelector, abi.encodeWithSignature

+ When using `abi.encode`, all elementary types are padded to 32 bytes and dynamic arrays include their length.
    + Therefore, it is also possible to decode the resulting hash using `abi.decode` if the data type is known.
    + This encoding is done using the ABI specs.
+ When using `abi.encodePacked` only the minimum possible memory is utilised. 
    + Therefore, if you were hashing an address with this function, it will only take up 20 bytes and the rest of the word remains unpadded.
    + For dynamic types, the offset and the length is not stored. 
    ```
    abi.encodePacked("Solidity");
    // returns -> 0x536f6c6964697479
    ```

+ Since `abi.encodePacked` is non-standard hashing and uses the least amount of memory, it is usually gas-efficient

+ If you are making calls to an (external) contract, you'll more likely be using `abi.encode` (because it uses the ABI specs) and when you simply want to save some space and *not* call a contract, you'll be using `abi.encodePacked`.

+ If you are dealing with more than one dynamic data types, use `abi.encode` as it prevents collision.

+ Whereas, in multiple dynamic data types there is a good chance of collision happening if used with `abi.encodePacked`

+ `abi.encodeWithSignature` is the same as `abi.encode` but the function selector is used as the first parameter. Use when the signature is known and don't want to calculate the selector.

+ `abi.encodeWithSelector`, almost same as `abi.encodeWithSignature` but first param is selector.

Code Examples of the above encode options:

```solidity

// Case 1
(success, ) = address(c).call(abi.encodeWithSignature("myfunction(uint256,uint256)", 400,500));

// Case 2
(success, ) = address(c).call(abi.encodeWithSelector(bytes4(keccak256("myfunction(uint256,uint256)")), 400,500));

// Case 3
contract_instance.myfunction(400,500);

```

+ Case 3 is more expensive but safer than the other cases.
> This is because, the EVM considers a call to a non-existing contract to always succeed. Therefore, Solidity includes an extra check using the `extcodesize` opcode when performing external calls.
This ensures that the contract that is about to be called either actually exists (contains code) or an exception is raised.

> Low level calls (which operate on address rather than a contract instance) ignore this check and therefore become gas efficient but less safe. Eg. `call`, `transfer`, `delegatecall`, `staticcall`, `send`.

+ A very important point to note is:
If a function exists such that:
```
function foo(uint256 _a, address _b) {
    // do something
}
```

Then, the function selector for this particular function would be:

```
bytes4(keccak256(bytes('foo(uint256,address)'))); // This is correct

bytes4(keccak256(bytes('foo(uint256, address)'))); // This would be incorrect, because of the space between the two param types

bytes4(keccak256(bytes('foo(uint,address)'))); // Again incorrect, because we cannot use the alias of uint, we have to use the entire uint256
```

+ A more comprehensive example from *solidity-by-example*

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Receiver {
    event Received(address caller, uint amount, string message);

    fallback() external payable {
        emit Received(msg.sender, msg.value, "Fallback was called");
    }

    function foo(string memory _message, uint _x) public payable returns (uint) {
        emit Received(msg.sender, msg.value, _message);

        return _x + 1;
    }
}

contract Caller {
    event Response(bool success, bytes data);

    // Let's imagine that contract B does not have the source code for
    // contract A, but we do know the address of A and the function to call.
    function testCallFoo(address payable _addr) public payable {
        // You can send ether and specify a custom gas amount
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(
            abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
        );

        emit Response(success, data);
    }

    // Calling a function that does not exist triggers the fallback function.
    function testCallDoesNotExist(address _addr) public {
        (bool success, bytes memory data) = _addr.call(
            abi.encodeWithSignature("doesNotExist()")
        );

        emit Response(success, data);
    }
}

```

