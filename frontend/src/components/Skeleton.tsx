
export const AllBlogsSkeleton = () => {
    return (
        <div className="w-full">
            <div className="m-auto w-[90%] lg:w-1/3 translate-y-[15%]">
                <SinglePostSkeleton />
                <SinglePostSkeleton />
                <SinglePostSkeleton />
            </div>
        </div>
    )
}

export const ViewBlogSkeleton = () => {
    return (
        <div className="lg:grid grid-cols-2 py-16 px-1 lg:px-14">
            <div className="">
                <div role="status" className="max-w-sm animate-pulse flex flex-col gap-1 mb-6">
                    <div className="h-4 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div role="status" className="max-w-sm animate-pulse flex flex-col gap-1 mb-6">
                <div className="h-3 bg-gray-200 rounded-full max-w-[70px] mb-2"></div>
                <div className="flex items-center gap-1">
                    <div className="rounded-full h-10 w-10 bg-gray-200"></div>
                    <div>
                        <div className="h-3 bg-gray-200  rounded-full w-32 mb-3"></div>
                        <div className="h-2 bg-gray-200  rounded-full w-56 mb-1"></div>
                        <div className="h-2 bg-gray-200  rounded-full w-48 mb-1"></div>
                        <div className="h-2 bg-gray-200  rounded-full w-52"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SinglePostSkeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-1">
                <div className="rounded-full h-10 w-10 bg-gray-200"></div>
                <div className="h-3 bg-gray-200  rounded-full w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}