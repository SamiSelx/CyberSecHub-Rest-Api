import { Router } from "express";
import { isUser } from "middleware/auth";
import { saveTool } from "../controller/tool.controller"

const toolRouter = Router();

toolRouter.post("/tool-save", saveTool);

export default toolRouter;