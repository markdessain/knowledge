# Docker

## Build Image:
```
cd ~/projects/docker/spark
docker build -t spark .
```

## Run App:
```
docker run -it -v $(pwd):/app -w /app spark python3 main.py
```

## Run GUI App:
```
xhost +
docker run -it -v $(pwd):/app -e DISPLAY=docker.for.mac.host.internal:0 -w /app spark python3 main.py
```

