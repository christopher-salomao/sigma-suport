import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import { TicketItem } from "./_components/ticket";

import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      Customer: true,
    },
  });

  return (
    <main className="w-full">
      <Container>
        <section className="mt-9 mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Chamados</h1>
            <Link
              href="/painel/novo"
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-4 py-1 text-white rounded"
            >
              Novo chamado
            </Link>
          </div>

          <table className="min-w-full my-2">
            <thead>
              <tr>
                <th className="font-medium text-left pl-1">CLIENTE</th>
                <th className="font-medium text-left hidden sm:table-cell">
                  CADASTRO
                </th>
                <th className="font-medium text-left">STATUS</th>
                <th className="font-medium text-left pr-1">#</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  customer={ticket.Customer}
                  ticket={ticket}
                />
              ))}
            </tbody>
          </table>
        </section>
      </Container>
    </main>
  );
}
