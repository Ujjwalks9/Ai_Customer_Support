import { prisma } from "../db/prisma.js"
export const getHistory = (id: string) =>
  prisma.message.findMany({ where: { conversationId: id } })