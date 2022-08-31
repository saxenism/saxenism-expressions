---
toc: true
layout: post
description: Thoughts on what it would take to make web3 a mass movement and my understanding of the true nature of testing in defi/web3.
categories: [linkedin, non-technical, testing]
title: Thoughts around testing - LinkedIn Posts
---

## Article 1

The world is an efficient place.

If there is any nook and cranny of the world from where value can be profitably extracted, it will be.

And amidst all the hype, excitement, convenient scapegoats, forgiving users and zero oversight, a serious issue in the DeFi space is creeping up.

For web3 protocols, which often work with a limited amount of developer and time resources, the efficient thing to do is to try and ship products as fast as possible.

From a purely economic perspective, it makes much more sense for a protocol to deploy its developer resources on building a v2 of their protocol, once the v1 has been coded up instead of engaging them in testing their protocol.

With the rise of big institutional investors entering the web3 space, with their big checks, this problem of lax testing is simply getting aggravated. If you are not sure why, google fiduciary duty.

However, not everything can be and must be seen from an economic perspective. DeFi protocols (and web3 protocols in general) handle the hard-earned money of everyday folks like you and me. These DeFi protocols HAVE to be held to a higher standard of testing.

No matter how many auditors have had a stab at your protocol, if you, the developer have not tested your protocol thoroughly then you are basically gambling with your user's money. No amount of audits and no size of insurance pool can give you peace of mind about your protocol's robustness as an extensive testing suite.

Therefore, we as a community of web3 native users must demand higher standards of testing from our protocols. We must raise our voices and hold our investments till each and every protocol that is built to handle users' money comes up with a thorough testing suite.

I am confident, that we can make this change happen.

Why?

Because just like testing, it doesn't make much economical sense for protocols to get their code audited, but they still do and that too from multiple audit houses. This is simply the result of the web3 users raising their standards for what is considered an acceptable protocol, where users would actually be putting their money.

I believe in the future of decentralised finance and I am of the firm belief that if it has to become sustainable and robust enough to survive all the onslaughts, then testing standards have to be improved.

Let me know what are your thoughts on this issue and if you would like to draw some parallels about this situation from the web2 world?

Thank you & Godspeed.

## Article 2

A friend asked, why do you treat testing like a first-class citizen.

And I replied, *That is because what I do is the software equivalent of launching space rockets. There is ZERO scope for any errors*

That friend is from a conventional software space and thought software testing was more of a formality than a necessity.

This thought process is nothing atypical in the software industry. This philosophy would make sense in *lean* startups that focus obsessively on shipping newer products than expending their developer resources on (extensive) testing. But, when you are programming immutable smart contracts that will be deployed on blockchain and would be handling user funds, testing is paramount.

Let us consider an example:
If the expected value of a variable in a test is say, 420.69 and you are getting the actual value as 420.59, then that is a difference of 0.1 units.

Is that significant?

Well, it very well can be.

If that unit was Ether, and the difference is coming as 0.1 Ether, then every time a user uses this particular function, they lose $300 USD assuming the price of 1 ETH to be $3000.

Depending on the asset, the loss post calling such a function can go even higher.

Not to mention, extensive test cases are a big help to the security auditors because it helps them cross-verify certain protocol behaviours. This enables them to focus on their actual job, ie, finding security vulnerabilities.

Anyway, when I told my friend about the implications of laxity in smart contract testing, he simply swore that he wouldn't work in web3 ever.

Maybe I need to work on my explanatory/persuasion skills a bit 🥲

Thank you & Godspeed.

## Article 3

What allows a Formula 1 driver to fly around the track?

It's not the engine, the tires, or the suspension.

It's the brakes.

Strong, reliable brakes unlock the driver. Build brakes into your life that allow you to accelerate and hit turns without fear.

This is the Break Paradox that Sahil Bloom introduced to me with his tweets. Thinking along the same tangent I had been pondering over the arrested growth of #defi adoption by the masses.

Sure, the DeFi protocols across different chains have increased their TVLs, but most of the money there again is from crypto-native investors.

So, the question is, how do we build these *breaks* in our DeFi ecosystems. I have come up with a three-pronged answer.

1. Thorough protocol auditing

> Many of the protocols that were exploited for millions of dollars were audited. We need increased accountability from auditing firms.

What I propose?
Auditing firms stake a decent amount against the security of their audited protocol which gets linearly vested back to them if no hacks happen

2. Thorough protocol testing

> Having been heavily involved in testing in my current position I have come to appreciate the *art* of testing contracts even more. Unfortunately the incentives of the protocol engineers are aligned in such way that it is beneficial for them to expend their developer resources of developing a v2 of their protocol instead of spending time on thoroughly testing their current protocols.

What I propose?
Similar to the *Audited by XYZ auditing firm* badges that most protocols today flaunt, we should establish standards where firms award badges to these protocols according to the level of their testing.

3. DeFi insurance

> After everything is said and done, DeFi is just lines of code after all and that too on a somewhat experimental technology. So, with the worst case scenario in mind, it would be better if we start encouraging users to get DeFi insurance for their DeFi exposures.

Sadly, DeFi insurance remains an extremely under-utilised financial instrument till date. Because, you don't really need insurance until you need it :P

> What I propose?

We should set industry-wide expectation on DeFi protocols to use a part of their protocol fee to insure user funds against any unexpected events.

These steps are a three-pronged strategy that I came up with, which I think can help accelerate true DeFi adoption.

Let me know if you agree/disagree and your rationale behind it. Even better would be if you could suggest some other changes that we need to undertake as an industry.

Thank you & Godspeed.

## Response recieved from Paweł Kuryłowicz in response to Article 3

I disagree with the first and second point. 

Here’s why 👇

1 In practice, audit is always a balance between being effective and keep clients cost low to best serve them. We set a point when we think we should find 99,9% of bugs and do not spend same amount of time just to make sure we have 100% (which btw is not possible as none can say that they know all possible attack vectors, it evolves, and we learn as well). If audit companies would have to “vest” their money based on security, it would skyrocket the prices to include potential risks of not getting paid. It would also set a bar higher for all beginners and close the space from new talents until they spent years on learning, and I personally do not want that.

We need new people, new devs, new auditors, new ideas.

2 Badges? Cool, but maybe let’s leave it for scouts. Security report IS NOT a badge, stamp or certificate. Report IS NOT a guarantee that you are secure.

Security report IS a great source of knowledge. A fresh and experienced perspective on your project. Bunch of tips and best practices that you should consider. Document on which you and your devs should grow as better and more knowledgeable experts.

The thing that in my opinion really matters and make a difference is sharing. Sharing your researches, success, mistakes and ideas 💡

So thank you Rahul Saxena for sharing your ideas, maybe I disagree with some of them, but it’s not always about bringing the perfect solution, sometimes it’s about starting a discussion and make it perfect later 😉

## Article 4 (My Response to Paweł Kuryłowicz)

This was a brilliant write-up. Thanks for taking out the time to show me how my post looks from the perspective of a blockchain security top gun.

Regarding, point number 1:
True. This would shoot up the prices around auditing more than they already are and no one would want that.
However, my intention with suggesting a vesting schedule for the audit firms was for them to get to have *more skin in the game*. As a fail-safe mechanism against lax auditing.

I'm sure that I don't need to take names here, because you'd probably know a few audit firms that literally audit/approve any protocol that moves. Their audit report is essentially a joke since, all it contains is the report generated from a static analyser.

These are the type of in-authentic audit firms I wanted to hold accountable with my first point.

Regarding, point number 2:
True again.
A security/audit report is not a badge and shouldn't be used as one.

But think from the perspective of a DeFi investor who could not read the code of a particular protocol either because they can't read code or do not have the time to do so. For them, seeing that the protocol they are about to put their money in, is audited by multiple high-quality auditing firms, puts them at ease.

It essentially acts as a proxy to the trust-worthiness of the protocol developers and the robustness of their code.

This is the fact that I wanted to leverage when I talked about *testing badges*. By testing badges, do not think of them as literal badges, but exactly like audit reports, not for the protocol code itself, but for the testing that has been done for the code.

Again, I'd like to thank you for fleshing out your thoughts, since it helped me become more precise about my thoughts and adding a fresh perspective to it.

## Article 5

A huge concern raised universally in all DeFi protocol development is the safety of the locked funds.

Although, the audits are helpful, but the most robust method to find and quash bugs is through thorough testing.

In DeFi protocol testing, you should not aim for a *good* cover but a 100% code coverage, and the best methodology to cover as many test cases as possible is as follows:

1. Figure out all the different states that your contract can be in.
2. Write (setup in forge) functions to reach that state.
3. Create different testing contract suite for each of these states. For example: contract A should have state A already cached within it.
4. And in each of these state contracts, call all the external/public functions, no matter how absurd it seems.
5. Write all possible negative test cases (for example, a user cannot call function destroyProxy) and then write the positive test case.

This 5 step process is almost certainly guaranteed to speed up any protocol's testing & development speeds and provide the much required peace of mind to all invested parties.

Thanks,
Rahul


