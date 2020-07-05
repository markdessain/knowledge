# Preferred Path

## Maestro

### Sources

* Systems of Engagement
* Systems of Record

## Syncing Data

ADF (Azure Data Factory) is used to data which is not needed in real time
OGG (Oracle Golden Gate) is for real time data

## What does Real Time mean?

5 minutes is near real time, where it goes into the data lake
2-3 seconds is real time, where it goes into the event hub. It then goes into Azure Analytics

## Storage and Compute

These are both separated, and it has a bring your own compute model where each team can bring their own cluster.

Each product team will manage their own clusters, auto scale etc.

In the future the raw data will not be accessible from the data bricks compute cluster.

Azure Analytics is used to compute the streaming data.

Azure event hub will write the data to the data lake as well as been able to use the data in real time.

## Meta Data

It uses Hive tables. There will be a meta cluster which will hold all the metadata. It stores object level information, what objects and what columns

## ADFs

It was pointed out in an earlier meeting that deploying would stop the whole pipeline.

Azure ADF Analytics is a tool which helps you operationally manage all the ADFs

## SQL / Cosmos

SQL DB is just a standard row based database, for smaller volumes.
SQL Data Warehouse is a column based data warehouse.

For the reporting layers most teams have been using SQL DB as there is little processing at this stage and the queries are just retrieving records.

Cosmos is a NoSQL DB.

## Self Service

This layer will use in memory cubes in Analysis Services for fast access for batch data.

The SQL DB can be bypassed for real time app and go straight to the Event Hub

## Timelines from Source to Self Service


## Lineage

