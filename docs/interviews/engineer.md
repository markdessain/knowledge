---
id: interview-engineer
title: Engineer
---


## Introduction

## Questions

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
