---
id: databricks
title: Databricks
---

## Introduction

Databricks is a managed spark environment. It allows both exploration of data and running scheduled jobs. The use of a UI can be used using a user account but databricks also has great service principle access to allow CI pipelines to shine.

- https://databricks.com/
- https://docs.databricks.com/dev-tools/api/latest/index.html#apis

Databricks exists in all the major cloud providers and provides the same abilities and functionality, but this guide will focus on the Azure flavour.

- https://azure.microsoft.com/en-us/services/databricks/
- https://cloud.google.com/databricks
- https://aws.amazon.com/quickstart/architecture/databricks/

## Azure

Authenticate with azure can be done using a personal account or using a service principle via a CI pipeline. Make sure your logged in:

```bash
az login
az account show
```

## Create a Databricks workspace

Create a databricks workspace where the code will be deployed to and the clusters maintained.

```bash
LOCATION=westeurope
RESOURCE_GROUP=<GROUP>
DATABRICKS_WORKSPACE=<NAME>
SKU=standard

az databricks workspace create \
            --location $LOCATION \
            --resource-group $RESOURCE_GROUP \
            --name $DATABRICKS_WORKSPACE \
            --sku $SKU
```

## Authentication Tokens

For using the Databricks REST API there needs to be a token created. This is different than the Azure AD token when login in.

```bash    
RESOURCE_GROUP=<GROUP>
DATABRICKS_WORKSPACE=<NAME>

tenantId=$(az account show --query tenantId -o tsv)
wsId=$(az resource show --resource-type Microsoft.Databricks/workspaces -g "$RESOURCE_GROUP" -n "$DATABRICKS_WORKSPACE" --query id -o tsv)
# Get a token for the global Databricks application.
# The resource name is fixed and never changes.
token_response=$(az account get-access-token --resource 2ff814a6-3304-4ab8-85cb-cd0e6f879c1d)
token=$(jq .accessToken -r <<< "$token_response")
# Get a token for the Azure management API
token_response=$(az account get-access-token --resource https://management.core.windows.net/)
azToken=$(jq .accessToken -r <<< "$token_response")
```

## One Time Setup

This first setup just needs to be run once and will make sure that the jobs and secrets are in place. You could save details such as the datalake connection details.

```bash
DATALAKE_USERNAME=<CLIENT_ID>
DATALAKE_PASSWORD=<CLIENT_SECRET>

jobId=$(curl https://westeurope.azuredatabricks.net/api/2.0/jobs/create \
            -X POST \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId" \
            -d '{"name": "<JOB_NAME>", "new_cluster": {"num_workers": 0, "spark_version": "7.5.x-scala2.12", "node_type_id": "Standard_D3s_v2"}}' | jq -r .job_id)

curl https://westeurope.azuredatabricks.net/api/2.0/secrets/scopes/create \
            -X POST  \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId" \
            -d '{"scope": "databricks-secrets", "initial_manage_principal": "users"}'

curl https://westeurope.azuredatabricks.net/api/2.0/secrets/put \
            -X POST  \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId" \
            -d '{"scope": "databricks-secrets", "key": "datalake-username", "string_value": "'$DATALAKE_USERNAME'"}'

curl https://westeurope.azuredatabricks.net/api/2.0/secrets/put \
            -X POST  \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId" \
            -d '{"scope": "databricks-secrets", "key": "datalake-password", "string_value": "'$DATALAKE_PASSWORD'"}'
```

## Sample Application

Create a Python file

```python
# main.property
import os
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

spark.conf.set("fs.adl.oauth2.access.token.provider.type", "ClientCredential")
spark.conf.set("fs.adl.oauth2.client.id", os.environ["DATALAKE_USERNAME"])
spark.conf.set("fs.adl.oauth2.credential", os.environ["DATALAKE_SECRET"])
spark.conf.set("fs.adl.oauth2.refresh.url", "https://login.microsoftonline.com/<TENANT_ID>/oauth2/token")

spark.sql("""
    SELECT COUNT(*)
    FROM orc.`adl://<DATALAKE_NAME>.azuredatalakestore.net/<PATH>`
""").show()

```

and a job definition file:

```python
#job-definition.json
{
  "name": "<JOB_NAME>",
  "new_cluster": {
    "spark_version": "7.5.x-scala2.12",
    "spark_conf": {
      "spark.master": "local[*]",
      "spark.databricks.cluster.profile": "singleNode"
    },
    "node_type_id": "Standard_DS3_v2",
    "driver_node_type_id": "Standard_DS3_v2",
    "custom_tags": {
      "ResourceClass": "SingleNode"
    },
    "spark_env_vars": {
      "DATALAKE_PATH": "adl://<DATALAKE_NAME>.azuredatalakestore.net",
      "REFRESH_URL": "https://login.microsoftonline.com/<TENANT_ID>/oauth2/token",
      "PYSPARK_PYTHON": "/databricks/python3/bin/python3",
      "DATALAKE_SECRET": "{{secrets/databricks-secrets/datalake-password}}",
      "DATALAKE_USERNAME": "{{secrets/databricks-secrets/datalake-username}}"
    },
    "enable_elastic_disk": true,
    "azure_attributes": {
      "first_on_demand": 1,
      "availability": "ON_DEMAND_AZURE",
      "spot_bid_max_price": -1.0
    },
    "num_workers": 0
  },
  "email_notifications": { },
  "timeout_seconds": 0,
  "spark_python_task": {
    "python_file": "dbfs:/python/main.py"
  },
  "max_concurrent_runs": 1
}

```

## Regular Deployment

The following CI commands will be used to run a regular deployment once either the `main.py` or `job-definition.json` have changed.

```bash
FILE=main.py
JOB_ID=17

curl https://westeurope.azuredatabricks.net/api/2.0/dbfs/put \
            -F contents=@$FILE \
            -F path='dbfs:/python/'$FILE \
            -F overwrite="true" \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId"

JSON='{"job_id":"'$JOB_ID'", "new_settings":'$(cat job-definition.json)'}'
curl https://westeurope.azuredatabricks.net/api/2.0/jobs/reset \
            -X POST \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer $token" \
            -H "X-Databricks-Azure-SP-Management-Token:$azToken" \
            -H "X-Databricks-Azure-Workspace-Resource-Id:$wsId" \
            -d "$JSON"
```  
