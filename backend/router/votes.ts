import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { z } from "zod";

export const votesRouter = trpc.router().query("vote-for-option", {
  input: z.object({
    optionID: z.string(),
  }),
  async resolve({ input }) {
    return await prisma.vote.create({
      data: {
        optionID: input.optionID,
      },
    });
  },
});
