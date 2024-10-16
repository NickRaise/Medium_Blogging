import { Hono } from "hono";
import mainRoutes from './routes/index'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

app.get("/", (c) => {
  return c.text("Hello World Hono!");
});

app.route("/api/v1", mainRoutes)

export default app;
