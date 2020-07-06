# Ontology Dashboard

## Introduction

I wanted to explore how we can have host and run code not directly related to data pipelines. This could be things like our own developer tools or just playground projects we want to test out not related to the main core Ontology.

Essentially a place we can easily deploy code that isn’t business critical.

John wanted to see a Dashboard that lists when each source was last synced to ADLS, this would replace an existing email that is sent.

## Solution

I worked with the Digital Platform team to allow us to deploy applications or jobs into the companies Kubernetes cluster.

This solution is *not* for the Ontology

## Product

* URL: [Ontology Dashboard](https://ontology-dashboard.dev.maersk-digital.net/)
* Repository: [ontology-dashboard](https://bitbucket.org/maersk-analytics/ontology-dashboard/src/master/)

## Technology

* *Backend:*
	* Python - [Welcome to Python.org](https://www.python.org/)
	* Azure CLI  - [Overview of the Azure CLI | Microsoft Docs](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
* *Frontend:*
	* React JS - [React – A JavaScript library for building user interfaces](https://reactjs.org/)
	* BlueprintJS for UI components - [Blueprint – A React-based UI toolkit for the web](https://blueprintjs.com/)
	* CDN - [UNPKG](https://unpkg.com/)
* *Deployment:*
	* Kubernetes / Docker for containerisation - [Production-Grade Container Orchestration - Kubernetes](https://kubernetes.io/)
	* Argo for CI/CD - [Get stuff done with Kubernetes | Argo](https://argoproj.github.io/)
* *Git:*
	* Bitbucket - [Bitbucket](https://bitbucket.org/dashboard/overview)
* *Secrets:*
	* Stored in Vault - [Vault](https://vault.maersk-digital.net/ui/)
* *Authentication:*
	* Microsoft Single Signon / OAuth2
* *Logging:*
	* Datadog - [Datadog](https://app.datadoghq.com/)
