import { useEffect, useState } from "react"
import axios from "axios"

type Conversation = {
  id: string
  createdAt?: string
}

type Props = {
  onSelect: (id: string) => void
}

export function ConversationList({ onSelect }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = await axios.get<Conversation[]>("/api/conversations")
        setConversations(res.data)
      } catch (err) {
        setError("Failed to load conversations")
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [])

  return (
    <div className="sidebar">
      <h4>Conversations</h4>

      {loading && <p style={{ fontSize: "12px" }}>Loading...</p>}

      {error && (
        <p style={{ fontSize: "12px", color: "#f87171" }}>
          {error}
        </p>
      )}

      {!loading && !error && conversations.length === 0 && (
        <p style={{ fontSize: "12px", opacity: 0.7 }}>
          No conversations
        </p>
      )}

      {conversations.map((c) => (
        <div
          key={c.id}
          className="conversation-item"
          onClick={() => onSelect(c.id)}
        >
          {c.id}
        </div>
      ))}
    </div>
  )
}
