import { Application } from "express";

import indexRouter from "./index.router";
import authRouter from "./auth.router";
import toolRouter from "./tool.router";
// import adminRouter from "./admin.router";
import manifestRouter from "./manifest.router";
import categoryRouter from "./category.router";

export default function SetRouters(app: Application) {
    app.use("/", indexRouter);
    app.use("/auth", authRouter);
    app.use("/tool", toolRouter);
    // app.use("/api/admin", adminRouter);
    app.use('/category', categoryRouter);
    app.use("/media", manifestRouter);
}