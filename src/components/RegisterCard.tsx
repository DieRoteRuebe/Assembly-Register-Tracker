import { Register } from '../types/Register.ts'

interface RegisterCard_Props {
    data: Register;
    onChange: (newData: Partial<Register>) => void;
    addItem: (registerIndex: number, registerName: string, registerVar: string, registerVarVal: string ) => void;
    index: number;
    selectionIsActive: () => boolean;
    onRegisterSelect: (index: number) => void;
    isSelected: boolean;
}
function RegisterCard(Props: RegisterCard_Props) {
    const handle_push_Click = () => {
      if (!Props.data.varValue) {
        alert("Bitte erst Variable zuweisen!");
        return;
      }
      Props.addItem(Props.index, Props.data.name, Props.data.varName, Props.data.varValue);
      Props.onChange({ status: "free", varName: "", varValue: "" });
    };
    const getColor = () => {
      switch (Props.data.status) {
        case "free": return "bg-green-200";
        case "used": return "bg-red-300";
        default: return "bg-gray-200";
      } 
    };


    return (
      <div 
      className={`p-4 rounded-xl shadow-md ${getColor()} ${Props.selectionIsActive() ? 'cursor-pointer' : ''}
        ${Props.isSelected ? 'bg-blue-100 border-2 border-blue-500' : 'border-2 border-transparent'}`}
      onClick={Props.selectionIsActive() ? () => Props.onRegisterSelect(Props.index) : undefined}
      >
        <h2 className="font-bold text-xl">{Props.data.name}</h2>
        <input
          type="text"
          placeholder="Variable"
          value={Props.data.varName}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => Props.onChange({ varName: e.target.value, status: "used" })}
          className="mt-2 w-full p-1 border rounded"
        />
        <input
          type="text"
          placeholder="Value"
          value={Props.data.varValue}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => Props.onChange({ varValue: e.target.value , status: "used"})}
          className="mt-2 w-full p-1 border rounded"
        />
        <div className="mt-2 flex gap-2">
          <button onClick={() => Props.onChange({ status: "used" })} className="bg-red-500 text-white px-2 py-1 rounded">
            Block
          </button>
          <button onClick={() => Props.onChange({ status: "free", varName: "", varValue: ""})} className="bg-green-500 text-white px-2 py-1 rounded">
            Free
          </button>
          <button onClick={handle_push_Click} className="bg-green-500 text-white px-2 py-1 rounded">
            Push
          </button>
        </div>
      </div>
    );
  }
  
  export default RegisterCard;
  