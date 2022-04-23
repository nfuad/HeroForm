import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

const createPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    return global.prisma
  }
}

const prisma = () => {
  if (!prismaClient) {
    prismaClient = createPrismaClient()
  }
  return prismaClient
}

export default prisma
