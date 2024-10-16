import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>()

app.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        })

        return c.text("jwt token")
    } catch (e) {
        return c.status(403)
    }

})

app.post("/signin", (c) => {
    return c.text("Sign in route")
})

export default app