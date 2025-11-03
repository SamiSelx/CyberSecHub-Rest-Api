import { Response, Request } from "express";
import { SuccessResponse, ErrorResponse } from "../utils/Response";
import { AuthTool } from "../services/auth/tool.service"
import { SuccessResponseC, ErrorResponseC } from "../services/services.response";

export const saveTool = async (request: Request, response: Response) => {
    const {
        name, githubURL, category,
        description, usage, resources,
        status
    } = request.body;

    console.log(`\nname: ${name}\n
        githubURL: ${githubURL}\n
        category: ${category}\n
        description: ${description}\n
        usage: ${usage}\n
        resources: ${resources}\n
        status: ${status}\n
    `);

    const result = await AuthTool.executeSaveTool(
        name, githubURL, category,
        description, usage, resources,
        status
    );

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}