---
id: proxy
title: Proxy
---

## Introduction

Proxies can be used to route http requests via another server.

## Setup Proxy

Datadog has created a simple proxy - https://hub.docker.com/r/datadog/squid. Though it has not been updated in years. The following changes will allow everyone to connect to the proxy.

```docker

FROM datadog/squid:latest

RUN sed -i 's/http_access deny all/http_access allow all/g' /etc/squid/squid.conf

```

## CURL

The simplest example is to use curl 

```bash
❯ curl https://api.myip.com
{"ip":"109.56.28.21","country":"Denmark","cc":"DK"}

❯ curl --proxy <australian_instance>:3128 https://api.myip.com
{"ip":"2604:1380:4070:805:0:29cd:dbaa:1","country":"Australia","cc":"AU"}%
```


## Golang

```go

proxyUrl, err := url.Parse(http://<PROXY_ADDRESS>:<PROXY_PORT>)
if err != nil {
    log.Fatal(err)
}

client := &http.Client{Transport: &http.Transport{Proxy: http.ProxyURL(proxyUrl)}}

req, err := http.NewRequest("GET", "https://www.google.com", nil)
if err != nil {
    log.Fatal(err)
}

_, err = client.Do(req)
``` 

## Python

```python

import requests

proxies = {
   'http': 'http://<PROXY_ADDRESS>:<PROXY_PORT>',
   'https': 'http://<PROXY_ADDRESS>:<PROXY_PORT>',
}

response = requests.post('https://www.google.com', proxies=proxies)


```