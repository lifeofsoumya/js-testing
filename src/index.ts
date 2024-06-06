import express, { Request, Response, NextFunction } from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req: Request, res: Response) => {
    const a = req.body.a;
    const b = req.body.b;
    const sum = a + b;

    res.json({answer: sum})
});

// app.listen(8080)
// instead of running the app here, as we need to test, no need to run on port
// just export the app and test use the supertest request(endpoint)