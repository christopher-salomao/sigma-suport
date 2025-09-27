"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type FormData } from "./schema";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input";

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/cliente", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      adress: data.adress,
      userId,
    });

    router.refresh();
    router.replace("/painel/clientes");
  }

  function blockInputLetters(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "(",
      ")",
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterCustomer)}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2 mt-6 mb-1">
        <label htmlFor="name" className="text-lg font-medium">
          * Nome completo:
        </label>
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome completo do cliente"
          error={errors.name?.message}
          register={register}
        />
      </div>

      <section className="flex flex-col sm:flex-row w-full gap-2">
        <div className="flex flex-col gap-2 flex-1 mb-1">
          <label htmlFor="phone" className="text-lg font-medium">
            * Telefone:
          </label>
          <Input
            type="text"
            name="phone"
            placeholder="(XX) X XXXX XXXX"
            error={errors.phone?.message}
            register={register}
            onKeyDown={blockInputLetters}
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 mb-1">
          <label htmlFor="email" className="text-lg font-medium">
            * Email:
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Digite o email do cliente"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <div className="flex flex-col gap-2 mb-1">
        <label htmlFor="adress" className="text-lg font-medium">
          Endereço completo:
        </label>
        <Input
          type="text"
          name="adress"
          placeholder="Digite o endereço completo do cliente"
          error={errors.adress?.message}
          register={register}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 h-11 text-white font-bold rounded my-4"
      >
        Cadastrar
      </button>
    </form>
  );
}
