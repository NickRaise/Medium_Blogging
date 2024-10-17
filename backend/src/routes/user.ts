import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../utils/hashing'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

app.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("signup route hit")
    try {
        console.log("Try block reached")
        const body = await c.req.json()
        console.log("body parshed")
        console.log("hashed password generating")
        const hashedPassword = await hashPassword(body.password)
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ jwt: token })
    } catch (e) {
        console.log(e)
        c.status(403)
        return c.json({ "error": "Error while signing up!" })
    }

})

app.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })

        if (user) {
            const correctPassword: Boolean = await verifyPassword(user.password, body.password)
            if (correctPassword) {
                const token = await sign({ id: user.id }, c.env.JWT_SECRET)
                return c.json({ jwt: token })
            }
        }
        c.status(403)
        return c.json({ "error": "Invalid Credentials!" })
    } catch (e) {
        return c.text(String(e))
    }
})

export default app