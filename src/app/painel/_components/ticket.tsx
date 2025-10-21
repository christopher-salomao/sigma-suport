"use client";

import { FiCheckCircle, FiFile } from "react-icons/fi";
import type { TicketProps } from "@/interfaces/tickets.type";
import { CustomerProps } from "@/interfaces/customer.type";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { useModalState } from "@/stores/useModalState";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();

  const { handleModalVisible, setTicketInfo, ticketInfo } = useModalState();

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      console.log(response.data);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenModal() {
    setTicketInfo({
      customer,
      ticket
    })
    handleModalVisible();
  }

  return (
    <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300">
      <td className="text-left pl-1">{customer?.name}</td>
      <td className="text-left hidden sm:table-cell">
        {ticket.created_at?.toLocaleDateString("pt-BR")}
      </td>
      <td className="text-left">
        <span className={`text-black ${ticket.status === "ABERTO" ? "bg-red-500" : "bg-green-500"}  px-2 py-1 rounded`}>
          {ticket.status}
        </span>
      </td>
      <td className="text-left">
        <button className="mr-2 text-neutral-500 hover:scale-110 transition-all duration-300" onClick={handleChangeStatus} hidden={ticket.status === "FECHADO"}>
          <FiCheckCircle size={24} />
        </button>
        <button onClick={handleOpenModal} className="hover:scale-110 transition-all duration-300">
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
  );
}
