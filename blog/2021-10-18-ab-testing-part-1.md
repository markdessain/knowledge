---
title: AB Testing Part 1
slug: ab-testing-part-1
tags: [abtesting]
---

I have begun an exploration into ab testing based on a project that we have been working on at Maersk. This post forms the beginning of my ideas, comments and questions. It will be split into a weekly collection of updates.

This first set of updates is posted just before our test is launched.

<!--truncate-->

## Variant groups should be deterministic

Deterministic means that you get the exact same output with the same inputs. It’s a very useful property to enable a task to be repeated many times and to ensure consistency.

There is an article from Linkedin that states: “Variant assignment of a single member is deterministic” - https://engineering.linkedin.com/blog/2020/a-b-testing-variant-assignment

So for example a function such as int(hash(customer_id + experiment_id)) % number_of_variants will put a customer into a consistent group. If the test is run now, or in a week or next year the variant will always be the same.

## A test should be simple

An AB test should answer a simple unambiguous question where the results are clear to anyone of any technical ability. A question like "When a user group X is shown A, B or C which increase Y metric the most?" So it could be "When a user group of reefer customers are shown, a green button, blue button or a red button which increases the click through rate to viewing the the information page the most?"

There is one group of customers which are split into N cohorts, and the end of the experiment one of the cohorts will have outperformed the others. It is clear, simple and straight forward to understand. One group wins and then we decide if it is worth the effort to make the change permant or not.
