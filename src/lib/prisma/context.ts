import { PrismaClient } from '@prisma/client'
// import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export type Context = {
  prisma: PrismaClient
}

export const prisma = new PrismaClient()

export const createContext = async () => ({
  prisma: prisma,
})

// // Mock Context for prisma unit testing
// export type MockContext = {
//   prisma: DeepMockProxy<PrismaClient>
// }

// export const createMockContext = (): MockContext => {
//   return {
//     prisma: mockDeep<PrismaClient>()
//   }
// }

// import { PrismaClient } from "@prisma/client"
 
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
// export const prisma = globalForPrisma.prisma || new PrismaClient()
 
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// export type Context = {
//     prisma: PrismaClient;
// };