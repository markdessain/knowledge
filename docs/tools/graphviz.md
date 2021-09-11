---
id: graphviz
title: graphviz
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Introduction

Graphviz allows diagrams to be generated automatically and allow versions to be diffed which is not possible with traditional diagram tools.

The diagrams can be compiled into multiple format types.

## Compiling

```bash
cat ./example.dot | dot -Tpng > ./dot-example.png
cat ./example.dot | dot -Tsvg > ./dot-example.svg
```

## Example


<img alt="Example" src={useBaseUrl('/img/dot-example.svg')} />


```dot

digraph {

  graph [fontname = "helvetica"];
  node [shape=record fontname = "helvetica"];
  edge [fontname = "helvetica"];

  rankdir="TB"

  subgraph cluster_datalake {
    margin=20
    fontname=helvetica
    color=transparent
    label=""

    datalake [fillcolor="#B7D6D9" style="filled" shape=cylinder label="datalake"]

    note1 [fillcolor="lightyellow" style="filled" label="The datalake. \l" margin=0.2 shape=note]
  }

  subgraph cluster_spark {
    style="filled"
    fillcolor="#fae9e1"
    margin=30
    fontname=helvetica
    label=< <BR/><B>Spark on Kubernetes</B> >
    color="#E58E61"
    penwidth=1
    fontsize=14

    b
    a
    c

    signals

    a -> signals
    b -> signals
    c -> signals

    note2 [fillcolor="lightyellow" style="filled" label="Run processing on spark. \l" margin=0.2 shape=note]
  }

  subgraph cluster_spark2 {
    style="filled"
    fillcolor="#fae9e1"
    margin=30
    fontname=helvetica
    label=< <BR/><B>Databricks</B> >
    color="#E58E61"
    penwidth=1
    fontsize=14

    e
    d

    signals2

    d -> signals2
    e -> signals2
  }

  subgraph cluster_database {
    margin=20
    fontname=helvetica
    color=transparent
    label=""

    "database" [fillcolor="#B7D6D9" style="filled" shape=cylinder]

    note3 [fillcolor="lightyellow" style="filled" label="Store the data. \l" margin=0.2 shape=note]
  }

  subgraph cluster_api {
    style="filled"
    fillcolor="#f1f7dc"
    margin=30
    fontname=helvetica
    label=< <BR/><B>API</B> >
    color="#b0c272"
    penwidth=1
    fontsize=14

    "app"
    "gateway"

    note5 [fillcolor="lightyellow" style="filled" label="Secure API. \l" margin=0.2 shape=note]
  }

  subgraph cluster_consumer {
    style="filled"
    fillcolor="#e6f5ff"
    margin=30
    fontname=helvetica
    label=< <BR/><B>Signal Consumer</B> >
    color="#3D6E8D"
    penwidth=1
    fontsize=14

    cli
    apps
    developer

    note6 [fillcolor="lightyellow" style="filled" label="Users can be developers, \lother applications or cli. \l" margin=0.2 shape=note]
  }

  datalake -> a
  datalake -> b
  datalake -> c
  datalake -> d
  datalake -> e

  signals -> database
  signals2 -> database

  database -> app

  app -> gateway

  gateway -> cli
  gateway -> apps
  gateway -> developer
}


```
