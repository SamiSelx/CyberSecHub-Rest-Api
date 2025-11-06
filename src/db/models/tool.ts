import { Model, Schema, model, Document } from 'mongoose'
import { validateURL, validateCategory } from '../../utils/Function';
import { ToolCategory, Resources, ToolStatus, ToolInterface, OptimizedTool } from '../../types/Tool'

const required = true;

export interface ToolDocument extends Document<ToolInterface>, ToolInterface {
    compareTools(githubURL: string): Promise<boolean>;
    Optimize(): OptimizedTool
}

export interface ToolModel extends Model<ToolDocument> {
    findTools(id: string): Promise<ToolInterface>;
}

const toolSchema = new Schema<ToolInterface>(
    {
        name: { type: String, required: true },
        githubURL: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        usage: { type: String },
        resources: [{
            title: { type: String },
            description: { type: String },
            url: { type: String }
        }],
        status: { type: String, required, enum: Object.values(ToolStatus) },
    },
    {
        timestamps: true,
        discriminatorKey: "kind"
    }
);

toolSchema.methods.Optimize = function () {
    const obj = this.toObject();
    delete obj.category;
    delete obj.resources;
    delete obj.usage;
    return obj;
}

export const ToolModel = model<ToolInterface, ToolModel>("Tools", toolSchema);