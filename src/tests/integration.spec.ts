import { describe, expect, it } from "vitest";
import { app } from "../index";
import request from "supertest";

describe("POST /sum", () => {
    it("should sum add 2 numbers", async () => {
        const { status, body } = await request(app).post("/sum").send({ a: 4, b: 9});
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 13 });
    });
})