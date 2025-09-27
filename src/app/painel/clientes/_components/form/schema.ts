import { email, z } from "zod";

export const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  phone: z
    .string()
    .nonempty("O telefone é obrigatório")
    .refine(
      (value) => {
        return (
          /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
          /^(?:\(\d{2}\)\s)\d{1}\s\d{4}\s\d{4}$/.test(value) ||
          /^\d{2}\s\d{9}$/.test(value) ||
          /^\d{11}$/.test(value)
        );
      },
      {
        message: "O número de telefone deve estar no formato (XX) X XXXX XXXX",
      }
    ),
  email: z.email("Insira um email valido").nonempty("O email é obrigatório"),
  adress: z.string(),
});

export type FormData = z.infer<typeof schema>;
