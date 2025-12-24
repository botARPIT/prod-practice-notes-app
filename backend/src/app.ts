import express from 'express';
import logger from './logger.js'
import authRouter from './auth/auth.routes.js';
import noteRouter from './notes/note.routes.js';
import type { Express, Request, Response } from 'express';

const app: Express = express()
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
    return res.send("Working...")
})

app.get("/health", (req: Request, res: Response) => {
    logger.info('Health endpoint triggered')
    return res.send("Healthy hu bro")
})
app.use("/api/auth", authRouter)
app.use("/api/notes", noteRouter)

export default app;