import { ToolModel } from "../../db/models/tool";
import toolLogs, { IToolLogs, toolLogger } from "./tool.log";
import { formatString } from "../../utils/Strings"
import { HttpCodes } from "../../config/Errors";
import { ErrorResponseC, SuccessResponseC } from "../services.response";
import { Sign } from "../../utils/jwt"
import { Response } from "express";
import { ToolCategory, ToolStatus, Resources } from "../../types/Tool"

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
        category: string,
        description: string,
        resources: Resources[] | null,
        usage: string | null,
        status: ToolStatus = ToolStatus.PENDING,
    ) => {
        try {
            /* Check if the tool is already saved in the database
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
            */

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
                tool,
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

        static executeGetAllTools = async ():Promise<ResponseT> => {
        try {
            const tools = await ToolModel.find({status: ToolStatus.APPROVED});

            return new SuccessResponseC(
                toolLogs.TOOLS_FOUND.type,
                tools,
                toolLogs.TOOLS_FOUND.message,
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(toolLogs.COULD_NOT_CONNECT.message, {
                error: (error as Error)?.message || "",
            });
            toolLogger.error(message, error as Error);
            return new ErrorResponseC(
                toolLogs.COULD_NOT_CONNECT.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }
    static executeGetToolByName = async (name: string):Promise<ResponseT> => {
        try {
            const tool = await ToolModel.findOne({ name: name, status: ToolStatus.APPROVED });
            if (!tool) {
                const message = formatString(toolLogs.TOOL_NOT_FOUND.message, { name });
                toolLogger.error(message);
                return new ErrorResponseC(
                    toolLogs.TOOL_NOT_FOUND.type,
                    HttpCodes.NotFound.code,
                    message
                );
            }
            return new SuccessResponseC(
                toolLogs.TOOL_FOUND.type,
                tool,
                formatString(toolLogs.TOOL_FOUND.message, tool.toObject()),
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const message = formatString(toolLogs.COULD_NOT_CONNECT.message, {
                error: (error as Error)?.message || "",
            });
            toolLogger.error(message, error as Error);
            return new ErrorResponseC(
                toolLogs.COULD_NOT_CONNECT.type,
                HttpCodes.InternalServerError.code,
                message
            );
        }
    }
}