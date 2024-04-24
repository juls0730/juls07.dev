---
title: "The Magic of Docker Compose: Transforming Project Setups"
description: Simplify your life with Docker Compose
image:
  src: "/images/magic-of-docker-compose.webp"
  alt: "How I made my site fast"
date: April 23, 2024
tags:
  - web dev
  - docker
---

In some of my recent full-stack projects, I've been using Docker Compose to simplify my project setup. Instead of downloading PostgreSQL, aligning it with the project's authentication scheme, tagging it to prevent conflicts with other projects, setting up the cache layer or other services, and building backend services, I run just one simple command:

<!--more-->

```bash
docker-compose up

```

With this one command, you, your maintainers, contributors, and users can bypass the hassle of managing backend service requirements, databases, and other aspects, allowing everyone to focus on what truly matters — the project itself. When I open a project, whether to use it, fix a bug, or for any other reason, I don't want to run multiple commands to get it working; I just want to use the project.

## The Why

Many of my full-stack projects rely on various services. These can range from a Redis DB (rip lol) to a MySQL DB, a PostgreSQL DB, a compiled backend, or numerous other possibilities. However, setting them up can be tedious, resolving conflicts with other databases, managing missing dependencies, and ensuring the services are running. I simply want to focus on the project. While using a project, I shouldn't have to concern myself with the maintainers' choice of database, their decision to use a compiled backend or any other choices, and neither should anyone else. I find that the largest roadblock to me working on projects is dependencies, whether it’s an electron app, which is constantly in a state of dependency hell, an open-source web app, or API, I always find myself wasting time on things like dependencies, and sometimes I even lose interest in contributing to the project because of how hard it is to get the project working at all.

Docker Compose also hands itself to developing microservices and multi-environment production, docker containers can be easily spun up nearly on demand, and you can make guarantees about the environment that the service is running on even if you or other members of your team use Windows, thanks to Docker building on top of the Linux kernel. You and your contributors will benefit greatly once you get past the hurdle of implementing Docker Compose into your project. want to test a clean install of your app? Just delete the docker image and make a new one. Working from another computer for the time being? That’s fine, clone the repo and start the docker container. Once you use Docker Compose to manage projects, you won't be able to go back. Have you ever been in a scenario where you have an old project and you want to look back at it or work on it again, but it's poorly documented and you don't know exactly what you used and how you had it set up? Trust me, I’ve been there, and it sucks, but by using Docker Compose, I find myself going into old projects, starting up Docker Compose, and it being exactly like the day I left it.

## The How

Implementing Docker Compose can be a bit of a struggle if you have never done it before, but it’s quite simple once you know what you are doing. I’m going to show you how you might implement Docker Compose in a Vue project that uses KeyDB as the main database, and a Go backend in a mono-repo with Nginx as a reverse proxy between those services with docker-compose managing everything, I’m not going to go over why I chose these specific tools because it’s not exactly important for this blog post.

### Frontend

First, we can create a Vue project, make sure you use single-page routing in your configuration. You can start a Vue project with the Vue CLI with these commands:

```bash
bun create vue@latest
cd <project-name>
bun i
```

Then, we can create a Docker file so that we can eventually run our Vue web app in a Docker container. First, let's make the file in the root of the project and name it `Dockerfile`, and on the first line, pull the bunjs docker image, like so:

```docker
# Dockerfile
FROM oven/bun:alpine
```

We use the `oven/bun` image from the Alpine branch specifically because the Alpine images use a stripped-down version of Linux that takes up less space and is more efficient. Usually, when picking docker images to pull from, I pick alpine-based images and would recommend you do too. Then, we prepare the docker container so that it uses our project code, like this:

```docker
RUN mkdir /app
WORKDIR /app

COPY . /app
```

Here, we make the app directory in the docker container’s root directory, and set the “working directory”, which makes it so that any command executed from that point forward is executed in that directory, in this case, the app directory, and copy all the files from the current directory to the /app directory, but don’t worry, this doesn't actually move the project to somewhere else, and hot reloading will still work as expected. Finally, we run the commands to ensure our project has up-to-date dependencies, and then start our project, like so:

```docker
RUN bun install

# Run the vite dev server with the bun runtime
CMD ["bun", "--bun", "dev", "-- --host=0.0.0.0"]
```

We use the Bun runtime by using the `--bun` argument because if we don't, Bun will default to the slower Node.js runtime. Using the `-- --host=0.0.0.0` argument indicates that we are passing an argument to the underlying program, in this case, Vue, and that we are passing an argument, in this case, `host` because we want to expose our Vue project so that we can access it from the network later. You can run your Vue project without exposing it to the network, but it will make it so you cant access your project from the nginx reverse proxy we are going to setup later in our project.

Next, we will build the actual frontend for our full-stack project. I will be making a visitor counter since it’s simple to start with but is a little more complex than a Hello World application.

First, start off by removing the default layout in `src/App.vue` so that our App.vue looks like this:

```vue
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
```

All this does is render the view from the SPA router and nothing more, later on in this project, you could add a navbar component to this page, or something similar, but for now, we are going to leave it with just the router view. Next, create a `VisitCount.vue` component in the components directory, this component will render the visit count after it fetches the data from the API. The component should look like this:

```vue
<script lang="ts" setup>
const count = await fetch("/api/count")
  .then((res) => res.json())
  .then((data) => data.count);
</script>

<template>
  <p>This page has been visited {{ count }} times!</p>
</template>
```

We are doing a couple of things for a few reasons:

- We split this into its own component so we can use the Suspense component when we wish to display this component since it’s an async component
- We use the .then method to process the data before we access it so that we don't have to define multiple variables to simplify the process of getting the count data

Next, we can modify `src/HomeView.vue` so that it displays our VisitCounter.vue component that we just made so that HomeView.vue looks like this:

```vue
<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const VisitCount = defineAsyncComponent(
  () => import("../components/VisitCount.vue")
);
</script>

<template>
  <Suspense>
    <VisitCount />

    <template #fallback> Loading... </template>
  </Suspense>
</template>
```

In this file, we’re doing some interesting things related to Vue. First, we are using defineAsyncComponent to dynamically import our async component that we just made. We use the Suspense component so that we can load our async component and control the loading state, async Vue components **will not work** without Suspense. Here, we use a simple “Loading…”, but you can use any loading state you desire, or you could go without a loading state entirely if you don’t mind the component showing nothing while it waits for the component to load.

### Backend

For our backend, we are going to be using a Go backend with a KeyDB database as the backend since it’s simple and fast. First, let’s initialize a go project in our project:

```bash
mkdir server
cd server
go mod init api
```

After that, make a `main.go` file in the server directory we just created. We are going to use GIN for our web framework since it’s simple yet powerful. We can start a simple GIN web server with the following code:

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    r.GET("/count", func(c *gin.Context) {
        c.String(http.StatusOK, "Foo")
    })

    r.Run(":8080")
}
```

Don’t forget to add gin as a dependency:

```bash
go get github.com/gin-gonic/gin
```

The code above is a very simple GIN server, all it does is listen on 0.0.0.0:8080 and assigns a route for /count to return a 200 with a text response of `Foo`. Next, we should add functionality to actually get and increment the visit count from the KeyDB database. We can modify the code from above like so:

```go
package main

import (
	"context" // [!code hl:2]
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9" // [!code hl]
)

var ctx = context.Background() // [!code hl]

func main() {
    client := redis.NewClient(&redis.Options{ // [!code hl:5]
        Addr:	  "keydb:6379",
        Password: "",
        DB:		  0,
    })

    r := gin.Default()

    // This route returns a count from the database and increments it for every request
    r.GET("/count", func(c *gin.Context) {
        count, err := client.Incr(ctx, "count").Result() // [!code hl:8]
        if err != nil {
            log.Println("Error incrementing count in Redis:", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to increment count"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"count": count})
    })

    r.Run(":8080")
}
```

Once again, don’t forget to add go-redis as a dependency:

```bash
go get github.com/redis/go-redis/v9
```

The final code for the backend Go server now connects to our KeyDB database on line 15. The server also uses a backend server from go-redis called `Incr` which increments a value in the database and returns the result, and even create the table if it didn't exists previously. If the server, for whatever reason, can't set the count, we log an error to the console using the `log` library that we added, and return an error in JSON to the client. If the request succeeds, however, we send the client a 200 status code with a JSON payload that contains the visitor count in the `count` field.

Finally, for the backend, we can create a Dockerfile. First, we pull in the golang image:

```docker
# NOTE: The hot reloading won't actually work by itself, it *needs* docker-compose to work

FROM golang:alpine
```

We once again, use the alpine image since it’s smaller and more efficient. We then set up the proper environment variables and directory to make the app build properly and to make sure that hot reloading works:

```docker
ENV PROJECT_DIR=/app

RUN mkdir /app
WORKDIR /app

COPY . /app
```

Finally, we pull CompileDaemon, which is what we will be using to auto-reload the server when we make changes to the server so that we don't have to restart the server every time we do any change, and tell it to build and run our code, like so:

```docker
RUN go get github.com/githubnemo/CompileDaemon
RUN go install github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon -build="go build -o api" -command="./api"
```

From this point, you can be done, if you change the URL that the frontend fetches data from, and make sure that the Docker Compose file exposes both the backend and frontend, you can stop here. However, I wont be doing that, I prefer that my apps are accessible from one URL so that they are easy to expose and use later without having to worry about CORS or exposing multiple ports, etc. so, we can move on to the second to last part of my example

### Nginx

We are using Nginx as a reverse proxy. Basically, we can have some services running on the network and nginx can take web requests to its port and redirect them to where they belong. To get started with nginx, make an `nginx.conf` file in the root directory of your project (where the index.html file is located). Put this into the nginx.conf file you just created:

```nginx
events {
    worker_connections  1024;
}

http {
    server {
        # This is the port Nginx will listen on
        listen 3000;

        # reduce spam in the terminal
        error_log /var/log/nginx/error.log warn;
        access_log off;

        # Server name
        server_name localhost;

        # Proxy / to web:5173
        location / {
            proxy_pass http://web:5173/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # WebSocket support (for HMR)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # Proxy /api to api:8080
        location /api/ {
            proxy_pass http://api:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

Here’s a breakdown of what any of this does:

- The `worker_connections` field in the events structure specifies the maximum amount of concurrent connections, assuming your computer allows for that many open files.
- the `proxy_pass` field in either of the location structures tells nginx to take requests from, for example, /about and passes it to the Vue web server at the hostname `web` and port `5173`, which will be explained more in the Docker Compose section. On the other hand, requests that start with `/api/` will be forwarded to the backend server.
- In either of the location structures, we set a various number of headers, all of which mainly give the corresponding web server information about the actual client as opposed to information about the proxy, which we are likely to not care about.
- In the `location /` structure, at the end, we specify some fields to allow for connections to be “upgraded” to a WebSocket connection, which allows for HMR

Now, we are finally able to move on to the cherry on top.

### Docker Compose

This is the most important part of this whole project, sure, we can use whatever stack you wish to use, but knowing how to correctly use Docker Compose is the most important part. First, create a `compose.yml` file in the root directory of your project (the same place where you just made the nginx.conf file). Start that file with the name of your project, I’m going to go with `docker-compose-example`, but you can use whatever you want:

```yaml
name: docker-compose-example
```

Then, we have to define our services, in our circumstance, we have 4 services, a Vue frontend, a Go backend, a KeyDB database, and an Nginx reverse proxy. We already have Dockerfiles for both our web service and our API service, so let’s add these service to out compose.yml like so:

```yaml
services:
  web:
    build: .
    volumes:
      - ./:/app
    depends_on:
      - api

  api:
    build: ./server
    volumes:
      - ./server:/app
```

We must specify the correct volumes that we set in the Dockerfile to the corresponding project directories so that we can still use HMR and auto-rebuild. These new lines tell Docker Compose to build our images based on Dockerfiles in either the ./ or ./server directory for our web and API service respectively, so it will automatically build our Docker containers for us. Next, we have to deal with our services, like our KeyDB database, and our Nginx reverse proxy. We can set these services up very easily in our Docker Compose file like this:

```yaml

    keydb:
        image: eqalpha/keydb:alpine
        restart: always
        ports:
            - '6379:6379'
        volumes:
            - keydb:/data

    nginx:
        image: nginx:alpine
        ports:
            - '3000:3000'
        volumes:
            - ./nginx.conf:/etc/nginx/nginx.conf:ro

volumes:
    keydb:
        driver: local
```

There are a couple things to unpack here, so let’s break it down:

Both our Nginx and KeyDB service use an image that is on DockerHub, so we don't need to make the Dockerfile ourselves, instead, Docker Compose will pull the image automatically and have everything preconfigured for us, like every other image I have used in this article, I opted for the alpine images. Our KeyDB service uses an external volume defined in the volumes section at the bottom of the file so that we can have persistent data, which is important when we might have data we want to keep in databases. Furthermore, the KeyDB section has a `ports` key, which defines the ports that that container uses, and which port it should be mapped to on the host system. it’s not 100% necessary to have this port be exposed, but I like having it exposed so that I can look at the data in an external DB viewer without having to do complicated hacks to access the database in the container. Next, the KeyDB service has a key that tells it to restart always, so if it encounters a crash, or stops unexpectedly it will be restarted by docker automatically. Finally, in our Nginx service, we have a volume that points to a local file and also has `ro` at the end of it, so what gives? The local path mounts the nginx.conf file that we made previously in the article to the path that Nginx looks for the nginx config so that we can use our modified config, and the `ro` at the end of the file tells Docker to mount it as a read-only file in the container.

We’re not quite done yet though, because if you start up the containers you might notice that it might not work properly right away. Our `compose.yml` file should look like this so far:

```yaml
name: docker-compose-example
services:
  web:
    build: .
    volumes:
      - ./:/app
    depends_on:
      - api

  api:
    build: ./server
    volumes:
      - ./server:/app

  keydb:
    image: eqalpha/keydb:alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - keydb:/data

  nginx:
    image: nginx:alpine
    ports:
      - "3000:3000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro

volumes:
  keydb:
    driver: local
```

We need to make sure that all the docker containers startup in the correct order. For example, you wouldn't want your backend, which depends on the database to start before the database. To solve this, we can tell Docker Compose that containers depend on other containers using the “depends_on” key:

```yaml
name: docker-compose-example
services:
  web:
    build: .
    volumes:
      - ./:/app
    depends_on: # [!code hl:2]
      - api

  api:
    build: ./server
    volumes:
      - ./server:/app
    depends_on: # [!code hl:2]
      - keydb

  keydb:
    image: eqalpha/keydb:alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - keydb:/data

  nginx:
    image: nginx:alpine
    ports:
      - "3000:3000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on: # [!code hl:3]
      - web
      - api

volumes:
  keydb:
    driver: local
```

Finally, you can now run this in the root directory of your project and it will automatically start up a db, the frontend and backend, and nginx to proxy the frontend and backend to one IP:

```bash
docker-compose up --build
```

and for subsequent runs of your project, assuming you don't change either of the Dockerfiles, you can lose the `--build` argument for much faster startup times. Now, if you open your browser to http://localhost:3000/ you can see the visit count and if you refresh the page, you can see it slowly tick up. If you want to spam the API with a ton of requests with Apache Bench, for example you can do so with this:

```bash
ab -c 100 -n 10000 localhost:3000/api/count
```

You will see that the counter ticks up exactly 10000 requests, and it will complete reasonably fast.

## Conclusion

In summary, Docker Compose is an amazing tool for managing full-stack projects efficiently. It abstracts away many of the complexities involved in the various services and dependencies, allowing you to focus on what really matters: building great projects. Once you get the hang of using Docker Compose, you will find yourself incorporating it into many of your projects, both new and old.

If you want to dive deeper into the example project I described in this post, feel free to check out the [Github repo](https://github.com/juls07/docker-compose-vue-example) for the full source code. Experimenting with Docker Compose in your own projects will help you appreciate its power and simplicity.

Thanks for reading, and I hope this article has sparked interest in Docker Compose. Whether you’re an experienced dev, or just starting out, give Docker Compose a try, and you may find it becomes an essential part of your development workflow!
