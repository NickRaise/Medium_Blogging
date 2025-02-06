
export const Post = ({ title, content } : {title: string, content: string}) => {
    return (
        <div className="lg:col-span-3 flex flex-col p-10 lg:p-16 gap-8">
            <div className="text-4xl font-black">{title}</div>
            <div className=" text-slate-700">{content}</div>
        </div>
    )
}
