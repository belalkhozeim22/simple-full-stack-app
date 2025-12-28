import * as z from "zod";

export const zodLoginFormSchema = z.object({
  email: z.email({ error: "Email is invalid!" }),
  password: z.string().min(1, { error: "Password is required!" }),
});

export type TZodLoginFormSchema = z.infer<typeof zodLoginFormSchema>;
