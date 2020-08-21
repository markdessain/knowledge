---
id: python
title: Python
---

## Snippets

### Camel case to underscores

```python
import re

def convert_name(name):
    s1 = re.sub("(.)([A-Z0-9][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z])([A-Z0-9])", r"\1_\2", s1).lower().replace("__", "_")

```

## Juputer Lab

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

Running Jupyter Lab

```
poetry run jupyter lab
```
