import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { NewCustomerForm } from "../_components/form";

export default async function NewCustomer() {
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
              href="/painel/clientes"
              className="px-2 py-1 bg-gray-900 dark:bg-gray-50 rounded text-white dark:text-black hover:scale-105 transition-all duration-300"
            >
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold">Novo cliente</h1>
          </div>

          <NewCustomerForm userId={session.user.id} />
        </section>
      </Container>
    </main>
  );
}
