import { Hono } from "hono"

export const agentRoutes = new Hono()

agentRoutes.get("/", (c) => {
  return c.json({
    agents: ["support", "order", "billing"]
  });
});

agentRoutes.get("/:type/capabilities", (c) => {
  return c.json({
    type: c.req.param("type"),
    capabilities: ["query", "fetch", "history"]
  });
});