import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { CustomerCard } from "./_components/card";

export default async function Customers() {
   const session = await getServerSession(authOptions);

   if (!session || !session.user) {
     redirect("/");
   }

  return (
    <main className="w-full">
      <Container>
        <section className="mt-9 mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Meus clientes</h1>
            <Link href="/painel/clientes/novo" className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-4 py-1 text-white rounded">
              Novo cliente
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
