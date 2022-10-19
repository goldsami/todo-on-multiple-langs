# todo-on-multiple-langs

Same Todo app written on different languages and frameworks.

# Contents

- [Database](#database)
    - [Database Setup](#database-setup)
- [Fullstack](#fullstack)
    - [Next.js](#nextjs)
- [Backend](#backend)
    - [Node.js](#nodejs)
    - [Golang](#golang)
- [Frontend](#frontend)
    - [Svelte](#svelte)

## Database

### Database Setup

Go to `database` folder and run the following command to run docker container with db:

```
docker-compose up
```

First you need to install dependencies:

```
npm i
```

To migrate and seed db run the following:

```
npm run setup-db
```

To revert data to initial seeds run the following:

```
npm run seed:run
```

## Fullstack

Fullstack apps are available on `http://localhost:3000` port.

### Next.js

To run `Next.js` project go to `fullstack/next-app` folder and execute the following command:

```
npm i
npm run dev
```

## Backend

Backend apps are available on `http://localhost:4000` port.

### Node.js

To run `Node.js` project go to `backned/node-app` folder and execute the following command:

```
npm i
npm run dev
```

### Golang

To run `Golang` project go to `backned/go-app` folder and execute the following command:

```
go get -d ./...
go run main.go
```

## Frontend

Frontend apps are available on `http://localhost:4200` port.

### Svelte

To run `Svelte` project go to `frontend/svelte-app` folder and execute the following command:

```
npm i
npm run dev
```


