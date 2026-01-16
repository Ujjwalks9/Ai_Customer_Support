import { Hono } from "hono"
import { chatRoutes } from "./routes/chat.routes.js"
import { conversationRoutes } from "./routes/conversation.route.js"
import { agentRoutes } from "./routes/agent.routes.js"
import { healthRoutes } from "./routes/health.routes.js"

const app = new Hono()
app.route("/api/chat", chatRoutes)
app.route("/api/conversations", conversationRoutes)
app.route("/api/agents", agentRoutes)
app.route("/health", healthRoutes)

export default app