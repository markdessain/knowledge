# Digital Platform

## Example links:

* https://bitbucket.org/maersk-analytics/platform-docs/src/master/
* https://bitbucket.org/maersk-analytics/odin-vessels/src/develop/
* https://bitbucket.org/maersk-analytics/argo-ci-templates/src/master/

## Commands

### Deploy

```
kubectl apply -R -f ./.tmp_k8s/
```

### Config

```
kubectl delete configmap ontology-dashboard --namespace maestro-ontology
kubectl create configmap ontology-dashboard --from-env-file=./projects/bitbucket/ontology-dashboard/config/dev.env  --namespace maestro-ontology
```

### Cleanup

```
kubectl delete service ontology-dashboard --namespace maestro-ontology
kubectl delete deployment ontology-dashboard --namespace maestro-ontology
kubectl delete ingress ontology-dashboard --namespace maestro-ontology
```

### Status

```
kubectl get all --namespace maestro-ontology
``

## Argo

Your team "Maestro Ontology - Core" is now enabled to build and deploy applications using the platform services.
You can get started with the following:
* Introducing Kubernetes:  [Kubernetes 101](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/630554726/Kubernetes+101) 
* Managed Kubernetes Service provided by the platform:  [Digital Platform Kubernetes Service](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/732496599/Digital+Platform+Kubernetes+Service) 
* Connect to the managed Kubernetes cluster(s), whitelist IP addresses for egress / ingress of traffic:  [Access Digital Platform Kubernetes Clusters](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/734626126/Access+Digital+Platform+Kubernetes+Clusters) 
* Build and deploy code using Argo CI:  [CI with Argo - User documentation](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/865927187/CI+with+Argo+-+User+documentation) 
* Use vault to inject secrets into the applications:  [Access and manage secrets in Vault](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/813006876/Access+and+manage+secrets+in+Vault) 
* Monitor application health and metrics using Datadog:  [Datadog](https://maersk-analytics.atlassian.net/wiki/spaces/P/pages/696877072/Datadog) 

Please reach out to the platform team for help on Slack digital-platform-ops.
Welcome to the awesome platform.
Best Regards,
Som Priani
