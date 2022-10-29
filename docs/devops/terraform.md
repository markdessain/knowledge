---
id: terraform
title: Terraform
---

## Introduction

## Locking Versions

```terraform
provider "azurerm" {
   features {}
}

terraform {
  required_version = "~> 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.26.0"
    }
  }
}
```

## Variables

```terraform
variable "resource_group_name" {}
variable "location" {}
```

## Locals

```terraform
locals {
  eventhubs = {
    ux = {partition_count = 4, message_retention = 7 },
  }
}
```

## Resource

```terraform
resource "azurerm_storage_account" "storage" {
  name = "name"
}
```

## Module

```terraform
module "hello_world" {
   # module outputs a name parameter
   source = "../resource_folder"
}
```

# For Loops

```terraform
resource "azurerm_eventhub" "topics" {
  for_each = local.eventhubs

  name                = each.key
  partition_count     = each.value.partition_count
  message_retention   = each.value.message_retention
}
```

## References

```terraform
var.location
local.eventhubs.ux.partition_count
azurerm_storage_account.storage.name
module.hello_world.name
azurerm_eventhub.topics["ux"]
```

# Maps

```terraform
resource "azurerm_linux_function_app" "app" {

  app_settings = merge(
    {
      for key, value in local.regional_eventhubs:
        "name_${key}" => value.primary_key
    }, 
    {another_key = "abc}
  )
}
```