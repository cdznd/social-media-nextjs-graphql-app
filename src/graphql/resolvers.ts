import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Define types for the parent objects
interface UserParent {
  id: string;
}

interface AccountParent {
  userId: string;
}

interface SessionParent {
  userId: string;
}

interface AuthenticatorParent {
  userId: string;
}

interface PostParent {
  id: string;
  authorId: string;
}

interface CategoryParent {
  id: string;
}

interface LikeParent {
  userId: string;
  postId: string;
}

interface CommentParent {
  userId: string;
  postId: string;
}

const resolvers = {
  DateTime: {

  },
  User: {
    accounts: (parent: UserParent) => prisma.account.findMany({ where: { userId: parent.id } }),
    sessions: (parent: UserParent) => prisma.session.findMany({ where: { userId: parent.id } }),
    authenticators: (parent: UserParent) => prisma.authenticator.findMany({ where: { userId: parent.id } }),
    posts: (parent: UserParent) => prisma.post.findMany({ where: { authorId: parent.id } }),
    likes: (parent: UserParent) => prisma.like.findMany({ where: { userId: parent.id } }),
    comments: (parent: UserParent) => prisma.comment.findMany({ where: { userId: parent.id } }),
  },
  Account: {
    user: (parent: AccountParent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },
  Session: {
    user: (parent: SessionParent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },
  Authenticator: {
    user: (parent: AuthenticatorParent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },
  Post: {
    author: (parent: PostParent) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    likes: (parent: PostParent) => prisma.like.findMany({ where: { postId: parent.id } }),
    comments: (parent: PostParent) => prisma.comment.findMany({ where: { postId: parent.id } }),
    categories: (parent: PostParent) => prisma.category.findMany({ where: { posts: { some: { id: parent.id } } } }),
  },
  Category: {
    posts: (parent: CategoryParent) => prisma.post.findMany({ where: { categories: { some: { id: parent.id } } } }),
  },
  Like: {
    user: (parent: LikeParent) => prisma.user.findUnique({ where: { id: parent.userId } }),
    post: (parent: LikeParent) => prisma.post.findUnique({ where: { id: parent.postId } }),
  },
  Comment: {
    user: (parent: CommentParent) => prisma.user.findUnique({ where: { id: parent.userId } }),
    post: (parent: CommentParent) => prisma.post.findUnique({ where: { id: parent.postId } }),
  },
  Query: {
    // User Queries
    user: (_: any, args: { id: string }) => prisma.user.findUnique({ where: { id: args.id } }),
    users: () => prisma.user.findMany(),
    // Post Queries
    post: (_: any, args: { id: string }) => prisma.post.findUnique({ where: { id: args.id } }),
    posts: (
      _: any,
      args: {
        userId?: string,
        search?: string,
        category?: string,
        orderBy?: { [key: string]: 'asc' | 'desc' }
      }
    ) => {
      // For this resolver is fetch feed posts, I want to return only
      // posts by the current user, and current user friends
      const {
        userId,
        search,
        category,
      } = args;
      const orderBy = args.orderBy || { createdAt: 'desc' };
      return prisma.post.findMany({
        where: {
          ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
          // ...(search ? { content: { contains: search, mode: "insensitive" } } : {}),
        },
        orderBy,
        include: {
          author: true,
          likes: { include: { user: true } },
          comments: true,
          categories: true,
        },
      });
    },
    // Category Queries
    category: (_: any, args: { id: string }) => prisma.category.findUnique({ where: { id: args.id } }),
    categories: () => prisma.category.findMany(),
    // Like Queries
    like: (_: any, args: { id: string }) => prisma.like.findUnique({ where: { id: args.id } }),
    likes: () => prisma.like.findMany(),
    // Comment Queries
    comment: (_: any, args: { id: string }) => prisma.comment.findUnique({ where: { id: args.id } }),
    comments: () => prisma.comment.findMany(),
  },
  Mutation: {
    // User Mutations
    createUser: (_: any, args: { name?: string; email: string; image?: string }) =>
      prisma.user.create({ data: { name: args.name, email: args.email, image: args.image } }),
    updateUser: (_: any, args: { id: string; name?: string; email?: string; image?: string }) =>
      prisma.user.update({ where: { id: args.id }, data: { name: args.name, email: args.email, image: args.image } }),
    deleteUser: (_: any, args: { id: string }) => prisma.user.delete({ where: { id: args.id } }),
    // Post Mutations
    createPost: (
      _: any,
      args: {
        title: string;
        content: string;
        authorId: string;
        thumbnail?: string;
        categories?: string[]
      }) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
          thumbnail: args.thumbnail,
          categories: {
            connectOrCreate: args.categories?.map((categoryName) => ({
              where: { name: categoryName },
              create: { name: categoryName },
            })) || [],
          },
        },
      });
    },
    updatePost: (_: any, args: { id: string; title?: string; content?: string; thumbnail?: string }) =>
      prisma.post.update({ where: { id: args.id }, data: { title: args.title, content: args.content, thumbnail: args.thumbnail } }),
    deletePost: (_: any, args: { id: string }) => prisma.post.delete({ where: { id: args.id } }),
    // Category Mutations
    createCategory: (_: any, args: { name: string }) => prisma.category.create({ data: { name: args.name } }),
    updateCategory: (_: any, args: { id: string; name: string }) =>
      prisma.category.update({ where: { id: args.id }, data: { name: args.name } }),
    deleteCategory: (_: any, args: { id: string }) => prisma.category.delete({ where: { id: args.id } }),
    // Like Mutations
    createLike: (_: any, args: { userId: string; postId: string }) =>
      prisma.like.create({ data: { userId: args.userId, postId: args.postId } }),
    deleteLike: (_: any, args: { id: string }) => prisma.like.delete({ where: { id: args.id } }),
    // Comment Mutations
    createComment: (_: any, args: { content: string; userId: string; postId: string }) =>
      prisma.comment.create({ data: { content: args.content, userId: args.userId, postId: args.postId } }),
    updateComment: (_: any, args: { id: string; content: string }) =>
      prisma.comment.update({ where: { id: args.id }, data: { content: args.content } }),
    deleteComment: (_: any, args: { id: string }) => prisma.comment.delete({ where: { id: args.id } }),
  },
};

export default resolvers;