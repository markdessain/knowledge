---
id: java
title: Java
---

## Introduction

## Reactive Programming

Reactive programming allows Java users to define a pipeline simular to how you would do with data tools such as Apache Spark. There are two main concepts. `Mono` and `Flux`.

A Mono holds a single value and a Flux container multiple values. Monos can be joined together to make a Flux and a Flux can be reduced down to a Mono.

An example below shows a simple flow.

```java
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

Mono<String> x = Mono.just("Abc");
Mono<String> y = Mono.just("xyZ");

Flux<String> s = Flux
        .concat(x, y)
        .map(z -> z + "!");

Mono<String> r = s
        .reduce("", (x1, x2) -> x1 + x2)
        .map(z -> z.toLowerCase(Locale.ROOT));

System.out.println(r.block());
```

At some point at the end of the flow you will need to collect the result. A `block()` call will wait for the result.

The advantage of using reactive programming is that we just define what computation needs doing. We let Java decide about how to maximuis the concurrency and to ensure it is completed as fast as possible.

There are more complex operations such as how to handle errors and performing retries.