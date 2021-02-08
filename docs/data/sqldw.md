---
id: sqldw
title: Azure SQL Datawarehouse
---

## Introduction


## Sync Data from Databricks

Docs:
- https://docs.databricks.com/data/data-sources/azure/synapse-analytics.html
- https://docs.microsoft.com/en-us/azure/databricks/data/data-sources/azure/synapse-analytics

Create:
- Storage Account and a Container for tempoary files
- SQL Data Warehouse
  - Allow Azure services and resources to access this server
  - Grant access for your local IP
- Create a SQL Master Key
- Create a Blob Storage Access Key

Create a Master Key in SQL DW
```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<RANDOM PASSWORD>';  
```

```scala
val blobStorage = "<ACCOUNT_NAME>.blob.core.windows.net"
val blobContainer = "<CONTAINER_KEY>"
val blobAccessKey =  "<ACCESS_KEY>"

val tempDir = "wasbs://" + blobContainer + "@" + blobStorage +"/tempDirs"

//Azure Synapse related settings
val dwDatabase = "<DATABASE_NAME>"
val dwServer = "<SERVER_NAME>.database.windows.net"
val dwUser = "<USER_NAME>"
val dwPass = "<PASSWORD>"
val dwJdbcPort =  "1433"
val dwJdbcExtraOptions = "encrypt=true;trustServerCertificate=true;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
val sqlDwUrl = "jdbc:sqlserver://" + dwServer + ":" + dwJdbcPort + ";database=" + dwDatabase + ";user=" + dwUser+";password=" + dwPass + ";$dwJdbcExtraOptions"
val sqlDwUrlSmall = "jdbc:sqlserver://" + dwServer + ":" + dwJdbcPort + ";database=" + dwDatabase + ";user=" + dwUser+";password=" + dwPass

spark.conf.set("spark.sql.parquet.writeLegacyFormat", "true")
spark.conf.set("fs.azure.account.key.mdessainstorage.blob.core.windows.net", blobAccessKey)

val dfResult = spark.read.parquet("<DATASET>").select(<COLUMNS>)

dfResult.write.format("com.databricks.spark.sqldw").option("url", sqlDwUrlSmall).option("dbtable", "SampleTable").option("forward_spark_azure_storage_credentials","True").option("tempdir", tempDir).mode("overwrite").save()
```
