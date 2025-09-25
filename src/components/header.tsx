"use client";

import Image from "next/image";
import { Container } from "./container";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import Link from "next/link";
import { ThemeSwitch } from "@/components/themeSwitch";
import { useSession, signIn, signOut } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center justify-between bg-blue-950 h-25 shadow-sm  dark:shadow-white/25">
      <Container>
        <div className="w-full h-full flex items-center justify-between">
          <Link
            href="/"
            className="relative h-16 w-26 sm:w-40 hover:scale-105 transition-all duration-300"
          >
            <Image
              src={"/logo.png"}
              alt="Logo Sigma Suport"
              quality={100}
              priority
              fill
              className="object-contain"
            />
          </Link>

          {status === "loading" && (
            <div className="flex items-center gap-4">
              <FiLoader size={26} color="white" className="animate-spin" />
              <ThemeSwitch />
            </div>
          )}

          {status === "unauthenticated" && (
            <div className="flex items-center gap-4">
              <button onClick={handleLogin} title="Login">
                <FiLock size={26} color="white" />
              </button>
              <ThemeSwitch />
            </div>
          )}

          {status === "authenticated" && (
            <div className="flex items-center gap-4">
              <Link href="/painel">
                <FiUser size={26} color="white" />
              </Link>
              <button onClick={handleLogout}>
                <FiLogOut size={26} color="#ff2313" />
              </button>
              <ThemeSwitch />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
