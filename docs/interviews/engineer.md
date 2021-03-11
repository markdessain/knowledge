---
id: engineer
title: Engineer
---

## Introduction

## Design Questions

### Microservices

> What are some of the advantages of using micro services?

- Services can be reused in different contexts
- Services can easily be replaced
- Services can scale based on their own needs

> What are some of the disadvantages of using micro services?

- Microservices Are More Complex.
  - A mixtures of programming languages in services
  - Data consistency between services
  - Large amount of refactoring from an existing monolith
  - Integration testing becomes much harder and with extra overhead when ensuring the services work well together.
  - Duplication of designing how the deploy and manage the services
  - The number of processes can grow exponentially when load balancing and messaging middleware are considered
- Microservices Require Cultural Changes
- Microservices Are Often More Expensive Than Monoliths
  - High number of remote call between services going over a network can be slower and add in latency
  - More checks needed to handle failures and timeouts
- Microservices Can Present Security Threats
  - More traffic is exposed to the network as services communicate with each other
  - Higher volume of data been shared
- Requires excellent API management and documentation
- Often services scaling ability is tightly coupled
- https://www.tiempodev.com/blog/disadvantages-of-a-microservices-architecture/
- https://www.digitalroadmap.management/blog/2020/7/17/advantages-and-disadvantages-of-microservices

## Language Questions

### Java

> What is the latest version of Java? (As of February 2021)

- Java 11 for Long Term Support - September 2018
- Java 15 - September 2020

> Name some of the most recent changes to the Java programming language since Java 8.

- Text Blocks
- Sealed Classes
- Records
- Switch Expressions
- `var` for local variables
- Lambda expressions

### Spring

> Spring is split into a number of different projects. Can you name a few of the projects you have used?

- Spring Data
- Spring Cloud
- Spring Security
- Spring Session
- https://spring.io/projects/spring-boot

> Can you name some of the components that make up Spring Cloud?

- Spring Cloud Azure
- Spring Cloud Amazon Web Services
- Spring Cloud Kubernetes

> What does the Spring Boot Actuator do?

- It includes a number of additional features that help us to monitor and manage the Spring Boot application

## Programming Questions

### Program Flow

### Databases

### Compression

> Compression is the method of reducing the size of something. There are two types of compression that can be used, can you describe what they are and how they work?

- Lossless compression: No data is lossed while the size is still reduced. You can group common points together, if there are 100 green pixels next to each other in a row, it can be replaced by a count.
- Losey Compression: Data is losed such as if you reduce the size of an image from 1000px by 1000px to 100px by 100px. The original pixels can not be recovered,

> There is a file of many characters (0-9) which is 1GB in size when written to disk. Explain a simple way in which it can be compressed.

> Example: 11111111122444444443331111111 ...

- Count consecutive numbers so we end up with 91 22 84 33 71 ...

```python

def f1(x, char=None, count=0):
    if not x:
        return str(count) + str(char)
    elif x[0] == char:
        return f(x[1:], char, count+1)
    else:
        if char:
            return str(count) + str(char) + f(x[1:], x[0], 1)
        else:
            return f(x[1:], x[0], 1)
```

```python
def f2(x):
    char = x[0]
    count = 1
    index = 1
    output = ""

    while index < len(x):
        if x[index] == char:
            count += 1
        else:
            output += str(count) + str(char)
            count = 1
            char = x[index]

        index += 1

    output += str(count) + str(char)

    return output

```
