import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { z } from "zod";

export const optionsRouter = trpc.router().query("get-all-for-question", {
  input: z.object({
    questionID: z.number(),
  }),
  async resolve({ input }) {
    return await prisma.option.findMany({
      where: {
        questionID: input.questionID,
      },
    });
  },
});
