"use client";

import { useRef, MouseEvent } from "react";
import { useModalState } from "@/stores/useModalState";

export function Modal() {
  const { visible, handleModalVisible, ticketInfo } = useModalState();
  const modalRef = useRef<HTMLDivElement | null>(null);

  function handleModalClick(e: MouseEvent<HTMLDivElement>) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      onClick={handleModalClick}
      className="absolute bg-gray-900/50 dark:bg-black/50 w-full min-h-screen z-30"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-white/25 w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamdo
            </h1>
            <button
              onClick={handleModalVisible}
              className="bg-red-500 py-1 px-2 rounded text-white"
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticketInfo?.ticket.name}</p>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p>
              {ticketInfo?.ticket.description}
            </p>
          </div>

          <div className="w-full border-b-[1.5px] border-b-gray-300 my-4"></div>

          <h1 className="font-bold text-lg">Detalhes do cliente</h1>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticketInfo?.customer?.name}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Telefone:</h2>
            <p>{ticketInfo?.customer?.phone}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Email:</h2>
            <p>teste@teste.com</p>
          </div>

          {ticketInfo?.customer?.adress && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Endereço:</h2>
              <p>{ticketInfo?.customer?.adress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
