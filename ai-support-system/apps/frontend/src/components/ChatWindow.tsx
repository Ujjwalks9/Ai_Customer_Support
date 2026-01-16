

export function ChatWindow({ messages, typing }: any) {
    return (
        <div className="chat-window">
            {messages.map((m: any, i: number) => (
                <div className={`message ${m.role}`}>
                    {m.agent && (
                        <div className="agent-badge">
                            {m.agent.toUpperCase()} AGENT
                        </div>
                    )}
                    {m.content}
                </div>

            ))}
            {typing && <div className="typing">AI is thinking...</div>}
        </div>
    )
}
