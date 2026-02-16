"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().nonempty("O nome do chamado é obrigatório"),
  description: z.string().nonempty("Descreva um pouco sobre o seu problema"),
});

type FormData = z.infer<typeof schema>;

export function FormTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="bg-slate-200 dark:bg-slate-800 mt-6 px-4 py-6 border-2 border-transparent">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium text-lg">
          Nome do chamado:
        </label>
        <Input
          register={register}
          type="text"
          placeholder="Digite o nome do chamado..."
          name="name"
          error={errors.name?.message}
        />
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="description" className="font-medium text-lg">
          Descreva o problema:
        </label>
        <textarea
          id="description"
          className="w-full border-2 border-slate-200 rounded-md px-2 h-24 outline-none resize-none"
          placeholder="Descreva o seu problema..."
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 my-1">{errors.description?.message}</p>
        )}

      </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-4 py-1 text-white font-medium rounded h-11 w-full mt-4"
        >
          Cadastrar
        </button>
    </form>
  );
}
