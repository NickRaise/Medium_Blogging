import { MouseEventHandler } from "react"
import { Loading } from "./Loading"
export const Button = ({ loading, text, onClick }: {loading: boolean, text: string , onClick: MouseEventHandler<HTMLElement>}) => {
    return (
        <button onClick={onClick} type="button" className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${loading == true && "cursor-not-allowed"}`} disabled={loading}>
            {loading === true? <Loading /> :  text}
        </button>
    )
}