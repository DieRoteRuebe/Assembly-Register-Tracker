import { RegisterItem } from "./Register";
import { CTF_Flags } from "./Assembler_Flags/CTF_Flags";

export interface OperationReturnItem {
    regItem: RegisterItem[];
    flagItem: CTF_Flags;
}