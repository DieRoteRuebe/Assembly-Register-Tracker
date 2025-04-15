import { useState } from 'react';
import { Register } from '../types/Register.ts'

export const useRegisters = () => {
    const [registers, setRegisters] = useState<Register[]>([
        { name: "RAX", varName: "", varValue: "", status: "free" },
        { name: "RBX", varName: "", varValue: "", status: "free" },
        { name: "RDI", varName: "", varValue: "", status: "free" },
        { name: "RSI", varName: "", varValue: "", status: "free" },
        { name: "RDX", varName: "", varValue: "", status: "free" },
        { name: "RCX", varName: "", varValue: "", status: "free" },
        { name: "R8", varName: "", varValue: "", status: "free" },
        { name: "R9", varName: "", varValue: "", status: "free" },
        { name: "R10", varName: "", varValue: "", status: "free" },
        { name: "R11", varName: "", varValue: "", status: "free" },
        { name: "R12", varName: "", varValue: "", status: "free" },
        { name: "R13", varName: "", varValue: "", status: "free" },
        { name: "R14", varName: "", varValue: "", status: "free" },
        { name: "R15", varName: "", varValue: "", status: "free" }
      ]);

  const updateRegister = (index: number, newData: Partial<Register>) => {
    setRegisters(prev => 
      prev.map((reg, i) => 
        i === index ? { ...reg, ...newData } : reg
      )
    );
  };

  return {
    registers,
    updateRegister,
  };
};
