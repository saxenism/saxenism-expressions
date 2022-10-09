---
toc: true
layout: post
comments: true
description: Let's understand how we can yet again shave off some gas by using bit magic to pack more data into a word than can be usually done.
categories: [web3, solidity, language-tricks, bit-magic, bit-packing, intermediate]
title: Solidity - Bit Packing
sticky_rank: 2
---

# Introduction and Motivation

My last blog post about [Bit Magic](https://saxenism.com/web3/solidity/language-tricks/bit-magic/intermediate/2022/09/06/Bit-Magic-Solidity.html) generated some buzz amongst fellow EVM developers and some of them reached out to me to include additional things in my blog related to using bits effectively in Solidity and the EVM in general.

One such dev was the giga-chad maintainer of ERC721A himself, [Vectorized.eth](https://twitter.com/optimizoor) and he shared [a tweet](https://twitter.com/optimizoor/status/1526015118479200256) with me where he showed a few code snippets where some really cool things were going on.

Unfortunately, I could not make much sense out of it from the snippets and I had to head over to the [ERC721A pull request](https://github.com/chiru-labs/ERC721A/pull/272) that was behind the tweet and at that time my world turned upside down.

The [Chiru Labs](https://github.com/chiru-labs) team had written some incredible code and while I have not (yet) figured everything happening in the contract, I did understand that the essence of the contract/PR was to use *uint packing* instead of *structs*.

So, I set out to write some code for myself and figure out how struct can be packed into uints and see if that could lead to any gas savings. So, let me present my finding.

**Spoiler Alert** <br/>
Yes, it was possible. <br/>
Yes, it did save gas. <br/>
Yes, I did love it. <br/>

# Pitfalls

First of all, to proceed ahead with this article, you need to know what the *left shift operator* is, what the *right shift operator* and what is it that they do. Apart from that, you should also understand bitwise operations such as `&` , `|`, `~` ,etc.

A good place to learn these concepts or revisit them is [this gfg blog](https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/).

Next is the biggest pitfall of all. This is where I tripped hard and my mind almost broke (since I could not make sense of the ERC721A contract). Since, most of us might have native languages where we read that language from left to right you would naturally expect Solidity to also have the first stored data on the leftmost end and last saved data on the rightmost end. 

*BUT BUT BUT*

That is not the case. Solidity stores data starting from right, meaning it is (probably) Little Endian. Basically, if you were to store four numbers A,B,C and D in that order, inside of a word they would be stored as [D,C,B,A]. A good primer about Endianess can be found in [this freecodecamp article](https://www.freecodecamp.org/news/what-is-endianness-big-endian-vs-little-endian/).

Let me illustrate this point with [a picture](https://gateway.pinata.cloud/ipfs/QmZvGzhf9o6j837xF7eYLnufEACDa2MEvG8qh9TRz3k7bv):

![Big/Little Endian Explanation](https://user-images.githubusercontent.com/32522659/194752317-bfb99eeb-f452-4991-99ff-df6c6b9ba102.jpeg)

# Onto the code

Now that we have established our motivation, our objectives and are aware of the common pitfalls, time to relish the sweet code that we all had been waiting for.

The code is pretty self-explainatory and comments are put where needed. No more explanation is required.

Also, the Harry Potter theme of this contract was inspired by a [silly tweet](https://twitter.com/longestwavelen/status/1578620950479659008?s=20&t=u42okhhEbNKXrWgyorA8NA). Lol :P

```solidity

// SPDX-License-Identifier: Unlicensed

/*******
    // Here are some addresses that you can use for dry-run if you want to the run the contract in Remix.
        address public SiriusBlack = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148; 
        address public RubeusHagrid = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
        address public BellatrixLestrange = 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB;
        address public SeverusSnape = 0x583031D1113aD414F02576BD6afaBfb302140225;
********/

pragma solidity 0.8.17;

contract BitPackingAlpha {

////////////////////////////////////////////////////////////////////////////////
// A little definitions here and there so the meat of our code looks slick
////////////////////////////////////////////////////////////////////////////////

    uint private constant POTIONS_POSITION = 64;
    uint private constant TRANSFIGURATION_POSITION = 128;
    uint private constant CARE_OF_MAGICAL_CREATURES_POSITION = 192;

    uint private constant SINGLE_SUBJECT_MASK = (1 << 64) - 1;
    uint private constant MASK_EVERYTHING_BUT_CARE_OF_MAGICAL_CREATURES = (1 << 192) - 1;
    
    address serDumbledore;

    constructor() {
        serDumbledore = msg.sender;
    }

    // These separate mappings are to separate the effect of calling normal functions and bit magic functions
    mapping (address => bool) private _studentGraded;
    mapping (address => bool) private _studentGradedBitMagic;

    mapping (address => ScoreCard) private results;
    mapping (address => uint256) private bitMagicResults;

    // Only Dumbledore can grade students
    modifier onlyHeadmaster() {
        require(msg.sender == serDumbledore, "Only the headmaster can do this action");
        _;
    }

    // The students can only be graded once
    modifier graded(address _student) {
        require(!_studentGraded[_student], "Student has already been graded");
        _;
    }

    modifier gradedBitMagic(address _student) {
        require(!_studentGradedBitMagic[_student], "Student has already been graded");
        _;
    }

/////////////////////////////////////////////////////////////////////////////////////////
// This is how we would (and probably should) do things normally. The way of the normie.
/////////////////////////////////////////////////////////////////////////////////////////

    // Each of these subjects can only be graded from 0 to 100.
    struct ScoreCard {
        uint defenceAgainstTheDarkArts;
        uint potions;
        uint transfiguration;
        uint careOfMagicalCreatures;
    }

    // Execution Cost: 139811
    // The grades for each of the four subjects are generated randomly and then stored in the *results* mapping against the address of the particular _student
    function gradeStudents(address _student) public onlyHeadmaster graded(_student) {
        uint datda_score = uint(keccak256(abi.encodePacked(_student, "defenceAgainstTheDarkArts", block.difficulty, block.timestamp))) % 100;
        uint potions_score = uint(keccak256(abi.encodePacked(_student, "potions", block.difficulty, block.timestamp))) % 100;
        uint transfiguration_score = uint(keccak256(abi.encodePacked(_student, "transfiguration", block.difficulty, block.timestamp))) % 100;
        uint comc_score = uint(keccak256(abi.encodePacked(_student, "careOfMagicalCreatures", block.difficulty, block.timestamp))) % 100;
        
        results[_student] = ScoreCard(datda_score, potions_score, transfiguration_score, comc_score);

        _studentGraded[_student] = true;
    }

    // Execution Cost: 31229
    // Grab the results of student with address _student
    function getStudentResults(address _student) external view returns(uint, uint, uint, uint) {
        return (
            results[_student].defenceAgainstTheDarkArts, 
            results[_student].potions,
            results[_student].transfiguration,
            results[_student].careOfMagicalCreatures
        );
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Let's try some bit magic now. The way of the Bit Magician (Frankly it's just bit packing. Nothing fancy :P)
//////////////////////////////////////////////////////////////////////////////////////////////////////

    // Takes four 8 bytes uints and pack it into a single uint256 
    // Initialize a number `packedMarksUint` which has 256 0's
    // Take the number that you want to pack, shift it to its required place(0th bit, 64th bit, 128th bit or the 192nd bit) and do an OR with the 64 0's at that place of the `packedMarksUint` uint.
    function packMarksIntoASingleUint(uint a, uint b, uint c, uint d) private pure returns (uint packedResult) {
        uint packedMarksUint;

        packedMarksUint = packedMarksUint | uint64(a); // This stores the Defence Against the Dark Arts grades
        packedMarksUint = packedMarksUint | (b << POTIONS_POSITION); // This stores the Potions grade
        packedMarksUint = packedMarksUint | (c << TRANSFIGURATION_POSITION); // This stores the Transfiguration grades
        packedMarksUint = (packedMarksUint & MASK_EVERYTHING_BUT_CARE_OF_MAGICAL_CREATURES) | (d << CARE_OF_MAGICAL_CREATURES_POSITION); // This stores the Care of Magical Creatures grades
        
        packedResult = packedMarksUint;
    }

    // Execution Cost: 25229
    // Logic is to shift the target number to the leftmost end and then do an *&* with 64 1's to reveal that particular number
    // For the rightmost number, we only need to shift it to the leftmost position and cast it to uint64. That does the same thing.
    function getStudentResultsBitMagic(address _student) external view returns (uint _datda, uint _potions, uint _transfigurations, uint64 _comc) {
        _datda = (bitMagicResults[_student] & SINGLE_SUBJECT_MASK);
        _potions = ((bitMagicResults[_student] >> POTIONS_POSITION) & SINGLE_SUBJECT_MASK);
        _transfigurations = ((bitMagicResults[_student] >> TRANSFIGURATION_POSITION) & SINGLE_SUBJECT_MASK);
        _comc = uint64(bitMagicResults[_student] >> CARE_OF_MAGICAL_CREATURES_POSITION);
    }

    // Execution Cost: 73430 
    // The grades for each of the four subjects are generated randomly and then stored as a packed uint256 in the *bitMagicResults* mapping against the address of the particular _student
    function gradeStudentsWithBitMagic(address _student) external onlyHeadmaster gradedBitMagic(_student) {
        uint datda_score = uint(keccak256(abi.encodePacked(_student, "defenceAgainstTheDarkArts", block.difficulty, block.timestamp))) % 100;
        uint potions_score = uint(keccak256(abi.encodePacked(_student, "potions", block.difficulty, block.timestamp))) % 100;
        uint transfiguration_score = uint(keccak256(abi.encodePacked(_student, "transfiguration", block.difficulty, block.timestamp))) % 100;
        uint comc_score = uint(keccak256(abi.encodePacked(_student, "careOfMagicalCreatures", block.difficulty, block.timestamp))) % 100;
        
        bitMagicResults[_student] = packMarksIntoASingleUint(datda_score, potions_score, transfiguration_score, comc_score);
        _studentGradedBitMagic[_student] = true;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Viewing individual grades (I simply combined all these function logics in the function getStudentResultsBitMagic)
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    function bitMagicGetDefenceAgainstTheDarkArtsGrades(address _student) external view returns (uint) {
        return (bitMagicResults[_student] & ((1 << 64) - 1));
    }

    function bitMagicGetCareOfMagicalCreaturesGrades(address _student) external view returns (uint64) {
        return uint64(bitMagicResults[_student] >> CARE_OF_MAGICAL_CREATURES_POSITION);
    }

    function bitMagicGetPotionsGrades(address _student) external view returns (uint) {
        return ((bitMagicResults[_student] >> POTIONS_POSITION) & SINGLE_SUBJECT_MASK);
    }

    function bitMagicGetTransfigurationGrades(address _student) external view returns (uint) {
        return ((bitMagicResults[_student] >> TRANSFIGURATION_POSITION) & SINGLE_SUBJECT_MASK);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Viewing individual grades: The normie way
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getDefenceAgainstTheDarkArtsGrades(address _student) external view returns (uint) {
        return results[_student].defenceAgainstTheDarkArts;
    }

    function getPotionsGrades(address _student) external view returns (uint) {
        return results[_student].potions;
    }

    function getTransfigurationGrades(address _student) external view returns (uint) {
        return results[_student].transfiguration;
    }

    function getCareOfMagicalCreaturesGrades(address _student) external view returns (uint) {
        return results[_student].careOfMagicalCreatures;
    }

}

```

