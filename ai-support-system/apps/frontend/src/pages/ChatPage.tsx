import { useState } from "react"
import { sendMessage } from "../api/chat.api"
import { ChatWindow } from "../components/ChatWindow"
import { ChatInput } from "../components/ChatInput"
import { ConversationList } from "../components/ConversationList"

type Message = {
  role: "user" | "assistant"
  content: string
  agent?: string
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)

  async function handleSend(text: string) {
  if (!conversationId) return

 
  setMessages((prev) => [
    ...prev,
    { role: "user", content: text }
  ])

  setTyping(true)

  try {
    const res = await sendMessage(text, conversationId)

    
    if (!res || !res.message) {
      throw new Error("Invalid API response")
    }

   
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: res.message,
        agent: res.agentType
      }
    ])
  } catch (err) {
    
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong. Please try again.",
        agent: "system"
      }
    ])
  } finally {
    setTyping(false)
  }
}


  function handleConversationSelect(id: string) {
    setConversationId(id)
    setMessages([]) // reset messages for new conversation
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <ConversationList onSelect={handleConversationSelect} />

      {/* Chat Area */}
      <div className="chat-container">
        <div className="chat-header">
          AI Customer Support
          {conversationId && (
            <span style={{ fontSize: "12px", marginLeft: "8px" }}>
              ({conversationId})
            </span>
          )}
        </div>

        <ChatWindow messages={messages} typing={typing} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
