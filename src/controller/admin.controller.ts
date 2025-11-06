import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import { ErrorResponseC, SuccessResponseC } from "../services/services.response";
import { AuthAdmin } from "../services/auth/admin.service";

export const LoadTools = async (request: Request, response: Response) => {
    const result = await AuthAdmin.executeLoadTools();

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}

export const UpdateTool = async (request: Request, response: Response) => {
    const { id, status } = request.body;

    console.log('controller')
    console.log('id: ', id);
            console.log('status: ', status);

    const result = await AuthAdmin.executeUpdatingTool(id, status);

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}