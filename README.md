# user_study_tool

## install

- backend

```bash
docker build -t my-flask-backend .
docker run -p 5000:5000 my-flask-backend
```

- frontend

```bash
docker build -t my-react-app .
docker run -p 5173:5173 my-react-app
```

- whole application

```bash
export DOCKER_HOST=unix:///var/run/docker.sock
docker compose up –build
```
