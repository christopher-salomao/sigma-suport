import { Container } from "@/components/container";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prismaClient from "@/lib/prisma";
import type { CustomerProps } from "@/interfaces/customer.type";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers: CustomerProps[] = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("ticketName") as string;
    const description = formData.get("description") as string;
    const customerId = formData.get("customer") as string;

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/painel");
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

          <form
            className="flex flex-col gap-4 mt-6"
            action={handleRegisterTicket}
          >
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

            {customers.length !== 0 && (
              <div className="flex flex-col gap-1">
                <label htmlFor="customer">Selecione o cliente:</label>
                <select
                  name="customer"
                  id="customer"
                  className="w-full border-2 border-slate-200 rounded-md px-2 h-11 outline-none bg-white dark:bg-zinc-800"
                  defaultValue=""
                  required
                >
                  <option disabled value="">
                    Selecione
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {customers.length === 0 && (
              <Link href="/painel/clientes/novo">
                Você não possui nenhum cliente cadastrado,{" "}
                <span className="text-blue-500 font-medium">
                  clique aqui para cadastrar
                </span>
              </Link>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 h-11 text-white font-bold rounded my-4 disabled:bg-gray-400 disabled:!cursor-not-allowed"
              disabled={customers.length === 0}
            >
              Criar chamado
            </button>
          </form>
        </section>
      </Container>
    </main>
  );
}
