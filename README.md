# todo-on-multiple-langs
Same Todo app written on different languages and frameworks

# Contents
- [Database](#database)
    - [Setup database](#database-setup)
- [Fullstack](#fullstack)
    - [Next.js](#nextjs)

## Database

### Database setup
Go to `database` folder and run the following command to run docker container with db:
```
docker-compose up
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
Fullstack apps are available on `http://localhost:3000` port

### Next.js
To run `next.js` project go to `fullstack/next-app` folder and execute the following command:
```
npm run dev
```


