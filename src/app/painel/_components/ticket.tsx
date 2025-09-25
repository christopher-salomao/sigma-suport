import { FiTrash2, FiFile } from "react-icons/fi";

export function TicketItem() {
  return (
    <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300">
      <td className="text-left pl-1">Mercado Pereira</td>
      <td className="text-left hidden sm:table-cell">23/09/2025</td>
      <td className="text-left">
        <span className="text-black bg-green-500 px-2 py-1 rounded">
          Aberto
        </span>
      </td>
      <td className="text-left">
        <button className="mr-2">
          <FiTrash2 size={24} color="#ef4444" />
        </button>
        <button>
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
  );
}
