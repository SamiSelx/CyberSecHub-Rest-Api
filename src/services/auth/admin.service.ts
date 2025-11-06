   import { ToolModel } from "../../db/models/tool"
import toolLogs, { IToolLogs, toolLogger } from "./tool.log"
import { formatString } from "../../utils/Strings"
import { HttpCodes } from "../../config/Errors"
import { ErrorResponseC, SuccessResponseC } from "../services.response"
import { Sign } from "../../utils/jwt"
import { ToolCategory, ToolStatus, OptimizedTool } from "../../types/Tool"

export class AuthAdmin {
    /**
     * @description Allows admin to approve or reject submited tools
     * @returns ResponseT
     */
    static executeLoadTools = async (): Promise<ResponseT> => {
        try {
            const tools = await ToolModel.find({ status: ToolStatus.PENDING });
            console.log(tools);

            const message = formatString(toolLogs.TOOLS_FOUND.message, tools);

            return new SuccessResponseC(
                toolLogs.TOOLS_FOUND.type,
                tools,
                message,
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

    static executeUpdatingTool = async (id: string, status: string): Promise<ResponseT> => {
        try {
            const response = await ToolModel.updateOne(
                { _id: id },
                { $set: { status: status } }
            );

            const message = formatString(toolLogs.TOOLS_FOUND.message, response);
            return new SuccessResponseC(
                toolLogs.TOOLS_FOUND.type,
                response,
                message,
                HttpCodes.Accepted.code
            );
        }
        catch (error) {
            const msg = formatString(toolLogs.TOOLS_NOT_UPDATED.message, {
                error: (error as Error)?.message || "",
            });
            toolLogger.error(msg, error as Error);
            return new ErrorResponseC(
                toolLogs.TOOLS_NOT_UPDATED.type,
                HttpCodes.InternalServerError.code,
                msg
            );
        }
    }


}