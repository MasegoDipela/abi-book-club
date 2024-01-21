import * as z from "zod";

export const JournalValidation = z.object({
  accountId: z.string(),
});

export const CommentValidation = z.object({
  journal: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
