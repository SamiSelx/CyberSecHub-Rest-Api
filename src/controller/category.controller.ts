import { AuthCategory } from '../services/auth/category.service'
import { Response, Request } from "express";
import { SuccessResponse, ErrorResponse } from "../utils/Response";
import { SuccessResponseC, ErrorResponseC } from "../services/services.response";

export const LoadAllCategories = async (request: Request, response: Response) => {
    console.log('Getting all categories!!\n\n');

    const result = await AuthCategory.executeLoadAllCategories();

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}

export const AddCategory = async (request: Request, response: Response) => {
    console.log('Adding category!!\n\n');
    
    const result = await AuthCategory.executeAddCategory(request.body);

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}

export const deleteCategory = async (request: Request, response: Response) => {
    const {id} = request.params

    const result = await AuthCategory.executeDeleteCategory(id);

    if (result instanceof SuccessResponseC) {
        return SuccessResponse(response, result.code, result.data, result.message, result.status);
    }

    if (result instanceof ErrorResponseC) {
        return ErrorResponse(response, result.code, result.message, result.error);
    }
}