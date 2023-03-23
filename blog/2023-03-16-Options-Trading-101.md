---
slug: options-introduction
title: Options 101 - An introduction to derivatives and options trading
authors:
  name: Rahul Saxena
  title: EVM Enjoyoor
  url: https://twitter.com/saxenism
  image_url: https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg
tags: [defi, finance, derivatives, options, tradfi]
---

# Options Trading: 101

## Motivation

> Note: You can also watch a phenomenal [short video](https://www.youtube.com/watch?v=m3im-iJdhv4&ab_channel=MarketplaceAPM) as an introduction to derivaties. This is recommended for people who already have a bit of understanding in this regard.

**Derivative**: A financial contract, whose value depends on it's underlying assets. 

For example, an apple pie is a derivative of an apple as it is **derived** from the apple and the price of the apple pie is determined by the quality and quantity of the apples used to make it (among other things).

Similarly, the price of a financial contract that is derived from some underlying assets such as shares of stock is determined by the quality,quantity and current price of the underlying asset and is known as a derivative.

Derivative are of 4 types: 
+ Options
+ Futures
+ Swaps
+ Forwards

<!--truncate-->

And all the 4 types, especially futures and options, are closely linked. Therefore, if we even fully understand one instrument, we would be easily able to grasp all kinds of different derivative instruments.

Since, we are interested in learning about *Perps* which is the pre-dominant derivative instrument used in web3, we'll take up learning about options and then transition into learning about **perps** or **perpetual futures**.

## Introduction

All options contracts would have the following:
+ Expiration Date
    + Date after which the options contract is null and void
+ Strike Price
    + The agreed upon price for exercising the options contract
+ Contract Multiplier (quantity of the underlying assets)
    + You'll need $500 to buy an options contract with a price of $5.00 because options can be used to trade 100 shares of stock. So we need to multiply the price of option by 100 to get its actual value or premium

## Call Options

1. Call options prices move with the stock price, ie stock price increase, increases the price of the call option contract.
2. This is because a call option can be used by the owner to buy 100 shares of stock at the call option's strike price.
3. The potential upside of using a call option is limitless and the risk is limited, since my loss can be a maximum of the options premium (cost of buying the option contract).

> The price of a call option contract is determined by how valuable is the ability to *buy* a particular share of stock (underlying asset) at the given *discounted* price (strike price) for a long enough duration into the future (expiration date, so that the open-market value of the underlying asset can *rise* even more).

### Example

+ Today a house is worth $200_000
+ I want to buy this house, but instead I buy a call option contract to buy this house for $200_000 with an expiration of 2 years
+ I paid a options premium of $10_000 to acquire the above contract
+ Now there are two possibilities from here on:
    + After 1.5 years, the value of the house lowers down to $150_000. 
        + In this case, my options contract is wasted, since if I want to buy the house, I will buy it from the open market for $150k, instead of using my contract to buy it for $200k. 
        + My loss in this case is of $10_000 (my options premium)
    + After 1.5 years, the value of the house increases to $300_000.
        + In this case, my options contract becomes very valuable as it allows it's owner to buy a property worth $300_000 for $200_000.
        + Therefore, if I exercise my contract now, my profit would be ($ 300_000 - $200_000 - $10_000) $90_000.
        + My profit in this case was $90_000. But theoretically, there is no limit to what my profit could have been depending on how much the price of the property moved up.
+ Also, btw, the option contract multiplier in this case is 1.
+ Call options provide you leverage. For example, an increase of 3% in the stock price could increase the price of the call options by 15%.

![](https://i.imgur.com/oWAiGTO.jpg)

## Exercising Options

+ When you trade options, you will almost NEVER exercise an option.
+ However, an option's value comes from its ability to trade shares of stock at the strike price as opposed to the current stock price. 
+ Therefore, an option's price will **ALWAYS** include the benefit/profit that it can provide the owner if they were to exercise the option.
+ So, in reality instead of making profit by exercising your call option, you will make the profit by simply selling the call option at the increased price.
    + since the price of the option would **atleast** be equal to the benefit the owner would have if they decided to exercise the option.

## Put Options

1. Concepts are similar to Call options but inverted.
2. Put option prices move inversely to the stock prices, ie, put options prices increases as the stock price falls, and vice versa
3. This is because a put option contract allows the owner to *sell* 100 shares of stock at the put option's strike price. Therefore, this ability to sell stocks at a strike price becomes extremely valuable if the stock prices fall below the strike price and you can sell the shares for a price higher than the market price.
4. Just as was the case for call options, you have leverage in put option too, where a fall on 6.1% in a stock price could result in an increase of 81% in the put contract price.

> The price of a put option contract is determined by how valuable is the ability to *sell* a particular share of stock (underlying asset) at the given *inflated* price (strike price) for a long enough duration into the future (expiration date, so that the open-market value of the underlying asset can *fall* even more).

### Pricing of PUT Options

+ Incase of call options it was clear on how the pricing was done at the time of purchase. It was a minimum of (strikePrice - currentPrice) * noOfShares
+ However, incase of a put option, the strike price is lower than the current price, so this formula clearly would not work to determine the price of a put option.
+ For example a share could be trading at $130.71 currently and the put option to sell that share at the strike price of $130 would cost you $624 ($6.24 * 100). We need to figure out where this value of the put option contract is coming from.

## Buying Puts vs Shorting Stocks

### What is shorting?

+ While buying put options contract, gives you the ownership of a **contract** that gives you the right to **sell** a particular share of stock at a pre-determined price.
+ Short selling implies the literal *sale* of some shares of stock that the seller did not own in the first place and were borrowed from the lenders (usually brokers/market makers).
+ The golden case in case of *short selling* is that once you borrow some shares, you sell them at the same time and at a later time, you buy back the shares at reduced price to return your debt and make the spread as your profit.
+ It should now be clear that the potential downside risk in short selling is theoretically infinite as compared to the option premium in case of put option.

### Put options > Short Selling (interms of user safety)
+ Consider a case where NVDA shares are involved. 
    + If you shorted the stock at $280 and the stock went up to $320, then your loss would amount to $4000 ($40 * 100)
    + On the other hand if you bought put option contract on the NVDA share with a strike price of $280, then no matter how high the price of NVDA soars, your potential loss would only be capped at a maximum of the option premium price.
+ Therefore, buying puts of a stock is much safer than shorting the stock since in the case of shorting your downside risk is therotically infinite.

# Intrinsic and Extrinsic Value

These are the components of options price. An options price is made up of only 2 things.
    - Intrinsic Value
    - Extrinsic Value
    
## Intrinsic Value

+ **Intrinsic Value: ** For call options, the intrinsic value is extremely straightforward. The difference between the current market price of the underlying asset minus the lower price that I am allowed to sell it at due to my call option contract. 
+ Example: Consider the first scenario from the house example, where I bought a call option on the house for 2 years with a strike price of $200_000 and if after 1.5 years that cost of the house is at $300_000, then the **intrinsic value** of the contract is ($300_000 - $200_000) $100_000.
+ Similarly, for put contracts, if you have a contract to be able to sell the underlying asset at $130 when the market value of the underlying asset has gone down to $120, then that means that the put option contract at that point of time has an intrinsic value of $10 (into the contract multiplier number).


## Extrinsic Value

+ **Extrinsic Value: ** Actual cost of the options contract - intrinsic value. Yayy!! I am genius :)
+ This value is also sometimes referred to as the *time value* since it takes into account, the **potential** for the option to become **more valuable** (intrinsically valuable) before it reaches expiration.
+ Let's consider an example of TSLA stock to better understand the concept of different types of values.
    + TSLA Stock Price: $836.41
    + June 800 Call Price: $94.10
    + Intrinsic Value: $36.41 ($836.41 Stock Price - $800 Call Strike price)
    + Extrinsic/Time Value: $57.69 ($94.10 Options Price - $36.41 Intrinsic Value)
    + Time to Expiration: 38 Days
    + The current *real* value of this option is $36.41 because it can be used to buy shares $36.41 below the stock price.
    + But could that increase in the next 38 days? **Absolutely**.

+ Therefore, even if we see two options with the exact same strike prices, but with different expiration dates, the one with the farther expiration date will be trading for a much higher premium than the one with the closer expiration date.
+ Therefore, even for contracts with 0 intrinsic value currently, there can be significant total value due to the time left and potential for it to gain intrinsic value in that timeframe.

### Extrinsic Value Time Decay

+ Now that we understand how the time remaining into the expiration of an options contract determines it's extrinsic value and hence it's overall value. 
+ It will be quite clear to you now that if you buy a call options contract with lots of time left to expire and if the price do not move until the end of the contract's expiration date, you'll lose money even if the stock's value did not exactly go *against* of what you were betting.

## Important terms to understand

### 1. In-The-Money (ITM Options)

Any option that has intrinsic value.

### 2. Out-of-the-money (OTM Options)

Any option without intrinsic value.

### 3. At-the-money (ATM Options)

Any option with a strike price very close to the current stock price.

# Shorting Call Options

We don't always have to buy an option and we can actually bet against an options price.

+ We can bet against an options price and we make money when the options price decreases. This is called shorting options.
+ The below figure represents what it means to short stuff (a stock for example)
![](https://i.imgur.com/HS2z8cO.png)

> You sell *x* amount of stock first at a given price (by borrowing those stocks from someone else) and after a few days when the market price of the stock decrease, you buy *x* amount of those stock from the market at the discounted price and return the share to your lender. Your profit is the difference between the amount you receieved when *selling* the initial *x* shares and the amount spent when you purchased back the *x* amount of stocks.

+ Therefore, here you will *sell* an option (that you do not own) as an opening trade and your goal is to buy it back (preferably at a lower price) in the future to pay back your debt.
+ So, you can also make money with this strategy not only when the price drops but also when the price remains stagnant for a long time (extrinsic value time delay)
+ This is however an **incredibly risky strategy**, since if you short the price of a call option, and if the price of underlying stock increases, there is **no limit** to how much you can lose given that *options are leveraged* in the first place.

> Realisitcally speaking, since this strategy is so risky and volatile, you need to have a margin account set aside to undertake these kind of trades. This account basically maitains your cash balance as collateral to undertake these trades.

> And a margin call would be basically the market event where, the conditions are stacked so significantly against you that your lender deems you incapable of paying back their loan, so they take the relevant amount from your margin account.

+ Here's an image for an example where a trader shorts NETFLIX call options and incurs massive loss:

![](https://i.imgur.com/zG94Kjt.jpg)

+ What's interesting is that you can make money even if at the time of contract expiration, the stock price is higher than the strike price.
+ This is because, for you the break-even price is the sum of the `strike price` + `what you sold the contract for`. So, if the options price goes beyond the sum of these two, only then would you start incurring losses.
+ 
![](https://i.imgur.com/bPyeC0l.jpg)

# Shorting Put Options

+ Selling put options that you do not own (borrowed put options) as an opening trade and hoping to buy it back in the future for lesser amount of money.
+ Since, you are hoping for the put options price to decrease, you essentially want the underlying stock to rise in prices (which decreases the intrinsic value of the put options) and therefore this is a **BULLISH STRATEGY**.
+ Here is an example from ACTIVISION showing the same

![](https://i.imgur.com/UqkCaoH.jpg)


**WITH THIS, WE HAVE LEARNED THE 4 BASIC OPTIONS TRADE THAT MAKE UP ALL OPTIONS STRATEGIES**

### Summary

Buying Call Options => Bullish
Buying Put Options => Bearish
Shorting Call Options => Bearish
Shorting Put Options => Bullish

# Implied Volatility

+ Related to option pricing.
    + What implies the volatility? Option Prices. More specifically, the extrinsic value in the options relative to the time until they expire.
+ We have taken the first step to understand options pricing by understanding intrinsic and extrinsic values, now we need to look at implied volatility.
+ Two ATM options contracts with similar current stock prices, same strike price and same expiration date and can drastically different pricing of the options.
+ Here's an example:

![](https://i.imgur.com/iPxlJst.jpg)

+ This difference can be explained via implied volatility. The Teledoc options are trading with a higher implied volatility than Visa options. The markets expects much more price fluctuations in the Teladoc stock compared to the Visa stock.
+ But, why would the market thing that Teladoc share will have more price fluctuations (and therefore a larger profit potential with its call options) compared to Visa stocks?

![](https://i.imgur.com/g2v4FzU.jpg)

> The observed stock price changes over the last couple of months indicate that the Teladoc shares are atleast twice as volatile as the Visa shares.

+ When buying options you can make money from an increase in implied volatility, which literally means the option prices are increasing broadly (more extrinsic value in all options)
    + Suppose a good news about Visa came out late at night, the stock prices wouldn't change but the price of the call options would start shooting up relative to the time left for expiration as people start agressively buying the VISA call options since they are expecting a bigger volatility in the VISA stocks now.
    + Similary if a bad news would have come out, you would have list money.
+ When the implied volatility in a stock price is incredibly high, it is a good time to short those expensive options, as you can make money when the implied volatility of stock decreases over a few days. And you can do so without any change in the stock price.
    + However, one thing to keep in mind is that changes in options prices drive changes in implied volatility and not the other way around.

# Exercising and Assignment

+ 99% of the time you would not exercise your options, however if you do decide to exercise your option, say, a *put option*, a trader who had shorted a put option similar to your position will be *assigned* and they'll have to **buy** your shares at the strike price.
+ Any option with $0.01 or more of intrinsic value will be automatically exercised if held through expiration.
+ The reason you wouldn't want to exercise an option is that any extrinsic value that exists in an option will be lost when exercising it.
+ You should only consider trading options in markets that have deep options liqudity, ie, a shit ton of option trading activity is happening in that market everyday, because otherwise it will be like buying concert tickets to a band nobody wants to see. **What happens if you need to sell your tickets?** 

# Difference between Futures & Options Contract

## Similarity:

+ Both are derivatie contract of an asset.
+ An agreement between the buyer and seller at a predefined price and for a predefined time

## Difference

+ *Obligation: * Buyers are obliged to execute the contract in case of futures.
+ *Advance Payment: * No advance payment required in case of futures, but in case of options, premiums are paid.
+ *Risk: * In case of futures, the risk is high since there is unlimited profit or loss that can be made however options are comparatively safer since the downside is capped (you loose your premium) and the upside is uncapped.

Chainlink
OPStack
Optimism
Hubble