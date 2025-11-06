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
            const categories = await CategoryModel.find({}, { _id: 0});

            const message = formatString(categoryLogs.CATEGORIES_FOUND.message, {});
            const token = Sign({ _id: '', role: 'admin' });
            const resp: ICode<ICategoryLogs> = categoryLogs.CATEGORIES_FOUND;

            if (!categories) {
                console.log('no categories');
                return;
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
            const token = Sign({ _id: '', role: "admin" })
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
}