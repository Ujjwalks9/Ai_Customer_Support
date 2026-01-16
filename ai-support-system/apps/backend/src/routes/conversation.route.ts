import { Hono } from "hono"
import { prisma } from "../db/prisma.js"

export const conversationRoutes = new Hono()

conversationRoutes.get("/", async (c) => {
  const conversations = await prisma.conversation.findMany({
    select: { id: true, createdAt: true }
  });
  return c.json(conversations);
})

conversationRoutes.get("/:id", async (c) => {
  const messages = await prisma.message.findMany({
    where: { conversationId: c.req.param("id") }
  });
  return c.json(messages);
});

conversationRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id")

  await prisma.message.deleteMany({
    where: { conversationId: id }
  })


  await prisma.conversation.delete({
    where: { id }
  })

  return c.json({ message: "Conversation deleted successfully" })
})
