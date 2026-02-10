# Docker Build and Run Instructions

## 1. Build the Docker Image

Open a terminal in the project root directory and run:

```
docker build -t automation-test-form .
```

- This command builds a Docker image named `automation-test-form` using the Dockerfile in the current directory.

## 2. Run the Docker Container

After building the image, start a container with:

```
docker run -p 3000:3000 automation-test-form
```

- This maps port 3000 on your host to port 3000 in the container.
- The app will be accessible at http://localhost:3000

## 3. (Optional) Run in Detached Mode

To run the container in the background, add the `-d` flag:

```
docker run -d -p 3000:3000 automation-test-form
```

## 4. Stopping the Container

Find the container ID with:

```
docker ps
```

Then stop it with:

```
docker stop <container_id>
```

---

For more options, see the official Docker documentation: https://docs.docker.com/get-started/
