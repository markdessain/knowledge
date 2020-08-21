---
id: spark
title: Spark
---

## Running Spark with DBT locally

Download spark-2.4.6-bin-hadoop2.7

Run the thrift server:

```bash
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
