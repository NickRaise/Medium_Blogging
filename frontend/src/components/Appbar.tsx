import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

export const Appbar = ({page}: {page?: 'create'}) => {
    return (
        <div className="flex justify-between px-5 lg:px-28 py-2 items-center w-screen shadow-md bg-slate-50">
            <Link to="/blog">
                <Logo />
            </Link>
            <div className="flex items-center gap-10">
                {page !== 'create' &&
                    <NewButton />
                }
                <Avatar size="large" />
            </div>
        </div>
    )
}

const Logo = () => {
    return (
        <div className="font-bold text-3xl">
            <span className="text-slate-600">&lt; </span>
            <span>Blog</span>
            <span className="text-slate-600">OP /&gt;</span>
        </div>
    )
}

const NewButton = () => {
    return (
        <Link to="/create">
            <button type="button" className="focus:outline-none h-9 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
        </Link>
    )
}
