import { Container } from "@/components/container";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="w-full">
      <Container>
        <section className="mt-9 mb-2">
          <div className="flex items-center gap-4">
            <Link
              href="/painel"
              className="px-2 py-1 bg-gray-900 dark:bg-gray-50 rounded text-white dark:text-black hover:scale-105 transition-all duration-300"
            >
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold">Novo chamado</h1>
          </div>

          <form className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <label className="mb-1 font-medium text-lg" htmlFor="ticketName">
                Nome do chamdo:
              </label>
              <input
                type="text"
                id="ticketName"
                name="ticketName"
                placeholder="Digite o nome do chamado"
                className="w-full border-2 border-slate-200 rounded-md px-2 h-11 outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description">Descriçao do problema:</label>
              <textarea
                name="description"
                id="description"
                className="w-full border-2 border-slate-200 rounded-md px-2 h-24 outline-none resize-none"
                required
                placeholder="Descreva o problema aqui..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="customer">Selecione o cliente:</label>
              <select name="customer" id="customer" className="w-full border-2 border-slate-200 rounded-md px-2 h-11 outline-none bg-white dark:bg-zinc-800">
                <option value="" disabled selected>Selecione</option>
                <option value="1">Cliente 1</option>
              </select>
            </div>
          </form>
        </section>
      </Container>
    </main>
  );
}
