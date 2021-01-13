---
id: spark
title: Spark
---

## Introduction

> Apache Spark™ is a unified analytics engine for large-scale data processing.
>
> https://spark.apache.org/

## Concepts

### Partitions and Clusters

...

## Data Lakes

### Azure Datalake Gen1

To be able to read data from the Azure Datalake the following commands can be run.

Personal user account:

Get the client id and refresh token

```bash
az login
cat ~/.azure/accessTokens.json | jq .
```

```python
spark.conf.set("fs.adl.oauth2.access.token.provider.type", "RefreshToken")
spark.conf.set("fs.adl.oauth2.client.id", "<AZURE CLIENT>")
spark.conf.set("fs.adl.oauth2.refresh.token", "<REFRESH TOKEN>")

spark.read.format("avro").load("adl://<DATALAKE>.azuredatalakestore.net/directory/dataframe").show()
```

Service Principle:

```python
spark.conf.set("fs.adl.oauth2.access.token.provider.type", "ClientCredential")
spark.conf.set("fs.adl.oauth2.client.id", "<AZURE CLIENT>")
spark.conf.set("fs.adl.oauth2.credential", "<AZURE SECRET>")
spark.conf.set("fs.adl.oauth2.refresh.url", "https://login.microsoftonline.com/<TENANT ID>/oauth2/token")

spark.read.format("avro").load("adl://<DATALAKE>.azuredatalakestore.net/directory/dataframe").show()
```

## Snippets

### Displaying Dataframes in Jupyter lab

To install qgrid in Jupyter lab we need to do:

```
poetry add qgrid=="XXXXX"
poetry run jupyter labextension install @jupyter-widgets/jupyterlab-manager
poetry run jupyter labextension install qgrid2
```

The following has to be added to the Jupyter startup files and will allow us to display a Spark Dataframe using qgrid. When using Databricks Connect it has problems converting timestamps, so this fixes the issues.

```python
import datetime

from pyspark.sql import functions as F

def display(df, limit=20):
    try:
        import qgrid
    except:
        raise Exception("Please Install qgrid to use display")

    df = df.limit(limit)

    # Databricks Connect has issues with timestamps and converting them using .toPandas()
    # This work around turns them into an int before going to pandas and then converting it back
    # to a datetime once in Pytohn

    timestamp_columns = [c[0] for c in df.dtypes if c[1] == 'timestamp']

    for column in timestamp_columns:
        df = df.withColumn(column, F.unix_timestamp(column))

    df = df.toPandas()

    for column in timestamp_columns:
        df[column] = df[column].map(datetime.datetime.fromtimestamp)

    return qgrid.show_grid(df, grid_options={'forceFitColumns': False})
```

## Databricks

### Profiles

### Databricks Connect

### File System (DBFS)
