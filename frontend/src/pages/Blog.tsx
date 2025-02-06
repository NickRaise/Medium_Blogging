import { useBlog } from "../hooks"
import { Post } from "../components/Post"
import { Author } from "../components/Author"
import { Appbar } from "../components/Appbar"
import { ViewBlogSkeleton } from "../components/Skeleton"

export const Blog = () => {
    const [loading, blog] = useBlog()
    if (loading)
        return <ViewBlogSkeleton />
    return (
        <>
            <Appbar/>
            <div className="grid lg:grid-cols-5">
                <Post title={blog.title} content={blog.content} />
                <Author fullName={blog.author.name} />
            </div>
        </>
    )
}
