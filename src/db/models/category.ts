import { Model, Schema, model, Document } from 'mongoose'
import { Category } from "../../types/Tool"

const required = true;

export interface CategoryDocument extends Document<Category> {
    validateCategory(category: string): boolean;
    getCategories(): any;
};

export interface CategoryModel extends Model<CategoryDocument> {

};

export const categorySchema = new Schema<Category>(
    {
        name: { type: String, required }
    },
    {
        strict: false
    }
);

categorySchema.methods.validateCategory = function () {

};

categorySchema.methods.getCategories = function () {
    return this;
}

export const CategoryModel = model<Category, CategoryModel>("Category", categorySchema);