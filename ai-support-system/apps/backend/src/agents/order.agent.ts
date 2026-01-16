import { getOrder } from "../tools/order.tool.js"
export async function orderAgent() {
  const order = await getOrder("ORD001")
  return `Order status: ${order?.status}`
}