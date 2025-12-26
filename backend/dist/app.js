import express from 'express';
import { logger, httpLogger } from './logger.js';
import authRouter from './auth/auth.routes.js';
import noteRouter from './notes/note.routes.js';
import { callExternalApi } from './utility/circuitbreaker.js';
const app = express();
app.use(express.json());
app.use(httpLogger);
app.get("/", (req, res) => {
    return res.send("Working...");
});
app.get("/health", (req, res) => {
    return res.status(200).send("OK");
});
//Using this route to test the circuit breaker
app.get("/api/test/external", async (req, res) => {
    try {
        const data = await callExternalApi();
        res.status(200).json({
            "succes": true,
            "data": data
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(503).json({
                "success": false,
                "error": error.message
            });
        }
        else {
            res.send(error);
        }
    }
});
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
export default app;
//# sourceMappingURL=app.js.map