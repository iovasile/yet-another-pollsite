import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";

export const questionsRouter = trpc.router().query("get-all", {
  async resolve() {
    return await prisma.pollQuestion.findMany();
  },
});
