import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";

export default async function painel() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="w-full">
      <Container>
        <h2 className="">Painel</h2>
      </Container>
    </main>
  );
}
