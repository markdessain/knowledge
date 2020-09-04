---
id: event-streams
title: Event Streams
---

import Mermaid from '@theme/Mermaid';

## Introduction

An event stream is a timeline of activity for a given object. A common example is a user click stream which includes all the actions performed by a given user.

The following is an example of how a user could browse through a website:

<div>
<Mermaid chart={`
  graph TB;
    pv1([Page View]);
    pv2([Page View]);
    login([Login]);
    search([Search]);
    gap1([...]);
    gap2([...]);
    gap3([...]);
    pv3([Page View]);
    purchase([Purchase]);
    gap4([...]);
    pv1-->pv2;
    pv2-->login;
    login-->search;
    search-->gap1;
    gap1-->gap2;
    gap2-->gap3;
    gap3-->pv3;
    pv3-->purchase;
    purchase-->gap4;
    subgraph First event
      pv1
    end
    subgraph Gap in events, could be hours or days
      gap1
      gap2
      gap3
    end
    subgraph Achieved a goal
      purchase
    end
`}/>
</div>

This is the most raw data you can get and can be used to describe a users journey.

## Deriving Business Concepts

From the raw events extra concepts can be derived, it just requires a set of business rules to define the concepts. Concepts can be split into several categories.

### The Occurrence of Events

An event that is present will trigger users to be part of a group, such as any visitor with a purchase are called customers.

<div>
<Mermaid chart={`
  graph TB;
    gap1([...]);
    gap2([...]);
    purchase([Purchase]);
    gap1-->purchase;
    purchase-->gap2;
`}/>
</div>

### Lack of Events

An event that is not present will trigger users to be part of a group, such as any visitors with a search but no purchase are called prospects.

<div>
<Mermaid chart={`
  graph TB;
    classDef missing opacity: 0.2,text-decoration: line-through;
    gap1([...]);
    gap2([...]);
    search([Search]);
    purchase([Purchase]);
    gap1-->search;
    search-->purchase;
    purchase-->gap2;
    class purchase missing;
    linkStyle 1 opacity: 0.2;
    linkStyle 2 opacity: 0.2;
`}/>
</div>



### Gaps Between Events

The time between events could separate events into groups, such as page views with a gap of 30 minutes or more are part of separate sessions.


<div>
<Mermaid chart={`
  graph TB;
    gap1([...]);
    gap2([...]);
    gap3([...]);
    gap4([...]);
    pv1([Page View]);
    pv2([Page View]);
    subgraph Session 1
      gap1
      pv1
      gap2
      gap1 --> pv1
      pv1 --> gap2
    end
    subgraph Session 2
      gap3
      pv2
      gap4
      gap3 --> pv2
      pv2 --> gap4
    end
    gap2 -- ... 1 hour gap ... --> gap3;
`}/>

</div>

## A
## A
## A
## A
## A
## A
## A
## A
## A
## A
## A
