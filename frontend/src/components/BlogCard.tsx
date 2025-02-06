import { Avatar } from "./Avatar"

interface postType {
    authorName: string,
    title: string,
    content: string
}

export const BlogCard = ({ authorName, title, content }: postType) => {
    const author = authorName.split(" ")[0] + " " + (authorName.includes(" ") ? authorName.split(" ")[1][0] + "." : "")
    return (
        <div className="w-3/4 lg:w-2/4 mx-auto flex flex-col gap-2 border-b border-b-slate-200">
            <div className="flex gap-2 items-center text-sm">
                <Avatar />
                <div className="text-slate-800">{author}</div>
                <Circle />
            </div>
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="text-slate-800">
                {content}
            </p>
            <div className="text-slate-400 text-sm my-2">{Math.ceil(content.length / 1000)} minute(s) read</div>
        </div>
    )
}

const Circle = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-slate-500 rounded-full h-1 w-1"></div>
        </div>
    )
}
