import express, { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const mathInput = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum", async (req: Request, res: Response) => {
    const zodSanity = mathInput.safeParse(req.body);

    if(!zodSanity.success){
        return res.status(411).json({
            message: "Check inputs again"
        })
    }

    const sum = zodSanity.data.a + zodSanity.data.b;

    // assuming I had a db call to make with this data, it'll just do a mock call in spec.ts
    await prismaClient.sum.create({
        data: {
            a: zodSanity.data.a,
            b: zodSanity.data.b,
            result: sum
        }
    })

    res.json({answer: sum})
});

app.get("/multiply", (req: Request, res: Response) => {
    const zodSanity = mathInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"]) // accept values from headers, which from supertest would set manually
    })
    if(!zodSanity.success){
        return res.status(411).json({
            message: "Check inputs again"
        })
    }
    const multiply = zodSanity.data.a * zodSanity.data.b;

    res.json({answer: multiply})

})

// app.listen(8080)
// instead of running the app here, as we need to test, no need to run on port
// just export the app and test use the supertest request(endpoint)