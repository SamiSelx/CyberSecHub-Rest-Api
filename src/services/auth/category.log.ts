import Logger from '../../utils/Logger'

export type ICategoryLogs =
    | 'CATEGORIES_NOT_FOUND'
    | 'CATEGORIES_FOUND'
    | 'CATEGORY_NOT_ADDED'
    | 'CATEGORY_ADDED';

export const categoryLogs: IErrors<ICategoryLogs> = {
    CATEGORIES_NOT_FOUND: {
        code: 0,
        message: "Categories not found",
        type: "CATEGORIES_NOT_FOUND"
    },
    CATEGORIES_FOUND: {
        code: 1,
        message: 'Categories found',
        type: 'CATEGORIES_FOUND'
    },
    CATEGORY_NOT_ADDED: {
        code: 2,
        message: 'Category not added',
        type: 'CATEGORY_NOT_ADDED'
    },
    CATEGORY_ADDED: {
        code: 3,
        message: 'Category added',
        type: 'CATEGORY_ADDED'
    }
} as const;

export default categoryLogs;
export const categoryLogger = new Logger("category");