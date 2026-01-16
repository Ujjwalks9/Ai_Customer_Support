import { prisma } from "../db/prisma.js"
import { routeIntent } from "../agents/router.agent.js"
import { supportAgent } from "../agents/support.agent.js"

export async function processChat(
  message: string,
  conversationId: string
) {
  
  await prisma.conversation.upsert({
    where: { id: conversationId },
    update: {},
    create: { id: conversationId }
  })


  await prisma.message.create({
    data: {
      role: "user",
      content: message,
      agentType: "router",
      conversationId
    }
  })


  const intent = routeIntent(message)


  if (intent === "support") {
    const result = await supportAgent(conversationId)

    let finalText = ""

    // Collect streamed text
    for await (const chunk of result.textStream) {
      finalText += chunk
    }

    
    await prisma.message.create({
      data: {
        role: "assistant",
        content: finalText,
        agentType: "support",
        conversationId
      }
    })

   
    return {
      type: "stream",
      agentType: "support",
      stream: result
    }
  }

 
  let responseText = ""

  if (intent === "order") {
    responseText = "Order status: Processing"
  } else if (intent === "billing") {
    responseText = "Invoice status: Paid"
  }

  
  await prisma.message.create({
    data: {
      role: "assistant",
      content: responseText,
      agentType: intent,
      conversationId
    }
  })

  
  return {
    agentType: intent,
    message: responseText
  }
}
