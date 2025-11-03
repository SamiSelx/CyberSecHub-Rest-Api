import { ToolModel } from "../../db/models/tool";
import toolLogs, { IToolLogs, toolLogger } from "./tool.log";
import { formatString } from "../../utils/Strings"
import { HttpCodes } from "../../config/Errors";
import { ErrorResponseC, SuccessResponseC } from "../services.response";
import { Sign } from "../../utils/jwt"
import { Response } from "express";
import { ToolCategory, ToolStatus } from "../../types/Tool"

export class AuthTool {
    /**
     * @description Saves a tool
     * @param name - String
     * @param githubURL - String
     * @param category - String
     * @param description - String
     * @param resources - String
     * @param usage - String
     * @param status - ToolStatus
     */
    static executeSaveTool = async (
        name: string,
        githubURL: string,
        category: ToolCategory,
        description: string,
        resources: string | null,
        usage: string | null,
        status: ToolStatus = ToolStatus.PENDING,
    ): Promise<ResponseT> => {
        try {
            // Check if the tool is already saved in the database
            const toolExsists = await ToolModel.findOne({ githubURL });
            if (toolExsists) {
                const message = formatString(toolLogs.TOOL_FOUND.message, {
                    "Tool found": ""
                });
                return new ErrorResponseC(
                    toolLogs.TOOL_FOUND.type,
                    HttpCodes.Found.code,
                    message
                );
            }

            // If tool is not found, then we insert it into the database
            const tool = await ToolModel.create({
                name,
                githubURL,
                category,
                description,
                resources,
                usage,
                status,
            });

            const message = formatString(toolLogs.TOOL_SAVED.message, tool.toObject());
            const token = Sign({ _id: tool._id.toString(), role: "user"})
            const resp: ICode<IToolLogs> = toolLogs.TOOL_SAVED;

            return new SuccessResponseC(
                resp.type,
                { ...tool.Optimize(), token: token},
                message,
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(toolLogs.TOOL_NOT_SAVED.message, {
                error: (error as Error)?.message || "",
            });
            toolLogger.error(message, error as Error);
            return new ErrorResponseC(
                toolLogs.TOOL_NOT_SAVED.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }
};