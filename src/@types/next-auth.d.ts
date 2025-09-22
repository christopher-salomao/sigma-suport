import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Sessio {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
