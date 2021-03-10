---
id: jq
title: jq
---

## Introduction

`jq` is a useful command line tool for parsing json objects.

A simple example of using it is:

```bash
echo "[1,2,3,4,5,6]" | jq .
```

```bash
[
  1,
  2,
  3,
  4,
  5,
  6
]
```

## Install

Mac: `brew install jq`

## Commands

### Raw output

```bash
echo '"a"' | jq .
echo '"a"' | jq -r .
```

```bash
"a"
a
```

### Selecting a single inner item

```bash
echo '{"items": [{"id":1, "name": "a"},{"id":2, "name": "b"},{"id":3, "name": "c"}]}' | jq ".items[].name"
```

```bash
"a"
"b"
"c"
```

### Select multiple inner items

```bash
echo '{"items": [{"id":1, "name": "a", "ignore": "me"},{"id":2, "name": "b"},{"id":3, "name": "c"}]}' | jq ".items[] | {id, name}"
```

```bash
{
  "id": 1,
  "name": "a"
}
{
  "id": 2,
  "name": "b"
}
{
  "id": 3,
  "name": "c"
}
```

### Selecting n items from a list

Single item at index

```bash
 echo "[1,2,3,4,5,6]" | jq ".[2]"
```

```bash
3
```

First two items

```bash
echo "[1,2,3,4,5,6]" | jq ".[:2]"
```

```bash
[
  1,
  2
]
```

Last two items

```bash
echo "[1,2,3,4,5,6]" | jq ".[-2:]"
```

```bash
[
  5,
  6
]
```
