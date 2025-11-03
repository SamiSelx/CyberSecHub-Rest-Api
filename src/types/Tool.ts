export enum ToolCategory {
    PENTESTING = "Pentesting",
    OSINT = "OSINT",
    REVERSE_ENGINEERING = "Reverse Engineering",
    FORENSICS = "Forensics",
    EXPLOITATION = "Exploitation",
    MALWARE_ANALYSIS = "Malware Analyis",
    NETWORKING = "Networking",
    CRYPTOGRAPHY = "Cryptography",
    CLOUD_SECURITY = "Cloud Security",
    WEB_SECURITY = "Web Security"
}

export declare type Resources = {
    title: string;
    description: string;
    url: string;
}

export enum ToolStatus {
    PENDING = "Pending",
    DENIED = "Denied",
    APPROVED = "Approved"
}

export declare interface ToolInterface {
    name: string;
    githubURL: string;
    category: ToolCategory;
    description: string;
    usage: string | null;
    resources: string;
    status: ToolStatus;
}

export type OptimizedTool = Omit<ToolInterface, "category" | "resources" | "usage"> & { _id: string };