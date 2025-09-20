import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-blue-600">Atendimentos, clientes</h1>
      <Image
        src="/hero.svg"
        alt="Imagem hero do Sigma Suport"
        width={600}
        height={415}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
