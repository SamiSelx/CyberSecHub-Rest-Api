import { Router } from "express"
import { LoadTools } from "../controller/admin.controller"

const adminRouter = Router();

adminRouter.route("/load-tools").get(LoadTools);

export default adminRouter