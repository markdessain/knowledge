---
id: golang
title: Golang
---

## Wait Groups

Wait groups allow multiple jobs to be spun off at the same time and the we can wait until they are all completed.

```go

package main

import (
  "time"
  "math/rand"
  "sync"
  "github.com/schollz/progressbar/v3"
)

func main() {
  wg := sync.WaitGroup{}
  bar := progressbar.Default(8)

  wg.Add(8)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  go task(&wg, bar)
  wg.Wait()
}


func task(wg *sync.WaitGroup, bar  *progressbar.ProgressBar) {
  defer wg.Done()
  defer bar.Add(1)

  rand.Seed(time.Now().UnixNano())
  min := 1
  max := 10
  sleepTime := time.Duration(rand.Intn(max - min + 1) + min)
  time.Sleep(sleepTime * time.Second)
}

```

## Channels

Channels allow for messages to be passed between parallel code executions.

In this example we have eight background tasks running which return at different times. As soon as one has completed it can then be further processed without having to wait for all the tasks to complete.

The channel reader will block until the channel is closed. So once all the tasks have completed it must be closed otherwise the program will end up in a deadlock.


```go
package main

import (
  "fmt"
  "time"
  "math/rand"
  "sync"
)

func main() {
  wg := sync.WaitGroup{}
  ch := make(chan int)

  wg.Add(8)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)
  go task(&wg, ch)

  go closer(&wg, ch)

  display(ch)

}

func task(wg *sync.WaitGroup, ch chan int) {
  defer wg.Done()

  rand.Seed(time.Now().UnixNano())
  min := 1
  max := 10
  sleepTime := time.Duration(rand.Intn(max - min + 1) + min)
  time.Sleep(sleepTime * time.Second)

  ch <- int(sleepTime)
}

func closer(wg *sync.WaitGroup, ch chan int) {
  wg.Wait()
  close(ch)
}

func display(ch chan int) {
  for i := range ch {
    fmt.Println(i)
  }
}
```


## Useful Articles

- https://blog.golang.org/using-go-modules
- https://chollinger.com/blog/2020/06/a-data-engineering-perspective-on-go-vs.-python-part-1/
- https://chollinger.com/blog/2020/07/a-data-engineering-perspective-on-go-vs.-python-part-2-dataflow/#introduction
- https://github.com/Evertras/go-interface-examples/tree/master/local-interfaces
