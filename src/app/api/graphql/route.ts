import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";
import { createContext, Context } from "@/lib/prisma/context";

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async () => {
    return createContext();
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}