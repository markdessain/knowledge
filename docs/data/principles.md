---
id: principles
title: Principles
---

## Introduction

There are several principles which should be followed to ensure a maintainable and robust data pipeline. The following includes code examples of how this can be achieved but mainly at an abstract pseudocode level.

## Principles

### Determinism

> Given a particular input, will always produce the same output, with the underlying machine always passing through the same sequence of states.
>
> https://en.m.wikipedia.org/wiki/Deterministic_algorithm

The following block of code is deterministic, as long as `a` and `b` are the same the result will always be the same.

```python
def run(a, b):
    return a + b
```
The following two examples are not deterministic as they give different results when run multiple times.

**Randomness**

```python
import random

def run(a):
    return a + random.randint(0, 10)

random.seed(42)
run(1)  # returns 11
run(1)  # returns 2
```

**Function that uses a variable that change over time**

```python
from datetime import date, timedelta

def run(delta):
    return date.today() + delta

run(timedelta(days=2))  # On Monday returns Wednesday
run(timedelta(days=2))  # On Tuesday reruns Thursday
```

To avoid this, all values which cause the output to change should be pasted in as parameters and any randomness removed.

### Idempotence

> ...in imperative programming, a subroutine with side effects is idempotent if the system state remains the same after one or several calls ...
>
> https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning

Idempotency allows for work to be run multiple times, for example in case of failure because of a network error. The job can just be re-run as there will be no effect by the partial work that was already completed.

### Lineage

Lineage is important to build trust in the data processing. It provides a high level view of what is going on in the system. Even if a user is not technical or interested in the fine details, lineage and answer questions of where data is coming from?, where is it going?, what are the source? and what are the syncs?

Lineage can be constructed in different ways but are all driven off metadata. Some examples are as follows.

#### Foundry

Foundry from [Palantir](https://www.palantir.com/palantir-foundry/) uses Python decorators to set where inputs and outputs come from.

Each function is then purely functional and does not mutate state outside of the function. Pipelines can then be build connecting inputs and outputs.

```python
@transform(
  output_1='c',
  input_1='a',
  input_2='b',
)
def compute(input_1, input_2):
  """Dataset c is derived from datasets a and b
  """
  ...
  return df
```

```python
@transform(
  output_1='d',
  input_1='c',
)
def compute(input_1):
  """Dataset d is then derived from dataset c
  """
  ...
  return df
```

#### DBT

[DBT](./dbt) runs on top of SQL but instead uses templates to compile statements. The raw SQL now just includes references to where data comes from instead of hard coding tales.

Static analysis can be done to work out a graph showing how the statements link together.

```sql
SELECT a
FROM {{ source("a") }}
```

```sql
SELECT b
FROM {{ source("b") }}
```

```sql
SELECT a, b
FROM {{ ref("a") }}
JOIN {{ ref("b") }}
```

Airflow
```
```

Prefect
```
```

### Stateless
### Static flow analysis  
### Data checks

## Related Articles

- https://gtoonstra.github.io/etl-with-airflow/principles.html
- https://medium.com/@rchang/a-beginners-guide-to-data-engineering-part-ii-47c4e7cbda71
- https://docs.prefect.io/core/advanced_tutorials/task-guide.html
- https://docs.prefect.io/core/advanced_tutorials/visualization.html
- https://docs.prefect.io/core/examples/cached_task.html
