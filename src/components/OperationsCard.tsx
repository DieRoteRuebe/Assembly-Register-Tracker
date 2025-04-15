import { Operation } from "../types/Operation";

interface OperationsCard_Props {
    activeOperation: Operation;
    onOperationsSelect: (op: Operation) => void;
    isActive: (op: Operation) => boolean;
}

function OperationsCard(Props: OperationsCard_Props) {
    const handleOperationSelect = (op: Operation) => {
        Props.onOperationsSelect(Props.isActive(op) ? null : op);
    }

    return(
        <div className="col-span-2 p-0 rounded-xl shadow-md bg-green-200">
            <div className="grid grid-cols-4 gap-2 p-3">
                {/* Erste Spalte */}
                <div className="grid grid-cols-1 gap-3 p-2">
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('AND')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('AND') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            &
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('OR')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('OR') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            |
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('XOR')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('XOR') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            ^
                        </button>
                    </div>
                </div>

                {/* Zweite Spalte */}
                <div className="grid grid-cols-1 gap-3 p-2">
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('ADD')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('ADD') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            ADD
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('SUB')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('SUB') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            SUB
                        </button>
                    </div>
                </div>

                {/* Dritte Spalte */}
                <div className="grid grid-cols-1 gap-3 p-2">
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('MUL')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('MUL') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            MUL
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('IMUL')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('IMUL') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            IMUL
                        </button>
                    </div>
                </div>

                {/* Vierte Spalte (mit Hinweisen) */}
                <div className="grid grid-cols-1 gap-3 p-2">
                    <div>
                        <button
                            title="RAX is used as Result, RDX is the Reminder"
                            onClick={() => handleOperationSelect('DIV')} 
                            className={`w-full px-1 py-1 rounded transition-all duration-200 ${
                                Props.isActive('DIV') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            DIV
                        </button>
                        {Props.activeOperation === 'DIV' && (
                            <div className="text-xs text-red-600 mt-1">
                                Uses RAX (Dividend) + Selected (Divisor)
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <button 
                            onClick={() => handleOperationSelect('MOD')} 
                            className={`w-full px-1 py-1 rounded ${
                                Props.isActive('MOD') 
                                ? 'bg-yellow-400 text-black border-2 border-yellow-600 transform scale-[1.02] shadow-md' 
                                : 'bg-black text-white hover:bg-red-600'
                            }`}
                        >
                            MOD
                        </button>
                        {Props.activeOperation === 'MOD' && (
                            <div className="text-xs text-red-600 mt-1">
                                Uses RAX (Dividend) + Selected (Divisor)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperationsCard;