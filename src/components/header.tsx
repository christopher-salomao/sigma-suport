import Image from "next/image";
import { ThemeSwitch } from "./themeSwitch";
import { Container } from "./container";

export function Header () {
  return (
    <header className="w-full flex items-center justify-between bg-blue-950 h-25">
      <Container>
        <div className="w-full h-full flex items-center justify-between">
          <div className="relative h-16 w-1/10">
            <Image
              src={"/logo.png"}
              alt="Logo Sigma Suport"
              quality={100}
              priority
              fill
              className="object-contain"
            />
          </div>
          <ThemeSwitch />
        </div>
      </Container>
    </header>
  );
}
