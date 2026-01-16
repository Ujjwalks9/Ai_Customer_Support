export function routeIntent(message: string) {
  if (message.includes("order")) return "order"
  if (message.includes("refund") || message.includes("invoice")) return "billing"
  return "support"
}