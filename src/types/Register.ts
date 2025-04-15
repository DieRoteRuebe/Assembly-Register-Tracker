export type RegisterStatus = "free" | "used";

export interface Register {
    name: string;
    varName: string;
    varValue: string;
    status: RegisterStatus;
}

export interface RegisterItem {
    registerIndex: number;
    registerName: string;
    registerValue: string;
    registerVar: string;

}