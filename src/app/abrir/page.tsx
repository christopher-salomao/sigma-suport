"use client";

import { useState } from "react";

import { Input } from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import { FormTicket } from "./_components/FormTicket";

import { email, set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .email("Insira um email valido para localizar o cliente.")
    .nonempty("O email é obrigatório."),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/cliente", {
      params: {
        email: data.email,
      }
    });

    if (!response.data) {
      setError("email", {
        type: "custom",
        message: "Cliente não encontrado!"
      })
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abra um chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <>
            <div className="bg-slate-200 dark:bg-slate-800 py-6 px-4 rounded border-2 border-transparent flex items-center justify-between">
              <p className="text-lg">
                <strong>Cliente selecionado: </strong>
                {customer.name}
              </p>
              <button
                onClick={handleClearCustomer}
                className="h-11 px-2 flex items-center justify-center rounded"
              >
                <FiX size={30} color="#e7000b" />
              </button>
            </div>

            <FormTicket />
          </>
        ) : (
          <form
            className="bg-slate-200 dark:bg-slate-800 py-6 px-2 rounded border-2 border-transparent"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3 *:first:bg-white *:first:text-black">
              <Input
                type="email"
                name="email"
                placeholder="DIgite o email do cliente..."
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="text-white flex gap-2 bg-blue-500 items-center justify-center hover:bg-blue-600 transition-all duration-300 px-2 rounded h-11 font-bold"
              >
                Procurar cliente
                <FiSearch size={24} color="#ffffff" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
