---
id: dbt
title: Data Build Tool (DBT)
---

## Introduction

> dbt (data build tool) enables analytics engineers to transform data in their warehouses by simply writing select statements. dbt handles turning these select statements into tables and views.
>
> https://docs.getdbt.com/docs/introduction

## Executors

### Spark

#### Local Development

For local development a thrift server has to be running before starting DBT.

```bash
Download spark-2.4.6-bin-hadoop2.7

~/bin/spark-2.4.6-bin-hadoop2.7/sbin/start-thriftserver.sh --driver-memory 5G --total-executor-cores 4
```

Setup DBT profile:

```yaml
databricks:
  target: local
  outputs:
    local:
      method: thrift
      type: spark
      schema: analytics
      host: 127.0.0.1
      port: 10000
      user: dbt
      connect_retries: 5
      connect_timeout: 60
```

Submit DBT run:

```bash
poetry run dbt run
```

Good for local development in the `dbt_project.yml` file:

```yaml
models:
  +pre-hook: "SET spark.sql.shuffle.partitions = 4"
```

## Run Sources inside DBT

DBT is not supposed to handle importing data, but to get it from the file system into the Spark Database we can have a source folder and disable it once it has been imported.



List all the sources `models/sources.yml`:

```yaml
version: 2

sources:
  - name: analytics
    tables:
      - name: ...
      - name: ...

```

Enable the sources `dbt_project.yml`:

```yaml
models:
  ...
    sources:
      +tags: sources
      +enabled: true
```

Run the tag:

```bash
poetry run dbt run --models tag:sources
```

Disable the sources:

```yaml
models:
  ...
    sources:
      +tags: sources
      +enabled: false
```

Continue as usual:

```bash
poetry run dbt run
```
