import { Router } from "express"
import { LoadTools, UpdateTool } from "../controller/admin.controller"

const adminRouter = Router();

adminRouter.route("/load-tools").get(LoadTools);
adminRouter.route("/update-tool").put(UpdateTool);

export default adminRouter