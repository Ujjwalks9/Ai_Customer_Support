import { processChat } from "../services/chat.service.js"
export const handleChat = async (body: any) =>
  processChat(body.message, body.conversationId)