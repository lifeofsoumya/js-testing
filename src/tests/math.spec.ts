import { describe, expect, it, test, vi } from 'vitest'
import request from 'supertest';
import { app } from '../index';

// vi.mock("../db", ()=> ({ // ..db bcoz, it tells which prismaClient to mock
//     prismaClient: { sum: { create: vi.fn() }} // this mocking means, whenever prismaClient.sum.create would be called, it would reach this vi.fn() fnction, which is empty function
// }))

// we know as we are calling prisma.sum.create thus we can manually mock it.
// but what if we're calling sum.findOne or findMany and many more functions, 
// we should find a generic way that mocks all the functions in the 'sum' Schema

vi.mock("../db"); // it'll pick mocked db from /__mocks__/db.ts

describe("Does Math checking", ()=> {
    it("should return sum of QS.1", async ()=> {
        const res = await request(app).post("/sum").send({ a: 4, b: 9});
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(13)
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