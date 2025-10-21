import { create } from "zustand";
import { TicketProps } from "@/interfaces/tickets.type";
import { CustomerProps } from "@/interfaces/customer.type";

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

interface ModalStoreData {
  visible: boolean;
  handleModalVisible: () => void;
  ticketInfo: TicketInfo | undefined;
  setTicketInfo: (ticketInfo: TicketInfo) => void;
}

export const useModalState = create<ModalStoreData>((set) => ({
  visible: false,
  handleModalVisible: () => set((state) => ({ visible: !state.visible })),
  ticketInfo: undefined,
  setTicketInfo: (ticketInfo) => set({ ticketInfo }),
}));
