import { Response } from "express"
import { HttpCodes } from "../../config/Errors"
import { SuccessResponseC } from "./../services.response"

export class AuthManifest {
    static executeBrowserResponse = async () => {
        return new SuccessResponseC(
            "No manifest.json file found",
            {},
            "No file weill be returned",
            299,
        );
    }
}