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
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool)
})

async function main() {
  console.log("Seeding database...")

  // Create Conversations
  const conversation1 = await prisma.conversation.upsert({
    where: { id: "conv-101" },
    update: {},
    create: { id: "conv-101" }
  })

  const conversation2 = await prisma.conversation.upsert({
    where: { id: "conv-202" },
    update: {},
    create: { id: "conv-202" }
  })

  // Create Messages (Conversation History)
  await prisma.message.createMany({
    data: [
      {
        id: "msg-1",
        role: "user",
        content: "What is my order status?",
        agentType: "order",
        conversationId: conversation1.id
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "Order status: Processing",
        agentType: "order",
        conversationId: conversation1.id
      },
      {
        id: "msg-3",
        role: "user",
        content: "I need help with my account",
        agentType: "support",
        conversationId: conversation2.id
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "Sure, I can help you with support questions.",
        agentType: "support",
        conversationId: conversation2.id
      }
    ],
    skipDuplicates: true
  })

  // Create Orders
  await prisma.order.createMany({
    data: [
      { id: "ORD001", status: "Processing" },
      { id: "ORD002", status: "Delivered" }
    ],
    skipDuplicates: true
  })

  //  Create Invoices
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
  .catch((e) => {
    console.error(" Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
