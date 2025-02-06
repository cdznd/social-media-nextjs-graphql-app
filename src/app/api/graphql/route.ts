
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";

import { createContext } from "@/lib/prisma/context";

// TODO: Fix typing of server
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: createContext,
});

export { handler as GET, handler as POST };