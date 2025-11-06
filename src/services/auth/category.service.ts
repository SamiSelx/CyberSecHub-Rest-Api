import { CategoryModel } from '../../db/models/category'
import { formatString } from "../../utils/Strings"
import { HttpCodes } from "../../config/Errors";
import { Sign } from '../../utils/jwt'
import { ErrorResponseC, SuccessResponseC } from "../services.response";
import categoryLogs, { ICategoryLogs, categoryLogger } from './category.log';

export class AuthCategory {
    /**
     * @description Load all categories
     */
    static executeLoadAllCategories = async () => {
        try {
            const categories = await CategoryModel.find({});

            const message = formatString(categoryLogs.CATEGORIES_FOUND.message, {});
            const resp: ICode<ICategoryLogs> = categoryLogs.CATEGORIES_FOUND;

            if (!categories) {
                console.log('no categories');
                return new ErrorResponseC(
                    categoryLogs.CATEGORIES_NOT_FOUND.type,
                    HttpCodes.NotFound.code,
                "CATEGORIES_NOT_FOUND"
                );
            }

            return new SuccessResponseC(
                resp.type,
                categories,
                message,
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(categoryLogs.CATEGORIES_NOT_FOUND.message, {
                error: (error as Error)?.message || "",
            });
            categoryLogger.error(message, error as Error);
            return new ErrorResponseC(
                categoryLogs.CATEGORIES_NOT_FOUND.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }

    static executeAddCategory = async (category: any) => {
        try {
            const response = await CategoryModel.create(
                { name: category.name }
            );

            const message = formatString(categoryLogs.CATEGORY_ADDED.message, {});
            const resp: ICode<ICategoryLogs> = categoryLogs.CATEGORY_ADDED;

            return new SuccessResponseC(
                resp.type,
                response?.toObject(),
                message,
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(categoryLogs.CATEGORY_NOT_ADDED.message, {
                error: (error as Error)?.message || "",
            });
            categoryLogger.error(message, error as Error);
            return new ErrorResponseC(
                categoryLogs.CATEGORY_NOT_ADDED.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }

    static executeDeleteCategory = async (id: string): Promise<ResponseT> => {
        try {
            const response = await CategoryModel.deleteOne(
                { _id: id }
            );

            // const message = formatString(categoryLogs.CATEGORY_DELETED.message, {});
            // const resp: ICode<ICategoryLogs> = categoryLogs.CATEGORY_DELETED;

            if (!response) {
                return new ErrorResponseC(
                    categoryLogs.CATEGORIES_NOT_FOUND.type,
                    HttpCodes.NotFound.code,
                    "CATEGORIES_NOT_FOUND"
                ); 
            }

            return new SuccessResponseC(
                "Category Deleted",
                response,
                "Category Deleted Successfully",
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(categoryLogs.CATEGORY_NOT_DELETED.message, {
                error: (error as Error)?.message || "",
            });
            categoryLogger.error(message, error as Error);
            return new ErrorResponseC(
                categoryLogs.CATEGORY_NOT_DELETED.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }
}