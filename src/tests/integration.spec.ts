import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../index";
import request from "supertest";
import resetDB from "../helpers/resetDB";

describe("POST /sum", () => {
    beforeEach(async ()=> {
        console.log('Clearning db')
        await resetDB();
        console.log('Cleared DB')
    })
    it("should sum add 2 numbers", async () => {
        const { status, body } = await request(app).post("/sum").send({ a: 4, b: 9});
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 13 });
    });
})