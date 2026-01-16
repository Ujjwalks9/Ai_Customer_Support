export function ChatMessage({
  role,
  content
}: {
  role: "user" | "assistant"
  content: string
}) {
  return (
    <div
      style={{
        textAlign: role === "user" ? "right" : "left",
        margin: "8px 0"
      }}
    >
      <span
        style={{
          padding: "10px",
          borderRadius: "8px",
          background: role === "user" ? "#DCF8C6" : "#F1F1F1"
        }}
      >
        {content}
      </span>
    </div>
  )
}
