+++
author = "Berwout de Vries Robles"
title = "Why testing is great, but blocking your build on code coverage is not."
date = "2022-12-22"
summary = "Recently at work guidelines were being developed for the department. Part of those guidelines were related to SonarQube quality gates that would be used inside of our CI/CD pipelines. I noticed during the discussion that even though everyone agrees that code coverage is not a direct measure of quality, it is still quite hard to argue that it therefore should not be part of the quality gate. I decided to write down my thoughts in a bit more of a structured way to see if I can convince my peers."
tags = ["practices"]
+++

To most developers luckily I no longer have to argue why testing is great. Slogans like “Testing is documenting” or “No untested code in production” have become ubiquitous and we all have realised through painful experience that building and maintaining large and complex systems requires automated quality control. We can not keep up with human testing because as our system grows, due to regression you are required to test ever larger and larger amounts of code.

### Just to remind you, a short non-exhaustive list of important automated test benefits.
- Helps you write better code (hard-to-test means you should probably reconsider your structure).

- Provides you with near-instant regression feedback on changes.

- Provides future developers with documentation about the quirks of the code.

- Eliminates large cost of human verification.

- Mitigates risk of failure.

### What we sometimes forget to realise is that testing has a cost as well, like all things in programming it is a trade-off.
- Test code is also code and needs to be maintained.

- Writing tests is an investment of time and effort. (time well spent usually)

# On code coverage
Code coverage is a useful single digit metric that represents how much of your code is being “hit” inside your tests. Naturally if you follow good Software Engineering practices and you are building an important production application this metric will gravitate towards a high percentage. 

A low code coverage number can be a starting point for a conversation with a team about their testing strategy. However, a high number does not necessarily mean that a team is doing anything right as code coverage does not equal test quality.

## On correcting bad actors
It sounds like a good idea then to promote a high number of code coverage, as a low number is definitely an indicator of something being wrong.

However, in practice a low number of code coverage usually means a team does not have a **proper engineering culture** (i.e. they do not believe that testing is worth it). If they do not have this culture, they are very likely to take one of several easier routes when forced to meet a code coverage deadline:

- Write poor tests with lots of repetition to meet the code coverage number

- Add a bunch of ignore statements inside code

- Write tests that hit a lot of code but do not actually test the code they hit.

- Write tests that cover the existing functionality instead of fixing the existing functionality.

Note that now the code coverage number has been met, but the code is significantly **worse** than without requiring a code coverage number!

Furthermore, where you previously had an indication to start a conversation with the team, now their stats are “green” so it will be harder to address the root issue.

## On using code coverage inside a peer review
Now I imagine one of the arguments you can make here is that these bad habits should be flushed out inside a peer review or a discussion within your team. However I would very much rather go one step further and say that this discussion should already happen on pull requests that don’t have enough or proper tests. If you cannot convince your team there, why do you think that with a code coverage number that has been met you can now convince your team that they did meet the requirement, but in a shitty way?

## On blocking developer flow of devs that do follow good practices
A very bad side-effect of requiring a high code coverage number is that not only does it lead to worse testing amongst developers that do not follow good practices, developers that do follow good practices and have proper discussions inside their team occasionally still fail this high code coverage standard. Even though they did the proper investment and did everything right, they still get pulled out of their flow every now and then, just to add an @Ignored somewhere, and re-wait for their build. The number of false positives is too high when you put the code coverage number very high.

## On tests as documentation and investment
As developers we all know that long repetitive tedious documentation is a bad thing. A high code coverage requirement can in practice lead to over-testing in low-risk areas just to meet the high standard.

Tests are best at documentation when specific quirks are brought to light inside tests. Requiring every unlikely low-risk condition to be tested can lead to the important documentation of specific quirks disappearing into the mass of tests. Ideally you wouldn’t, but we are all human and everyone is more likely to skim over long repetitive test scenario’s inside a pull request.

## On testing new products
Realising that all this test code is an investment and you should therefore invest your time to meet the goal of risk mitigation and not the goal of touching at least x% of your code.

Especially when the entire functionality you are building is still up in the air, it can be premature to heavily invest in testing because the functionality may be completely scrapped or rethought in the next sprint. Note: I am not saying we should not test uncertain functionality, I am saying that if the functionality is still heavily in flux, you probably want to limit yourself to a few cases only to add more when the functionality cements itself. Requiring a high code coverage in this situation leads to less agility.

## On encouraging the use of SonarQube
When you introduce SonarQube somewhere, you want the tool to be a helper. You want developers to think: “Thank you SonarQube for pointing this out to me, I will go and fix it now”. The more you annoy developers with tools, the less they will want to use them in the future. The barrier to entering your project into SonarQube should be low, you should be able to grow towards the desired state instead of requiring it or blocking the build.

# Summary
Reasons why I believe you should not require high code coverage inside a SonarQube quality gate:

- Code coverage does not tell you anything about test quality

- It does not improve the bad culture at the root of the lack of proper testing, instead it encourages bad habits for bad actors.

- It occasionally also blocks developers with good culture in their flow as a false positive.

- It can lead to over-investment in risk mitigation when the product itself is still very much in flux.

- It discourages the use of SonarQube for new users.

TLDR: Testing great, code coverage requirements, not great.