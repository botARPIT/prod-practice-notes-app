import express from 'express';
import { logger, httpLogger } from './logger.js';
import authRouter from './auth/auth.routes.js';
import noteRouter from './notes/note.routes.js';
const app = express();
app.use(express.json());
app.use(httpLogger);
app.get("/", (req, res) => {
    return res.send("Working...");
});
app.get("/health", (req, res) => {
    return res.status(200).send("OK");
});
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
export default app;
//# sourceMappingURL=app.js.map