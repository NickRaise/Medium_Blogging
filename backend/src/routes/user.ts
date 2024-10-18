import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../utils/hashing'
import { signinInput, signupInput } from '../utils/zodValidation'

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

    try {
        const body = await c.req.json()
        const { success } = signupInput.safeParse(body)
        if (!success) {
            throw "Invalid inputs"
        }
        const hashedPassword = await hashPassword(body.password)
        const user  = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        c.status(201)
        return c.json({ jwt: token })
    } catch (e) {
        console.log(e)
        c.status(403)
        return c.json({ "message": "Email already taken / Invalid credentials!" })
    }

})

app.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const { success } = signinInput.safeParse(body)
        if (!success) {
            throw "Invalid inputs"
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })

        if (user && await verifyPassword(user.password, body.password)) {
            const token = await sign({ id: user.id }, c.env.JWT_SECRET)
            c.status(201)
            return c.json({ jwt: token })
        }

        c.status(403)
        return c.json({ "error": "Invalid Credentials!" })
    } catch (e) {
        console.log(e)
        return c.json({"message": "Some error occurred!"})
    }
})

export default app