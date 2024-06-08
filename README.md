1. Init a TS Project with Express
2. Run `npx ts-jest config:init` for jest.config.ts 
    - set npm run test = only `jest` command 
    - Any file ending with test.ts or spec.ts would be ran by jest
3. Time to use `supertest` package which does kind of replace the actual api calls like axios.get(endpoint)
4. expect() and toBe() are used - self explanatory functions

5. Testing get endpoints where parameters are received via headers and sent manually from test script

6. Moving from 'jest' to 'vitest', import the same functions from 'vitest' and run vitest command in npm run test

### DB Mocking
- Adding database and ORM or ODMs

7. Install and init prisma `npm i prisma` and `npx init prisma`
8. Just add a simple model in schema and do `npx prisma generate`, no need for db URI thus no need for migrate
9. In the spec.ts a mock version of prisma is generated or registered using `vi` so actual db call is not made, Instead a mock call to db is made in testing, but while running process prisma does actual db interaction

- Mocking is done on the basis of assumption that db would do it's tasks succesfully and I'm liable for other unit's testing

## Unit testing completed -> Moving to integration test

1. Here we need to start a real service like db, kafka or redis whatever business logic needs
2. Thus let's create a docker-compose which starts a pg container
3. To check if our pg container(DB) is ready or not, there's a popular script out there called wait-for-it
    `curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o scripts/wait-for-it.sh`
We add it into run-integration.sh script to check db started or not
4. shell scripts needs `chmod` btw
