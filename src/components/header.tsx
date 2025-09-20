import Image from "next/image";
import { Container } from "./container";
import { FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";

export function Header () {
  return (
    <header className="w-full flex items-center justify-between bg-blue-950 h-25 shadow-sm  dark:shadow-white/25">
      <Container>
        <div className="w-full h-full flex items-center justify-between">
          <Link href="/" className="relative h-16 w-26 sm:w-40 hover:scale-105 transition-all duration-300">
            <Image
              src={"/logo.png"}
              alt="Logo Sigma Suport"
              quality={100}
              priority
              fill
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/painel">
              <FiUser size={26} color="white" />
            </Link>
            <button>
              <FiLogOut size={26}  color="white"/>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
