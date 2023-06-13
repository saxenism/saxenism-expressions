# DeFi Dictionary

Here is a collection of finance terms and concepts I come across while auditing several codebases. Collecting them all here for easy access for myself in the future and possibly helping out other developers in the community.

## B

### BorrowIndex

Formally defined as *accumulator of the total earned interest rate since the opening of the market.*

Small primer on different treatments of interests:

#### Earned Interest

Earned interest is the rate at which an investment earns value on top of principal. Usually, earned interest is expressed as either a total dollar amount, or as a percentage of your total portfolio or investment. 

For example, if you have an investment valued at $40,000, and you earn $4,000 in interest over the course of the twelve months, that year your total investment value will have grown to $44,000. This represents earned interest of $4,000, or 10 percent.

#### Accrued Interest

Accrued interest is the amount of interest your investment is currently earning, but that you haven’t yet collected. If you have a savings account, there’s an interest rate that’s associated with your account balance. Generally, the interest is only added on a monthly or quarterly basis, but the interest technically is accruing every day, even if you can’t access the growth until the end of the period. 

You can factor how much you’ll be earning on your money because you know the interest rate. But you cannot necessarily spend it until the period ends and the interest is actually added to your account. Accrued interest is also commonly referred to as interest balance.

## T

### TotalBorrows

The total amount of base tokens that are currently borrowed from the protocol plus interest accrued to all borrows. 

Formally defined as total amount of outstanding borrows of the underlying in this market.

> What I think this means: sum of amount of all borrowings of the borrow token (that are not yet paid) which includes the tokens themselves plus the interest accrued on them.

### TotalReserves

Total amount of reserves of the underlying held in this market. 

In some cases, not all the amount that is repaid by the borrower is distributed to the lenders, a part of it is collected and kept separately as the reserve. This is done so that in case of price of collateral shooting down so hard that even the collateral is not sufficient to repay the lenderes, then the reserve can be used to further repay the lenders.

Important to note that if a reserve percentage exists, it essentially eats into the potentially higher supply APY of the suppliers/lenders.

## L

### LTV (Loan To Value)

1. LTV stands for Loan-To-Value ratio.
2. Lenders assess the LTV ratio to determine the level of exposure to risk they take on when underwriting a mortgage.
3. Example:
    a. Suppose you buy a home with a market value of $100_000
    b. However, the owner agrees to sell it to you at $90_000.
    c. If you make a down payment of $10_000, then you'll have to take a loan of $80_000
    d. In this case, your LTV ratio is 80_000/100_000 = 80%
    e. If you instead made a down payment of $15_000, then you'll have to take a loan of $75_000
    f. In that case, your LTV ratio is 75_000/100_000 = 75%.
4. Therefore from a lender's perspective, the lower the LTV ratio the safer the lending is for them.