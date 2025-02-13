import { PrismaClient } from '@prisma/client'
// import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export type Context = {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

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