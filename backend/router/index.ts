import * as trpc from "@trpc/server";

import superjson from "superjson";
import { optionsRouter } from "./options";
import { questionsRouter } from "./questions";
import { votesRouter } from "./votes";

export const router = trpc
  .router()
  .transformer(superjson)
  .merge("questions.", questionsRouter)
  .merge("votes.", votesRouter)
  .merge("options.", optionsRouter);
// export type definition of API
export type AppRouter = typeof router;
