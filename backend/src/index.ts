import { Hono } from "hono";
import { cors } from 'hono/cors'
import mainRoutes from './routes/index'
import { hashPassword, verifyPassword } from './utils/hashing'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

app.use('/api/*', cors())

app.get("/", async (c) => {
  console.log("Server is hitted")
  const hashedPassword = await hashPassword("this is my password")
  return c.text(hashedPassword);
});

app.route("/api/v1", mainRoutes)

export default app;
