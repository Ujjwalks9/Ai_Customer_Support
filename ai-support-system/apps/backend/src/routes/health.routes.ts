import { Hono } from "hono"
export const healthRoutes = new Hono()
healthRoutes.get("/", c => c.text("OK"))