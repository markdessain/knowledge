---
id: dbt
title: DBT
---

## Prehooks

Good for local development

```yaml
models:
  +pre-hook: "SET spark.sql.shuffle.partitions = 4"
```





## Run Sources inside DBT

DBT is not supposed to handle importing data, but to get it from the file system into the Spark Database we can have a source folder and disable it once it has been imported.



List all the sources (models/sources.yml):

```yaml
version: 2

sources:
  - name: analytics
    tables:
      - name: ...
      - name: ...

```

Enable the sources (dbt_project.ym)

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

Disable the sources

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
