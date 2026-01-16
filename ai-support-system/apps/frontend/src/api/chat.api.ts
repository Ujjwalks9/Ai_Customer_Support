import axios from "axios"

const API_BASE = "/api"

export async function sendMessage(
  message: string,
  conversationId: string
) {
  const res = await fetch("/api/chat/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, conversationId })
  })

  // If streaming
  if (res.headers.get("content-type")?.includes("text/plain")) {
    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    let text = ""
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      text += decoder.decode(value)
    }

    return {
      agentType: res.headers.get("X-Agent-Type"),
      message: text
    }
  }

  // Non-streaming
  return res.json()
}


