import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (_: any, { id }: { id: string }) => await prisma.user.findUnique({ where: { id } }),
    posts: async () => await prisma.post.findMany(),
    post: async (_: any, { id }: { id: string }) => await prisma.post.findUnique({ where: { id } }),
    sessions: async () => await prisma.session.findMany(),
    session: async (_: any, { id }: { id: string }) => await prisma.session.findUnique({ where: { id } }),
    verificationRequests: async () => await prisma.verificationRequest.findMany(),
    verificationRequest: async (_: any, { id }: { id: string }) =>
      await prisma.verificationRequest.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: async (_: any, { name, email }: { name: string; email: string }) =>
      await prisma.user.create({ data: { name, email } }),
    createPost: async (_: any, { title, content, authorId }: { title: string; content: string; authorId: string }) =>
      await prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: authorId } },
        },
      }),
    updatePost: async (_: any, { id, title, content, published }: { id: number; title?: string; content?: string; published?: boolean }) =>
      await prisma.post.update({
        where: { id },
        data: { title, content, published },
      }),
    deletePost: async (_: any, { id }: { id: number }) =>
      await prisma.post.delete({ where: { id } }),
  },
};

export default resolvers;
