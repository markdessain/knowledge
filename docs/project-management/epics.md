---
id: epics
title: Epics
---

import Mermaid from '@theme/Mermaid';

## Introduction

Any software project can often break down in the following high level epics which tasks can fall under. They follow a software project through from its development stages and maintenance once deployed and running.

<div>
<Mermaid chart={`
  graph LR;
    project([Project]);
    api([API]);
    security([Security]);
    dataengineering([Data Engineering]);
    datacollection([Data Collection]);
    visibility([Visibility and Metrics]);
    dashboards([Dashboards and Alerts]);
    infrastructure([Infrastructure]);
    architecture([Architecture]);
    finances([Finances]);
    development([Development Practices]);
    community([Community of Practice]);
    project-->api;
    project-->security;
    project-->dataengineering;
    project-->datacollection;
    project-->visibility;
    project-->dashboards;
    project-->infrastructure;
    project-->architecture;
    project-->finances;
    project-->development;
    project-->community;
`}/>
</div>

## Progress

Keep an overview of each epic as to the current state and the hopeful direction in three months time. For example an API change maybe required in the near future.

<div>
<Mermaid chart={`
  graph LR;
    project([Project]);
    api([API]);
    other([...]);
    today([Today: API is serving a single region]);
    future([Future: Deployed to handle multiple<br /> regions to improve latency]);
    tasks([Tasks]);
    database([Split out Database]);
    geoload([Add in Geo load banancer]);
    othertask([...]);
    project-->api;
    project-->other;
    api-->today;
    api-->future;
    api-->tasks;
    tasks-->database;
    tasks-->geoload;
    tasks-->othertask;
`}/>
</div>
