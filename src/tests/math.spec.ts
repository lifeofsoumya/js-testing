import { describe, expect, it, test } from '@jest/globals'
import request from 'supertest';
import { app } from '../index';

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