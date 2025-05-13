import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getAllUser, getMessage, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", verifyToken, getAllUser);
router.get("/:id", verifyToken, getMessage);

router.post("/send/:id",verifyToken, sendMessage)

export default router;