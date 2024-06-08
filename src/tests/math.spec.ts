import { describe, expect, it, test, vi } from 'vitest'
import request from 'supertest';
import { app } from '../index';
import { prismaClient } from '../__mocks__/db';

// vi.mock("../db", ()=> ({ // ..db bcoz, it tells which prismaClient to mock
//     prismaClient: { sum: { create: vi.fn() }} // this mocking means, whenever prismaClient.sum.create would be called, it would reach this vi.fn() fnction, which is empty function
// }))

// vi.mock("<some_function_that_has_db_interaction>") you can mock any function that you don't need to perform unit testing on
// So in actual production the function would work as usual, in testing modules, it would mock out and perform something different like empty function

// we know as we are calling prisma.sum.create thus we can manually mock it.
// but what if we're calling sum.findOne or findMany and many more functions, 
// we should find a generic way that mocks all the functions in the 'sum' Schema

vi.mock("../db"); // it'll pick mocked db from /__mocks__/db.ts

describe("Does Math checking", ()=> {
    it("should return sum of QS.1", async ()=> {

        // if the res is dependant on a db call's response
        // we might have to mock an actual db call itself and receive a value as well 
        // const dbCallRes = await prismaClient.request.create.mockResolvedValue({
        //         id: 1, 
        //         a: 2,
        //         b: 4,
        //         result: 3
        // })
        // console.log(dbCallRes) // would log { id: 1, a: 2, b: 4, result: 3 }

        // normal testing concept 
        const res = await request(app).post("/sum").send({ a: 4, b: 9});
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(13)
        // expect(res.body.id).toBe(1) // id received from actual db call 
    })

    it("should return sum of QS.2", async ()=> {
        const res = await request(app).post("/sum").send({ a: -100, b: 2});
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-98)
    })
})

describe("Does Math checking for Multiplication", ()=> {
    it("should return multiply of QS.1", async ()=> {
        const res = await request(app).get("/multiply").set({ a: "4", b: "3"}); // multply is get req, and numbers are sent via headers
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(12)
    })

    it("should return multiply of QS.2", async ()=> {
        const res = await request(app).get("/multiply").set({ a: "10", b: "2"}); // while setting headers using set() convert to string
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(20);
    })
})