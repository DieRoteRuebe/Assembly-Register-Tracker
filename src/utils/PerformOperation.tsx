import { Operation } from "../types/Operation";
import { RegisterItem } from "../types/Register";
import { CTF_Flags } from "../types/Assembler_Flags/CTF_Flags";
import { OperationReturnItem } from "../types/OperationsReturnItem";


export const PerformOperation = (op: Operation, regs: RegisterItem[]): OperationReturnItem => {
    let result: bigint = BigInt(0);
    const val1 = BigInt(regs[0].registerValue);
    const val2 = BigInt(regs[1].registerValue);
    let mod_val: bigint = BigInt(0)
    let div_flag = false;
    const flags: CTF_Flags = {
        OF: false,
        ZF: false,
        SF: false,
        CF: false,
        error: false,
    }

    const max_signed = 0x8000_0000_0000_0000n;
    const max_unsigned = 0x7FFF_FFFF_FFFF_FFFFn;
    switch(op) {
      case 'AND': 
        result = val1 & val2;
        break;
      case 'OR': 
        result = val1 | val2; 
        break;
      case 'XOR': 
        result = val1 ^ val2; 
        break;
      case 'ADD':
        result = val1 + val2;
        set_flags(val1, val2, result, op, flags);
        break;
      case 'SUB': 
        result = val1 - val2;
        set_flags(val1, val2, result, op, flags);
        break;
      case 'MUL':
        result = val1 * val2;
        set_flags(val1, val2, result, op, flags);
        break;
      case 'IMUL':
        result = val1 * val2;
        set_flags(val1, val2, result, op, flags);
        break;
      case 'MOD':
      case 'DIV':
        if (val2 === 0n) {
          alert("Division durch 0 ist nicht erlaubt!");
          flags.error = true;
          break;
        }
        div_flag = true;
        result = val1 / val2;
        mod_val = val1 % val2;
        set_flags(val1, val2, result, op, flags);
        break;
    }


    if(flags.CF || flags.OF) {
      result = max_unsigned;
      if(flags.SF) {
        result |= max_signed;
      }
    }

    const returnItem: OperationReturnItem = {
      regItem: [],
      flagItem: flags,
    }

    if(flags.error) {
      return returnItem;
    }

    const reg1Return: RegisterItem = {
      registerIndex: regs[0].registerIndex,
      registerName: regs[0].registerName,
      registerValue: result.toString(),
      registerVar: `res: ${regs[0].registerName} ${op} ${regs[1].registerName}`,
    }

    if(!div_flag) {
      returnItem.regItem = [reg1Return];
    } else {
      const reg2Return: RegisterItem = {
        registerIndex: 4,
        registerName: "RDX",
        registerValue: mod_val.toString(),
        registerVar: `rem: ${regs[0].registerName} ${op} ${regs[1].registerName}`,
      }
      returnItem.regItem = [reg1Return, reg2Return];
    }
    return returnItem;
  };

  const set_flags = (
    val1: bigint,
    val2: bigint,
    result: bigint,
    op: Operation,
    f: CTF_Flags
  ) => {
    const max_signed = 0x7FFF_FFFF_FFFF_FFFFn;
    const min_signed = -0x8000_0000_0000_0000n;
  
    f.ZF = result === 0n;
    f.SF = result < 0;
  
    if (op === 'ADD' || op === 'SUB') {
      // Sign Overflow detection (OF)
      const sign1 = val1 < 0n ? 1 : 0;
      const sign2 = val2 < 0n ? 1 : 0;
      const signR = result < 0n ? 1 : 0;
  
      if (op === 'ADD' && sign1 === sign2 && sign1 !== signR) {
        f.OF = true;
      }
      if (op === 'SUB' && sign1 !== sign2 && sign1 !== signR) {
        f.OF = true;
      }
  
      // Carry Flag für unsigned Overflow
      if (result > max_signed || result < min_signed) {
        f.CF = true;
      }
    }
  
    if (op === 'MUL' || op === 'IMUL') {
      if (result > max_signed || result < min_signed) {
        f.CF = true;
      }
    }
  
    if (op === 'DIV') {
      // Bei DIV macht CF/OF selten Sinn, aber ZF/SF kann man setzen
      f.ZF = result === 0n;
      f.SF = result < 0n;
    }
  };
  