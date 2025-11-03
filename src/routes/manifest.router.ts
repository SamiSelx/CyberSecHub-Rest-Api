import { Router } from "express"
import { BrowserResponse} from "../controller/manifest.controller"

const manifestRouter = Router();

manifestRouter.get("/manifest.json", BrowserResponse);

export default manifestRouter;