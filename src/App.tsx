import React, { useEffect } from 'react';
import { useState } from 'react'
import './styles/App.css'


//types:
import { Register, RegisterItem } from './types/Register.ts'
import { Operation } from './types/Operation.ts';
import { OperationReturnItem } from './types/OperationsReturnItem.ts';

//components:
import  RegisterCard  from './components/RegisterCard.tsx'
import OperationsCard from './components/OperationsCard.tsx';

//hooks:
import './hooks/useRegisters.tsx'
import { useRegisters } from './hooks/useRegisters.tsx';
import { useItem } from './hooks/useItems.tsx';

//utils:
import { PerformOperation } from './utils/PerformOperation.tsx';

function App() {
  useEffect(() => {
    document.title = "Register Tracker";
  })

  const {registers, updateRegister} = useRegisters();
  const {items, addItem, popItem} = useItem()
  const [activeOp, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedRegisters, setSelectedRegisters] = useState<RegisterItem[]>([]);


  //Operations API:
  const operationisActive = (op: Operation) => activeOp === op;
  const registerSelectionIsActive = () => {
    if(activeOp != null) {
      return true;
    }
    return false;
  } 


  const onOperationSelect = (op: Operation) => {
    setSelectedOperation(op);
    setSelectedRegisters([]);
  }
  

  //Restore Item from RSP
  const handlePop = (itemIndex: number) => {
    const poppedItem = items[itemIndex];
    if(registers[poppedItem.registerIndex].status == "used") {
      alert(`Care Register ${registers[poppedItem.registerIndex].name} gets overwritten!`)
    }
    updateRegister(poppedItem.registerIndex, {
      status: "used",
      varName: poppedItem.registerVar,
      varValue: poppedItem.registerVarVal,
    })
    popItem(itemIndex);
  };
  


  const onRegisterSelect = (registerIndex: number) => {
    if(!registers[registerIndex].varValue) {
      alert(`Care! Register ${registers[registerIndex].name} has no value!`);
    } else {
      if(activeOp == "DIV" || activeOp == "MOD") {
        setSelectedRegisters(prev => {
          const reg: RegisterItem = {
            registerIndex: 0,
            registerName: registers[0].name,
            registerValue: registers[0].varValue,
            registerVar: registers[0].varName,
          }
          const updated = [...prev, reg];
          return updated;
        });
      }
      setSelectedRegisters(prev => {

        const reg: RegisterItem = {
          registerIndex: registerIndex,
          registerName: registers[registerIndex].name,
          registerValue: registers[registerIndex].varValue,
          registerVar: registers[registerIndex].varName,
        }
        const updated = [...prev, reg];
        if(updated.length == 2) {
          const result: OperationReturnItem = PerformOperation(activeOp, updated);
          if (!result.flagItem.error) {
            result.regItem.forEach(reg => {
              updateRegister(reg.registerIndex, {
                name: reg.registerName,
                varName: reg.registerVar,
                varValue: reg.registerValue,
                status: "used",
              });
            });
          }
          setSelectedOperation(null);
          return [];
        }
        return updated;
      });
    }
  }



  return (
    <div className="grid grid-cols-5 gap-6 p-8"> {/* Flexbox für horizontale Anordnung */}
      <div className="col-span-4 grid grid-cols-4 gap-6"> {/* Container für die Registerkarten */}
          {registers.map((reg, i) => (
          <RegisterCard key={i} data={reg} onChange={(newData) => updateRegister(i, newData)} addItem={addItem} index={i} selectionIsActive={registerSelectionIsActive} onRegisterSelect={onRegisterSelect} isSelected={selectedRegisters.some(r => r.registerIndex === i)}/>
        ))}
      <OperationsCard onOperationsSelect={onOperationSelect} isActive={operationisActive} activeOperation={activeOp}></OperationsCard>
      </div>
      <div className="col-span-1 p-6 border-2 border-gray-300 rounded-xl bg-gray-100">
        <h3 className="font-bold text-lg">RSP</h3>
          <div className="grid cols-1 gap-4 p-8">
            <ul className="list">
              {items.map((reg, index) => (
                <li key={index} className="flex justify-between items-center"><span>{reg.registerName}: {reg.registerVar} = {reg.registerVarVal} </span><button
                onClick={() => handlePop(index)} className="bg-green-500 text-white px-2 py-1 rounded">Pop</button></li>
              ))}
            </ul>   
          </div>
      </div>
    </div>
  );
}

export default App
