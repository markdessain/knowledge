---
id: understandability
title: Understandability
---

## Introduction

Writing something that is understandable is more important than it been fast or efficient.


## Numbers

Numbers hold special types of properties which can be used to express meaning.

### Sequences

The position within a sequence determines how far it is from the start or end. A sequence could either be bounded or unbounded. If the range is unbounded the distance to the start or end is unknown.

For example, 3 is in the middle of a sequence.

```
1 2 3 4 5
    ^
```

It is important if you need to know about distances or where a value is.

A more concreate real world example would the journey along a shopping cart

1. Basket
2. Address
3. Card Details
4. Summary
5. Completed

If the sequence order was not listed and you only had the written name, there would be no way of knowing how far along the shopping journey you were. The sequence gives order.

Over time a sequence of items could be reordered or new items added in the middle or removed all together. So a mapping between the sequence number and text value could change.

If for example the above list is changed to be

1. Basket
2. Address
3. Card Details
4. Completed

A value of 4 which used to be `Summary` is now `Completed`

### Probabilities

The probability is a type of sequence who's range is between 0 and 1. It outlines the distance from the start and the end.

Where as a sequence can map the numerical value to a text value a probability does not and a distinct value so only ranges can be mapped to values.

- `>= 0 && < 0.33` = low
- `>= 0.33 && < 0.66` = medium
- `>= 0.6 && <= 1` = high

This means that once a value has been mapped to a text value it cannot be reversed.

### Clusters

Clusters can define a relationship between multiple objects.

- A is in cluster 1
- B is in cluster 1
- C is in cluster 2
- D is in cluster 3

The only value that we can derive from the above clusters is that A and B are similar.

It could easily be stated that instead we have the following mapping

- A is in cluster 2
- B is in cluster 2
- C is in cluster 3
- D is in cluster 1

As such the number holds no numerical property. It doesn't provide and order or a range. Its just a placeholder for a group.

We may wish to give the cluster a more descriptive name based on inspection of the types of objects in that group.

- Cluster 1 is Films
- Cluster 2 is Video Games
- Cluster 3 is Books
