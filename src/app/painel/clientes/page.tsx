import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";

export default async function Clientes() {
   const session = await getServerSession(authOptions);

   if (!session || !session.user) {
     redirect("/");
   }

  return (
    <main className="w-full">
      <Container>
        <h1>Clientes</h1>
      </Container>
    </main>
  );
}
