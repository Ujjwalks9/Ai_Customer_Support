import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const { Pool } = pg

// Create Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Prisma v7 client with adapter
export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool)
})

async function main() {
  console.log(" Seeding database...")


  const conv1 = await prisma.conversation.upsert({
    where: { id: "conv-101" },
    update: {},
    create: { id: "conv-101" }
  })

  const conv2 = await prisma.conversation.upsert({
    where: { id: "conv-202" },
    update: {},
    create: { id: "conv-202" }
  })


  await prisma.message.createMany({
    data: [
      {
        id: "msg-1",
        role: "user",
        content: "What is my order status?",
        agentType: "order",
        conversationId: conv1.id
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "Order status: Processing",
        agentType: "order",
        conversationId: conv1.id
      },
      {
        id: "msg-3",
        role: "user",
        content: "I need help with my account",
        agentType: "support",
        conversationId: conv2.id
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "Sure, I can help you with support questions.",
        agentType: "support",
        conversationId: conv2.id
      }
    ],
    skipDuplicates: true
  })


  await prisma.order.createMany({
    data: [
      { id: "ORD001", status: "Processing" },
      { id: "ORD002", status: "Delivered" }
    ],
    skipDuplicates: true
  })

  
  await prisma.invoice.createMany({
    data: [
      { id: "INV001", status: "Paid" },
      { id: "INV002", status: "Refunded" }
    ],
    skipDuplicates: true
  })

  console.log(" Database seeded successfully")
}

main()
  .catch((err) => {
    console.error(" Seeding failed:", err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
