# Docker: Build & Run (static portfolio)

This project is a static portfolio site. The included `Dockerfile` uses `nginx` to serve the files in the repository root.

Build the image (run from project root):

```powershell
docker build -t portfolio1:latest .
```

Run the container and map port 80 in the container to port 8080 on the host:

```powershell
docker run -d --name portfolio1 -p 8080:80 portfolio1:latest
# then open http://localhost:8080
```

Stop and remove the container:

```powershell
docker stop portfolio1; docker rm portfolio1
```

Optional: use different host port by changing `-p HOSTPORT:80`.
