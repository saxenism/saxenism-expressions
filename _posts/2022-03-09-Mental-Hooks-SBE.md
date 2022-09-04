
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


