import { Hono } from 'hono'
import userRoutes from './user'
import blogRoutes from './blog'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    };
}>();

app.route("/user", userRoutes)
app.route("/blog/", blogRoutes)

export default app