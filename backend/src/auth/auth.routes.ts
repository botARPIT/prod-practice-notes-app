import express from "express";
import {config} from "../config/config.js"
import type { Express, Request, Response } from "express";
const authRouter: Express = express();
authRouter.use(express.json());

authRouter.get("/", (req: Request, res: Response) => {
    console.log(config.database_url)
    return res.status(200).json({message:  "Hi from auth router"});
})

export default authRouter;