import { useState } from "react"

export function ChatInput({ onSend }: any) {
  const [text, setText] = useState("")

  return (
    <div className="chat-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && onSend(text)}
      />
      <button
        onClick={() => {
          onSend(text)
          setText("")
        }}
      >
        Send
      </button>
    </div>
  )
}
