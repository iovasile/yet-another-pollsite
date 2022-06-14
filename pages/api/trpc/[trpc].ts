import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../db/client";
import superjson from "superjson";

export const router = trpc
  .router()
  .transformer(superjson)
  .query("getAllQuestions", {
    async resolve() {
      return await prisma.pollQuestion.findMany();
    },
  });
// .query("hi", {
//   input: z
//     .object({
//       text: z.string().nullish(),
//     })
//     .nullish(),
//   resolve({ input }) {
//     return {
//       greeting: `hello ${input?.text ?? "world"}`,
//     };
//   },
// });

// export type definition of API
export type AppRouter = typeof router;

// export API handler
export default trpcNext.createNextApiHandler({
  router: router,
  createContext: () => null,
});
