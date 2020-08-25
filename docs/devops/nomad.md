---
id: nomad
title: Nomad
---

## Introduction

> A simple and flexible workload orchestrator to deploy and manage containers and non-containerized applications across on-prem and clouds at scale.
>
> https://www.nomadproject.io/

Its a really simple light-weight tool to manage multiple applications. It has a nice dev mode which makes it good to run locally.

To get started download the binary from: https://www.nomadproject.io/downloads and then:

```
nomad agent -dev
```

```
open localhost:4646
```



## Driver Raw - Golang Webserver

Nomad can run simple binarys. This works well if the app can be converted into a binary such as with [golang](../languages/golang).

To create a really simple applications such as a web server in golang: `go-web-server.go`

```go
package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })

    http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hi")
    })

    log.Fatal(http.ListenAndServe(":8081", nil))

}

```

Build:

```bash
go build go-web-server.go
```

Create a Nomad job: `go-web-server.nomad`

```yaml
job "docs" {
  datacenters = ["dc1"]

  group "example" {
    task "server-go" {
      driver = "raw_exec"

      config {
        command = ".../go-web-server"
      }

      resources {
        network {
          mbits = 10

          port "http" {
            static = "8081"
          }
        }
      }
    }
  }
}
```

Run the app:

```bash
nomad job run go-web-server.nomad
```

## Driver Docker


## Viewing Logs`

Every time an application is launched it is given an allocation. Using this ID and the following command:

```
nomad alloc logs -f <ID HERE>
```
