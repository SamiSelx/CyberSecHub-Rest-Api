import { Response, Request } from "express";
import { SuccessResponse, ErrorResponse } from "../utils/Response";
import { SuccessResponseC, ErrorResponseC } from "../services/services.response";
import { AuthManifest } from "../services/auth/manifest.service";

export const BrowserResponse = async (request: Request, response: Response) => {
    return await AuthManifest.executeBrowserResponse();
}