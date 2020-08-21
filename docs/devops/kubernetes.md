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
