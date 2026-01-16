import { prisma } from "../db/prisma.js"
export const getOrder = (id: string) =>
  prisma.order.findUnique({ where: { id } })