import { Hono } from "hono"
import { handleChat } from "../controllers/chat.controller.js"

export const chatRoutes = new Hono()

chatRoutes.post("/messages", async (c) => {
  const body = await c.req.json()
  const result = await handleChat(body)

 
  if (result.type === "stream") {
    return result.stream.toTextStreamResponse({
      headers: {
        "X-Agent-Type": result.agentType
      }
    })
  }

  // Non-streaming agents
  return c.json(result)
})
