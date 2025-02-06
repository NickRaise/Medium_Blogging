import { Link } from "react-router-dom"
import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { AllBlogsSkeleton } from "../components/Skeleton"

export const Blogs = () => {
    const [loading, allBlogs] = useBlogs()
    if (loading)
        return <AllBlogsSkeleton />

    return (
        <>
            <Appbar />
            <div className="pt-6 flex flex-col gap-5">
                {allBlogs.map(blog =>
                    <Link to={blog.id} key={blog.id}>
                        <BlogCard authorName={blog.author.name} title={blog.title} content={blog.content} />
                    </Link>
                )}
            </div>
        </>
    )
}
