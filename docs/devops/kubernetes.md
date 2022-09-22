---
id: kubernetes
title: Kubernetes
---

## Commands

```
kubectl proxy
open http://localhost:8001
```

```
docker build -t dashboard .
kubectl create deployment dashboard --image=dashboard

kubectl get deployments
kubectl expose deployment dashboard --type=LoadBalancer --port=8080
kubectl get services

```

```
kubectl delete service dashboard
kubectl delete deployment dashboard

kubectl scale deployment dashboard --replicas=0

kubectl apply -f app.yaml
```

```
kubectl get deployments
kubectl get services
kubectl get pods
kubectl get secrets
```


## Helm

Helm made some major changes in helm 3.6 so these commands will only work for prior versions.

Saving a heml into a repository is optional as we can run the `helm upgrade` straight from the code repository.

Directories:
./helm/chart/Chart.yaml
./heml/chart/templates/ingress.yaml
./heml/chart/templates/service.yaml
./heml/chart/templates/deployment.yaml
./heml/chart/values/dev/values.yaml
./heml/chart/values/prod/values.yaml

Save a deployment into a repository:
```bash
helm chart save ./helm/chart ghcr.io/<ORG>/<PACKAGE>:<VERSION>  
helm chart push ghcr.io/<ORG>/<PACKAGE>:<VERSION>
helm chart export ghcr.io/<ORG>/<PACKAGE>:<VERSION>
```

Run a Deployment
```bash
helm upgrade \
--debug \
--install audience-delivery \
./helm/chart/ \
--values ./helm/chart/values/<ENVIRONMENT>/values.yaml \
--values ./helm/<OVERWRITE>.yaml \
-n audience-platform-dev \
--wait \
--timeout 10m0s
```

