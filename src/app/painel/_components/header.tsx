import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {

  return (
    <Container>
      <header className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-black my-4 p-3 rounded flex items-center gap-4">
        <Link href="/painel" className="hover:font-bold transition-all duration-300">
          Chamados
        </Link>
        <Link href="/painel/clientes" className="hover:font-bold transition-all duration-300">
          Clientes
        </Link>
      </header>
    </Container>
  );
}
