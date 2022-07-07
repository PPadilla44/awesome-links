import { PrismaClient } from "@prisma/client";

export const resolvers = {
  Query: {
    links: async (_parent, _args, ctx: { prisma: PrismaClient }) =>
      await ctx.prisma.link.findMany(),
  },
};
