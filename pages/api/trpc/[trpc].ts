import * as trpcNext from "@trpc/server/adapters/next";
import { router } from "../../../backend/router";

// export API handler
export default trpcNext.createNextApiHandler({
  router: router,
  createContext: () => null,
});
