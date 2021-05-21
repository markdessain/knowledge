---
id: environments
title: Environments
---

import Mermaid from '@theme/Mermaid';

## Introduction

Technical projects have a number of different environments to ensure stability and also to give development the flexibility to try new things out.

## Principles

### Higher and Lower Environments

Environments are split into two segregated areas named as `Lower` and `Higher`. In the lower environments all team members have complete access to run any command they wish. This may involve creating resources, updating resources or deleting resources, the aim been to ensure a fast development cycle.

Once something concrete has been produced it must be wrapped up into an artifact and placed into some kind of repository.

The artifact will then be provisioned in the `Higher` environments via the automated pipeline by a service principal.

<div>
<Mermaid chart={`
  graph TB;
    classDef access opacity:0.6;
    evaluation([Evaluation]);
    development([Development]);
    staging([Staging]);
    production([Production]);
    artifact[Artifact];
    artifact2[Artifact];
    users([Users: Contributor Access]);
    users2([Users: Read Access]);
    spn([Service Principle: Contributor Access]);
    class users access;
    class users2 access;
    class spn access;
    subgraph Lower
      evaluation
      development
      artifact
      users
    end
    subgraph Higher
      artifact2
      staging
      production
      users2
      spn
    end
    evaluation --> development;
    development --> artifact;
    artifact -- repository --> artifact2;
    artifact2 --> staging;
    staging --> production
`}/>
</div>

### Approvals

The code should be approved at different stages in the pipeline.

The first time is the `Code Review Approval`. Once the code has been committed into a feature branch is must have at least one more person check and approve the code before it is merged into a main branch.

The second time is the `Release Approval`. Once the code has been put into the main branch and is waiting to be deployed it should go through a release approval to check that a deployment is allowed to happen at this time. This constraint could be to ensure releases only happen between Monday and Thursday.

<div>
<Mermaid chart={`
  graph TB;
    lower([...]);
    staging([Staging]);
    production([Production]);
    artifact[Artifact];
    artifact2[Artifact];
    subgraph Lower
      lower
      artifact
    end
    subgraph Higher
      artifact2
      staging
      production
    end
    lower --> artifact;
    artifact -- Code Review Approval --> artifact2;
    artifact2 -- Release Approval --> staging;
    staging -- Release Approval --> production
`}/>
</div>

### Continuous Integration To Handle Deployments

Deployments should be a simple process where all the work has been done up front. To deploy a piece of code it should just be a one click process.

Once a deployment has started a service principal will take over, and once the deployment has completed it should end in a `Success` or `Failed` state. If possible a `Failed` state should trigger a rollback, but again a single one click process it also an option.

### No Single Person Can Break Production

The approval process should prevent one single person from breaking anything in production. It's import to have two pairs of eye on any change, even when there is a production outage and a quick change is needed.

There is one exception where developers can request `Break Glass` access. If the Production environment is broken and it is costing $$$$ per minute while it is broken a more expedited release maybe needed involving just a single person. `Break Glass` is closely audited and any use should result in a detailed post-mortem.

### Higher Environments Do Not Access Lower Environments

Artifacts should be pushed from a `Lower` environment to a `Higher` by a automated pipeline. A `Higher` environment should never have access to or attempt to pull any data from a `Lower` environment. This is because a `Lower` environment could be deleted or modified for testing purposes in a way that the `Higher` environment was not expecting.
