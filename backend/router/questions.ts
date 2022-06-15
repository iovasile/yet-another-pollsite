import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { z } from "zod";

export const questionsRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.question.findMany();
    },
  })
  .query("get-one", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      return await prisma.question.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      text: z.string().min(5).max(255),
      endingAt: z.date().optional(),
    }),
    async resolve({ input }) {
      return await prisma.question.create({
        data: {
          text: input.text,
          endingAt: input.endingAt,
        },
      });
    },
  });
