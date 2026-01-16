import { prisma } from "../db/prisma.js"
export const getInvoice = (id: string) =>
  prisma.invoice.findUnique({ where: { id } })