import express from "express";
import { config } from "../config/config.js";
const authRouter = express();
authRouter.use(express.json());
authRouter.get("/", (req, res) => {
    console.log(config.database_url);
    return res.status(200).json({ message: "Hi from auth router" });
});
export default authRouter;
//# sourceMappingURL=auth.routes.js.map