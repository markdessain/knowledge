---
id: experiments
title: Experiments
---

## Introduction

Experiments should be a quick and simple timeboxed exercises that provide an outcome to say if additional time and effort should be spent. An experiment should consist of a few parts:

- Deciding on a statment to describe the experiment
- Deciding an audience or gropup to perform the experiment on
- Deciding on the different variations which each change one thing
- Deciding which metric to monitor
- Deciding the desired goal for that metric

It should be simple, clear and easy to understand for anyone of any technical ability.

## Example

**Statement**

In a generalised form:

> When a user group X is shown A, B or C which increase or decreases Y metric the most?

A specific example:

> When a user group of UK based customers are shown, a green button, blue button or a red button which increases the click through rate to viewing the Contact Us page the most?

**The Audience**

The audience can be selected based on the data you have avalible on each of the subjects.

> UK based customers

**The Variations**

> Green, Blue and Red

**The Metric**

> Click through rate

**The Goal**

> Increase click through rate by 20%

## Choosing Variants

All users should be given an A or a B variant for each experiment. It does not matter if they are going to see the experiment or not. The main aim is to provide a deterministic variation group. A function simular to `int(hash(customer_id + experiment_id)) % number_of_variants` should be used as this will put our subjects into a consistent group no matter when the experiment is run.

If you start to include other stateful attributes like if how many orders they have made or when they last visited the variant will lose its deterministic property.

The assignment of a variant is seperate to if the subject has seen the experiment. 

## Who Sees the Test

As we have seperated this out, we can now have logic which defines which subjects are shown the test. We may choose to do something like `WHERE subject.country == "UK`

## Reading the Results

At the end of the testing period there will be an output such as

- Group A: 1000 subjects / 140 clicks - 14% click rate
- Group B: 900 subjects / 10 clicks - 1%  click rate
- Group C: 950 subjects / 200 clicks - 21% click rate

The results show it is clear that Group C has the best click through rate.

## Data to Collect

Collecting data from the experiment is the only way to measure what worked and what did not.

Data should include at a bare minimum:

- What subjects are in the experiment?
- What group is the subject in?
- What interactions did the subject have?
- Did the subject complete the goal? and if so what was the gained value?

The value should be a single numerical value, this could be number of items sold, dollar value of the items or something else related to the choose metric.

An Event stream could look like:

```json
{
    "event": "subject_assigned_variant",
    "subject_id": "mark",
    "test_id": "blog_test",
    "variant": "a"
}
```

```json
{
    "event": "subject_enters_test",
    "subject_id": "mark",
    "test_id": "blog_test"
}
```

```json
{
    "event": "test_interaction",
    "subject_id": "mark",
    "test_id": "blog_test",
    "payload": {
        "type": "button_hover",
        "button_id": "button_abc"
    }
}
```

```json
{
    "event": "test_interaction",
    "subject_id": "mark",
    "test_id": "blog_test",
    "payload": {
        "type": "button_mouse_down",
        "button_id": "button_abc"
    }
}
```


```json
{
    "event": "test_interaction",
    "subject_id": "mark",
    "test_id": "blog_test",
    "payload": {
        "type": "button_mouse_click",
        "button_id": "abc"
    }
}
```

```json
{
    "event": "subject_completes_test",
    "subject_id": "mark",
    "test_id": "blog_test",
    "value": 10 
}
```