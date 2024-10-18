import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlog, updateBlog  } from '../utils/zodValidation'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()

app.use("/*", async (c, next) => {
    try {
        const token = c.req.header("Authorization") || ""
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split(" ")[1]
            const decode = await verify(jwtToken, c.env.JWT_SECRET)
            const userId = (decode as { id: string }).id;
            c.set('userId', userId)
            console.log("middleware reached")
            await next()
        }
    } catch (e) {
        c.status(403)
        return c.json({ "message": "Please signin again!" })
    }
})

app.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const userId = c.get("userId")
        const body = await c.req.json()
        const { success } = createBlog.safeParse(body)
        if (!success) {
            c.status(400)
            return c.json({"message": "Invalid inputs!"})
        }
        console.log("creating post...")
        const newPost = await prisma.post.create({
            data: {
                ...body,
                authorId: userId,
            }
        })
        console.log(newPost)
        return c.json({ id: newPost.id })
    } catch (err) {
        console.log(err)
        return c.json({ "message": "Some error occurred, Please try again!" })
    }
})

app.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const userId = c.get("userId")
        const { success } = updateBlog.safeParse(body)
        if (!success) {
            c.status(400)
            return c.json({"message": "Invalid inputs!"})
        }
        console.log("updating post...")
        const updatedPost = await prisma.post.update({
            where: {
                id: body.postId,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        console.log(updatedPost)
        return c.json({ id: updatedPost.id })
    } catch (error) {
        console.log(error)
        return c.json({ "message": "Some error occurred, Please try again!" })
    }
})

app.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // const allPosts = prisma.post.find({})
        const allPosts = await prisma.post.findMany({})
        console.log(allPosts, "Here are the posts")
        c.status(200)
        return c.json({ posts: allPosts })
    } catch (error) {
        return c.json({ "message": "Some error occurred, Please try again!" })
    }
})

app.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const postId = c.req.param("id")
        console.log(postId)
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if (post) {
            return c.json({ post: post })
        }
        return c.json({ "message": "The post may have been deleted or moved somewhere else!" })
    } catch (error) {
        // console.log(error)
        return c.json({ "message": "Some error occurred, Please try again!" })
    }
})

export default app