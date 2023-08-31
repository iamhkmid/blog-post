import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().nonempty("Required field"),
  email: z.string().nonempty("Required field").email("Invalid Email"),
  status: z.string().nonempty("Required field"),
});
