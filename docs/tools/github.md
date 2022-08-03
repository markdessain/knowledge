---
id: github
title: github
---

## Introduction


## Self host a Worker

Workers can be self hosted to reduce your github bill. Fly.io has a simple way in which these workers can be hosted.

Create the following config file:

```bash

app = "github-action-runner"

kill_signal = "SIGINT"
kill_timeout = 60
processes = []

[build]
  image = "myoung34/github-runner:latest"

[env]
  REPO_URL = "https://github.com/markdessain/<REPO_NAME>"
  RUNNER_NAME_PREFIX = "home"
  RUNNER_WORKDIR = "/tmp/runner/work"
  RUNNER_SCOPE = "repo"
  LABELS = "home,batch"
  DISABLE_AUTO_UPDATE = "true"

```

And launch the workers off, scaling up and down as you need.

```bash
flyctl create "github-action-runner"
flyctl secrets set ACCESS_TOKEN="..."
flyctl deploy
flyctl scale count 2
```



