# Home Library Service

> make

On Linux, MacOS run:

`make`

On Windows (not tested):

`choco install make`

`make`

#### this will run docker compose and deploy `app` and `db` containers


#### other commands:

`make stop`

docker compose down



`make clean`

docker compose down
remove containers and images


## Docker Image

#### Get the `latest` Docker image of this app

`docker pull abe511/rest-service:latest`

#### To run the container in interactive mode:

`docker run -ti --entrypoint /bin/sh abe511/rest-service:latest`


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
