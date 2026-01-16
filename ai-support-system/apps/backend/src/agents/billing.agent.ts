import { getInvoice } from "../tools/billing.tool.js"
export async function billingAgent() {
  const invoice = await getInvoice("INV001")
  return `Invoice status: ${invoice?.status}`
}