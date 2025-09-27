import type { CustomerProps } from "@/interfaces/customer.type";

export function CustomerCard({ customer }:{customer: CustomerProps}) {
  return (
    <article className="flex flex-col border-2 border-slate-200 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 hover:scale-105 transition-all duration-300 gap-2">
      <h2>
        <strong>Nome:</strong> {customer.name}
      </h2>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Telefone:</strong> {customer.phone}
      </p>
      <button className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-0.5 text-white rounded mt-2 self-start">
        Excluir cliente
      </button>
    </article>
  );
}
