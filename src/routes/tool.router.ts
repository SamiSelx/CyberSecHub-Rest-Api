import { Router } from "express";
import { checkLogs, isAdmin, isLoggedIn } from "../middleware/auth";
import { getAllTools, getToolByName, saveTool } from "../controller/tool.controller"
import { LoadTools, UpdateTool } from "../controller/admin.controller";

const toolRouter = Router();

toolRouter.post("/tool-save", saveTool);
toolRouter.get("/all",getAllTools);
toolRouter.get("/:name",getToolByName)
toolRouter.route("/pending-tools").get(checkLogs,isLoggedIn,isAdmin, LoadTools);
toolRouter.route("/update").put(checkLogs,isLoggedIn,isAdmin, UpdateTool);

export default toolRouter;