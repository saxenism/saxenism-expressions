---
slug: functions-as-params
title: Solidity - Passing functions as parameters
authors:
  name: Rahul Saxena
  title: EVM Enjoyoor
  url: https://twitter.com/saxenism
  image_url: https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg
tags: [web3, language-tricks, intermediate, solidity]
---


## Function Types

For official documentations follow this [link](https://docs.soliditylang.org/en/v0.8.11/types.html#function-types).

So, in Solidity, you can pass functions themselves as parameters to other functions. These type of parameters are called function types.

These function types can be used to pass and return functions from function calls.

## Example

### 1. Format of function types is the following:

```solidity
function (<parameter types>) {internal | external} [pure | view | payable] [returns(<return types>)]
```

> Note : Function types can only be internal or external. Also, the `return types` cannot be empty if the function in question does not return anything, in this case, completely omit the `returns` keyword.

<!--truncate-->

### 2. Conversions

function `A` can be converted to function `B` if they identical parameter types, identical return types, identical internal/external propery, and state mutability of `A` is more restrictive than `B`.

Since `view` says that no state will be changed whereas `pure` says no state variable will be changed or read. Therefore, `pure` is more restrictive than `view`

Also, rememeber that all `non-payable` functions are `payable` (accepting 0 Ether), but no non-payable is payable. Therefore `non-payable` is more restrictive. 

So,
#### 2.1 `pure` can be converted to `view` and `non-payable`
#### 2.2 `view` can be converted to `non-payable`
#### 2.3 `non-payable` can be converted to `payable`

### 3. A short mock implementation of this concept

```solidity

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract FunctionParameter {

    uint256 public currentSupply = 100;

    function increaseSupply(uint256 _newSupply) public returns(uint256) {
        uint256 _currentSupply = currentSupply;
        _changeSupply(_currentSupply, _newSupply, _add);
        return currentSupply;
    }

    function decreaseSupply(uint256 _decreaseSupplyBy) public returns(uint256) {
        uint256 _currentSupply = currentSupply;
        _changeSupply(_currentSupply, _decreaseSupplyBy, _sub);
        return currentSupply;
    }

    function fundMe() external payable{}

////////////////////////
// Internal functions
////////////////////////

    function _changeSupply(uint256 a, uint256 b, function(uint256, uint256) internal pure returns(uint256) foo) internal returns(uint256) {
        currentSupply = foo(a, b);
        return currentSupply;
    }
    
    function _add(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a + b);
    }

    function _sub(uint256 a, uint256 b) internal pure returns(uint256) {
        return (a > b ? (a - b) : 0 );
    }
}

```

Similarly as this was done for `internal` function calls, you can use this concept for `external` function calls. 

> Note: One obvious but important thing to note here is that the internal functions can only be called inside the current contract (including library functions and inherited functions) because they cannot be executed outside of the context of the current contract.