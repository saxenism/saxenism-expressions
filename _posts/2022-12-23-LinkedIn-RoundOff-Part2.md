---
toc: true
layout: post
description: Collection of my LinkedIn Posts for the month of December.
categories: [linkedin, non-technical]
title: December LinkedIn Posts 
---

# 1. Solidity vs Rust: For a new developer

One question, that I am frequently asked by folks trying to break into the web3 space is: Solidity or Rust?

The issue with answering this question definitively is that web3 market is volatile, narratives come and go and people are always chasing the next shiny object.

But today, I would like to take a stab at answering this question according to my perspective and the current web3 development cycle.

The only plausible reason, a beginner could have to consider learning Rust is either they want to build on Solana or Near. While I do have my personal problems with how the Solana ecosystem is run, even if I were to put those problems aside and provide you my perspective, **I would advise against learning Rust, first.**

Why?

Because, web3 and blockchain development is a uniquely challenging field. Since, your code would directly be responsible for handling people's money it would always be a better choice to go with a technology, a language, that has been battle-tested for years. Also, more importantly, the technology being used in this space is closely related to the market conditions of its parent entity.

For example, it would be perfectly normal for anyone to launch their decentralised application on the Binance Smart Chain, but would you want to do that if suppose some wrongdoings are uncovered from Binance's end?

Similarly, if you are starting out, I'd suggest sticking with Solidity and Ethereum because this is THE most long standing and decentralised ecosystem in the web3 space right now, speaking technologically and economically.

And even while learning Solidity, your sole aim should be to fully understand the inner workings of the Ethereum Virtual Machine and once you do have that, you are free to actually explore your interests. Some opportunities that open up for you:
1. Use SQL/Python/R to create tools helping people with on-chain intelligence. You can leverage DeFi Llama, Dune Analytics, Etherscan for this.
2. Learn Rust and build or contribute to tools in the Ethereum Ecosystem such as REth clients, Foundry, Heimdall etc. This is for people that want to work on the blockchain architecture itself rather than building applications on top of it.
3. I believe that in the future, the Ethereum L1 would only function as a consensus layer and all the real action would take place on different L2. So, you can learn different Rust-DSLs, Cairo, Noir, etc and start building on the plethora of L2 solutions out there.

The possibilities become endless.

However, having said this, I do not mean Solana or Near is a strict no-go. With this perspective, I just want to protect the new entrants from getting isolated to a specific chain by virtue of the language they picked up. You are free to explore as deeply and as widely as you would like and if equipped with that research and your *own* hypothesis, you would want to build on Solana/Near, by all means go ahead.

Let me know the advice you generally give vs what you receive.

Thank you & Godspeed.

# 2. Supercharge your auditing with Taint Analysis

Let me tell you a secret smart contract auditors do not want you to know.

*Drumrolls*

This is the concept of the source and the sink. Or more formally taint analysis.

Taint analysis is one of THE most fundamental ways to look at a smart contract (or any software for that matter) from a security perspective.

Once deployed on the blockchain, your contract will more or less act the same way and is static. The only changes in the behaviour of your smart contract can be initiated by the input that is provided to the smart contract.

Therefore you should focus your mental energies in scrutinising functions that an attacker can affect, ie, functions that accept some kind of user input. These are called *sources*.

Always work with the assumption that the user input to any function is coming from an attacker and the data that you get from them is tainted data. This tainted data remains tainted as long as it is not validated by your code and also, any data that this tainted data interacts with should also be considered as tainted.

As security auditors our biggest jobs is to make sure that no tainted data ever reaches the part of our code where critical operation is happening. Such a place is known as the sink.

Therefore, all the testing and auditing that is done should be done with this simple objective in mind that any tainted data should never reach any sink.

If you can achieve that objective, your codebase would be more safe than most codebases out there and more importantly it gives you a peace of mind that you have not left any obvious security holes in your code.

Hope you could find something valuable from this post, irrespective of whether you are a developer, an auditor, a project owner, an investor or a hobbyist.

Keep being awesome. 

Thank you & Godspeed.

#web3 #blockchain #ethereum #bitcoin #defi #auditing #smartcontracts #testing 

PS: Being a professional auditor myself, I was kidding when I said smart contract auditors do not want you to know this. We most certainly do. 
Personally, I love to share anything and everything I come across because I believe my vision for a safer DeFi ecosystem is shared across all stakeholders of web3.

# 3. How I got into the Ethereum India Fellowship: For people looking to apply to the 3rd iteration

The Ethereum India Fellowship changed my life.

The impact that Devfolio and Ethereum Foundation had on the trajectory of my professional career is simply insane.

Since EIF applications are open right now, let me tell you how I got selected and changed orbits to get into blockchain development.

The EIF typically has two tracks where it accepts applications. First is Track 1 for conventional web2 developers who have no blockchain-related background and Track 2 is for developers who already have some experience building in the web3 space.

So, you want to get in? Let me tell you the best attack plan I recommend.

What it all boils down to *is proof-of-work*.

If you are applying for Track 1, what Devfolio is essentially looking for is, proof that you are a proficient coder.
The easiest proof to gather for this purpose is to have some kind of social proof: a GSoC scholar, an LFX/LiFT scholar, an MLH scholar, etc.
Another piece of the puzzle to stack in your favor would be to have some kind of open-source, publicly accessible website showcasing your web development skills.

In my case, I got to know later on that I got in owing to my GSoC selection in 2020.

If you are applying for Track2, having 2+ full-stack blockchain projects that are live and publicly accessible, would put you ahead of 90% of the applicants.
Another tip to drive it home would be to make sure that the smart contracts running in the background are non-trivial and that your project incorporates the use of The Graph.

After this initial screening, for the interview, I would suggest that you have the utmost clarity on why you want to be an Eth India fellow.

If you are being inauthentic, people can smell it from a mile away, and leaves a deplorable impression. Tell them if you are excited by the technology and if yes, why and which aspect of it? Don't be afraid to call out NFTs if you think they are mostly a means of running scams. Just be your most authentic self.

In my case, since the mentors were announced before the interview and I wanted to work with one of them, I explained in the interview why I wanted to work with that particular mentor and the visions that I had for the kinds of products that I would with him.

Personally, it also helped that I had a pretty active interest in finance even at that time and so I could discuss the similarities and differences between different financial instruments in the TradFi and DeFi space.

That was all that I did and that is the entirety of my advice. I hope you could find something valuable in this post.

Keep being awesome. 

Thank you & Godspeed.

#web3 #blockchain #ethereum #bitcoin #defi #auditing #smartcontracts #testing 

PS: If you get any help or any amount of value from my posts, do me a solid and follow Bluethroat Labs :D

# 4. Code Review Process: A New Perspective

Let me draw an analogy for you on what it means to be a competent auditor.

Ever imagined yourself as a steward at the FIFA World Cup Finals?

There could be a raging match going on in the stadium and history could be getting written right there in the stadium.

But the football ground stewards have to stand with their backs against this earth-shattering action to be able to do their jobs properly.

This is what it feels like to be an auditor when you receive protocol code from industrious developers who follow all the good practices of development, write modular code, name their variables better and comment a lot.

Any person who sees this type of code should be happy, and rightfully so, but for an auditor, this is a tragic event.

Why?

As an auditor, my understanding of the protocol has to be as bullet-proof as possible and it should be derived from first principles, ie the actual code, rather than from assuming things based on the comments and function names.

For me, well-documented and expressive codebases have always been the hardest to audit. This is because I constantly have to fight the urge to *borrow* my understanding of the protocol from the comments and variable and function names.

A grade-A quality codebase, which looks pleasant to the eyes makes me uncomfortable because I know my internal bias can kick in at any time, making me much more accepting of the code that I come across.

I know this post can come across as abstract and unrelatable to a lot of people, but trust me when I say people let a lot of things slide given that the thing in front of them is something they consider pretty.

However, if you do agree with me and are open to even considering the possibility of something similar happening to you, try this:

For your next audit or code review or whatever, strip the code of all comments, replace the variable names with something like `var1`, `var2` etc and then go ahead with the audit.

Let me know if you resonated with the post and will try out the challenge I posed towards the end.

Hope you could find something valuable in this post, irrespective of whether you are a developer, an auditor, a project owner, an investor, or a hobbyist.

Keep being awesome. 

Thank you & Godspeed.

#web3 #blockchain #ethereum #bitcoin #defi #auditing #smartcontracts #testing 

PS: If you are looking to get an audit, you should definitely check out Bluethroat Labs. We are running a really cool offer for a limited time right now.

# 5. The Testing Mindset

What is it, that makes a painting worth $100,000 and another painting worth less than a toilet paper?

If you are even remotely like me, you are sure to have been baffled by the exorbitant prices that some artworks have commanded.

Keeping aside the art gallery mechanics that rich people use to save their taxes, there has to be a sound logic for quantifying the value of a piece of art, right?

Well, I really do hope I could talk more about that topic with you, but I'm out of depth there. However, if you ask me to draw parallels with this phenomenon in the web3 world, I can definitely give that a shot.

Testing your smart contracts is more art than science and therefore it is fundamentally hard to quantify what constitutes *good testing*.

Testing with an aim for achieving 100% code coverage is a necessary but an insufficient strategy. This is like a game developer, showing a speedrun of their game and basically testing whether their game runs exactly in the way that they intended and with close to zero experimentations.

Efficient testing requires an inquisitive mindset and forces you to become a professional sceptic, questioning all the fundamental assumptions made throughout one's code.

Adopting that mindset is a long and perhaps a life-long process. However, there are a few things that you can start doing right away and they are:

1. Write *positive unit tests* for things that the code should handle
2. Write *negative unit tests* for things that the code should NOT handle.
3. Write *integration tests* to make sure all fundamental building blocks of your code work together cohesively.
4. Write and run *active* tests that run on mainnet forking as a dress-rehearsal for your smart contracts.

With this kind of testing already done for your protocol, you will introduce an extremely high level of security into your protocol codebase and then you can allocate your mental energies into figuring out and mitigating extremely hard and unlikely bugs, potential 0 day exploits and economic attack vectors.

That was it from my end. Hope you could take away something valuable from this post.

Keep being awesome.

Thank you & Godspeed.

#defi #ethereum #bitcoin #web3 #blockchain #testing #security #smartcontracts #auditing

PS: All my frens go follow Bluethroat Labs

# 6. Junior vs Senior Developer in the web3 space

What does it mean to be a junior developer?

A *junior* or a *senior* developer are subjective terms and therefore the exact meaning of these two terms varies across different companies and different industries.

I was on a call with an up-and-coming blockchain developer and he was quite stressed out by the fact that even after some decent beginner experience, he was rejected for a junior role.

To this, I shared my personal experience with him which I think I should share publicly as it can help everyone in the same boat as him.

A few months back, I applied for a junior blockchain developer role at a renowned Layer 2 scaling protocol. After a rather pleasant screening interview, I was informed a week later that I did not have enough experience to be a junior developer with them.

Sucked bad, but I moved on.

Next, with reference from a few friends, I applied to an extremely famous lending protocol and their reason for rejecting me was that they definitely knew that I was not a junior developer but given my time spent in the industry, they could not really offer me a senior developer role.

Sucked bad, but I moved on again.

However, did I tell you that all this time I was co-heading the development of a new lending product and also was responsible for setting up its testing infrastructure.

If that is not what a senior developer does, I do not know what they do.

Again, I went on ahead and consulted with a web3 project that was building *Upwork for web3* and I was heading all of the engineering resources that they had, including their front-end developers.

The role that this client was eventually offering me was not of a senior developer but of the *Chief Technical Officer(CTO)* itself.

So, if you notice, you'll realize that at the same time I was not even a junior dev for someone, an intermediate dev for someone, a senior dev for someone, and a CTO for someone.

Therefore, to all the people that got rejected for even a junior developer role, please do not give up and keep on working on yourself. When dealing with your rejection, try and contextualize it with the current market conditions, your implied expertise, the stage of the company itself, internal politics, etc.

At the end of the day, the only thing you can realistically do is, Work On Yourself. There is nothing more to it. The tags of *junior*, *senior*, *intermediate*, *ninja*, *rockstar* would come and go and should be the least of anyone's concerns.

Hope you could find something valuable in this post.

Keep on rocking. Thank you & Godspeed.

#defi #blockchain #bitcoin #ethereum #web3 #jobs #jobsearch #jobhuntingtips

PS: Want to take security and testing off your plate? Get in touch with Bluethroat Labs 🫡

![Junior v Senior Dev](https://media.licdn.com/dms/image/C5622AQGqnO6wx4J0CQ/feedshare-shrink_800/0/1671464729700?e=1674691200&v=beta&t=q_m1hWRmWtqWXYF88hOJL6cKGj8Xtpgup5c18KDX7_Q)

# 7. Dunking on Bitcoin Conferences

![img](https://media.licdn.com/dms/image/C4E22AQExxLXXQjRBdA/feedshare-shrink_1280/0/1671208156992?e=1674691200&v=beta&t=pPzf7WRSyF76KmX9NbdK_Soa_sXs_DxjSmZo8WD7kdw)

# 8. Lost money with Maple Finance: Lessons Learnt

I recently took a massive L.

I had a bunch of crypto(USDC) lying around after putting another chunk in relatively safer Defi instrument(s).

I officially started my journey into blockchain development by working for a lending protocol and post that I had been into smart contract security along with development.

So, now, given my lending background and the fact that the protocol that I worked for hadn't launched yet, I went with a protocol that I knew about from earlier comparisons, Maple Finance.

I had personally audited the codebase of Maple out of pure curiosity and had also gone through their test cases for my research.

Therefore, I was pretty confident that it would be quite difficult to hack Maple Finance and that it was definitely not a rug and therefore, my money would be safe with Maple Finance.

However, what happened?

The creditor defaulted and I lost about $2,800.

Why did this happen?

Because I ignored something very fundamental: *DeFi protocols are a function of programming and economics*.

I was so confident about the programming aspect of Maple Finance that I forgot about the economics side. You do not have to be a genius to figure out that you must *NOT* be lending money to anyone in this economy.

However, I just missed the entire point. Perhaps, my pride and confidence as a blockchain developer and auditor were the drivers behind this oversight.

However, I have learned my lesson and paid a tuition fee too. I will definitely be taking steps to better myself and come out stronger.

Wanted to share it with everyone here so that you keep this simple fundamental in mind and do not lose your hard-earned money.

Keep on rocking. Thank you & Godspeed.

#defi #blockchain #bitcoin #ethereum #smartcontracts #defi

PS: All my frens go follow Bluethroat Labs

![Loss Screenshot](https://media.licdn.com/dms/image/C5622AQGpX1h8_FzuFQ/feedshare-shrink_800/0/1671657880120?e=1674691200&v=beta&t=Wqw2jTIo8-p88ARLYhDvBmPc7YieZuLMHA0ucHGCrlI)

# 9. Secure a job in the Bera

The markets are down and crypto markets are more so.

Raising fresh rounds is difficult and trust in the industry is at an all-time low.

Here are the 7 tips I would follow if I were looking for a job right now:

1. Focus on my actions rather than the result. I would shift my goal from getting a job to giving 100 interviews with as much preparation as is humanly possible. This would have brought me into an optimum frame of mind.

2. Hit up my network. If I had been in the web3 space for any amount of time and made friends, I would reach out to them and let them know that I am open to work.

3. Try to get a job rather than THE job. In my mind, there are a few ideal places to work, but if I am out of work and looking for a job in bad economic conditions, I will lower my expectations and try my best to land a job rather than spend time going for a specific job. This includes being ok with contract work, short gigs, consultancy jobs, lesser compensation for the time being etc.

4. Upskill relentlessly. I would take the time I have during my job hunt and devote at least 40% of that time to learning new concepts, gaining in-depth clarity on things I already know, and becoming an overall better engineer.

5. As a followup to point 4, I would post about my learning on Twitter, LinkedIn, Lens, etc. Then I would try to genuinely engage other developers in deeply technical conversations about the things I learned.

6. As a compliment to point 5, I would also write some long-form content in the form of educational blogs about the things I learned, protocols I analyzed, new tools I tried out, or new programming projects I made.

7. Align the skills I am learning to those that are actually in demand in the market right now and not learning or brushing up on something simply because I am supposedly good at that particular language or framework.

These are the tips I would follow to get a job along with lots of patience and a dash of positive attitude. Let me know if you want to add something to this list.

I hope you could find something valuable from this post.

Keep being awesome.

Thank you & Godspeed.

#web3 #crypto #ethereum #bitcoin #jobsearching

PS: If you know someone interested in a free high-level security overview, direct them to Bluethroat Labs. Cheers.

![Bera](https://media.licdn.com/dms/image/C4D22AQHtmr_subo8vg/feedshare-shrink_800/0/1671212835074?e=1674691200&v=beta&t=9jjNf_NuaJoi3Jw7zhVlgnocd6n3fH06_tqtW2w4_84)



