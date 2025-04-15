import { useState } from "react";
import { StackItem } from '../types/StackItem'

  export const useItem = () => {
    const [items, setItems] = useState<StackItem[]>([]);
    const addItem = (registerIndex: number, registerName: string, registerVar: string, registerVarVal: string) => {
        setItems(prev => [...prev, {
            registerIndex: registerIndex,
            registerName: registerName,
            registerVar: registerVar,
            registerVarVal: registerVarVal,
        }])
    }
    
    const popItem = (registerIndex: number) => {
        setItems(prev => prev.filter((_, i) => i !== registerIndex));
    }

    return {
        items,
        addItem,
        popItem,
    };
  };