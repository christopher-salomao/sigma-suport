"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>["onKeyDown"];
}

export function Input({
  type,
  name,
  placeholder,
  register,
  error,
  rules,
  onKeyDown,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        className="w-full border-2 border-slate-200 rounded-md px-2 h-11 outline-none"
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
        name={name}
        onKeyDown={onKeyDown}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
