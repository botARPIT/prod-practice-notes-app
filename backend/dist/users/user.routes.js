import express from "express";
const userRouter = express();
userRouter.use(express.json());
userRouter.get("/", (req, res) => {
    return res.status(200).json({ message: "Hi from user router" });
});
export default userRouter;
//# sourceMappingURL=user.routes.js.map