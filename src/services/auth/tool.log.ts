import Logger from "../../utils/Logger";

export type IToolLogs =
    | "TOOL_SAVED"
    | "TOOL_NOT_SAVED"
    | "TOOL_FOUND"
    | "COULD_NOT_CONNECT"
    | "TOOLS_FOUND"
    | "TOOLS_NOT_UPDATED";

export const toolLogs: IErrors<IToolLogs> = {
    TOOL_SAVED: {
        code: 0,
        message: "Tool saved successefully",
        type: "TOOL_SAVED"
    },
    TOOL_NOT_SAVED: {
        code: 1,
        message: "Tool not saved",
        type: "TOOL_NOT_SAVED",
    },
    TOOL_FOUND: {
        code: 2,
        message: "Tool found in the database",
        type: "TOOL_FOUND"
    },
    COULD_NOT_CONNECT: {
        code: 3,
        message: "Could not connect",
        type: "COULD_NOT_CONNECT"
    },
    TOOLS_FOUND: {
        code: 4,
        message: "Tools found successfully",
        type: "TOOLS_FOUND"
    },
    TOOLS_NOT_UPDATED: {
        code: 5,
        message: "Tools could not be updated",
        type: "TOOLS_NOT_UPDATED"
    }
} as const;

export default toolLogs;
export const toolLogger = new Logger("tool");