import { Avatar } from "./Avatar"

export const Author = ({ fullName } : {fullName: string}) => {
    return (
        <div className="m-auto lg:m-0 col-span-2 block lg:grid grid-cols-1 grid-rows-3 px-4 lg:pt-16">
            <div className="row-span-2 flex flex-col justify-end">
                <div className="font-semibold self-start">Author</div>
                <div className="flex gap-3">
                    <div className="pt-3">
                        <Avatar fullName={fullName} size="large" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-xl">Nikhil Kumar</div>
                        <div className="text-slate-800">THis is a random about author text hope wou like it...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
