1. Init a TS Project with Express
2. Run `npx ts-jest config:init` for jest.config.ts 
    - set npm run test = only `jest` command 
    - Any file ending with test.ts or spec.ts would be ran by jest
3. Time to use `supertest` package which does kind of replace the actual api calls like axios.get(endpoint)