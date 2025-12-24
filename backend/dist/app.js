import express from 'express';
import logger from './logger.js';
import authRouter from './auth/auth.routes.js';
import noteRouter from './notes/note.routes.js';
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    return res.send("Working...");
});
app.get("/health", (req, res) => {
    logger.info('Health endpoint triggered');
    return res.send("Healthy hu bro");
});
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
export default app;
//# sourceMappingURL=app.js.map