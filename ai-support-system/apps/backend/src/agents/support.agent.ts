import { streamText } from "ai"
import { groqModel } from "../ai/groq.client.js"
import { prisma } from "../db/prisma.js"

export async function supportAgent(
  conversationId: string
) {

  const history = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" }
  })


  const messages = history.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content
  }))


  const result = await streamText({
    model: groqModel,
    messages
  })

  return result
}
