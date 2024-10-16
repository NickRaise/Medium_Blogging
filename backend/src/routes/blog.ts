import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>()

app.post("/", (c) => {
    return c.text("Blog post route")
})

app.put("/", (c) => {
    return c.text("Blog put route")
})

app.get("/:id", (c) => {
    return c.text("Blog:id get route")
})

app.get("/bulk", (c) => {
    return c.text("Blog bulk get route")
})

export default app