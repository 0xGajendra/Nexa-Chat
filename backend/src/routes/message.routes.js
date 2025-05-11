import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getAllUser, getMessage } from "../controllers/message.controller";
const router = express.Router();

router.get("/users", verifyToken, getAllUser);
router.get("/:id", verifyToken, getMessage);

router.post("/send/:id",verifyToken, sendMessage)

export default router;