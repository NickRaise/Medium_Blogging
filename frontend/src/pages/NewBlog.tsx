import { Dispatch, useState, SetStateAction } from "react"
import { Appbar } from "../components/Appbar"
import { Loading } from "../components/Loading"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface BlogType {
    title: string,
    content: string
}

export const NewBlog = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [blog, setBlog] = useState<BlogType>({
        title: "",
        content: ""
    })

    const createPost = () => {
        try {
            setLoading(true)
            axios.post(`${BACKEND_URL}/api/v1/blog/`, blog, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then((res) => {
                setLoading(false)
                navigate(`/blog/${res.data.id}`)
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Appbar page="create" />
            <TextEditor setBlog={setBlog} />
            <div className="flex justify-end px-8 lg:px-32">
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 h-10 pt-5 w-24" onClick={createPost}>
                    {loading === true ? <Loading /> : <span className="text-md font-semibold relative top-1">
                        Publish
                    </span>}
                </button>
            </div>
        </div>
    )
}

const TextEditor = ({ setBlog }: { setBlog: Dispatch<SetStateAction<BlogType>>; }) => {
    return (
        <div className="flex px-10 lg:px-36 p-12 flex-col gap-8 h-full">
            <div className="relative w-full min-w-[30px]">
                <textarea onChange={e => setBlog(
                    prev => (
                        {
                            ...prev,
                            title: e.target.value
                        }
                    )
                )}
                    className="peer h-16 min-h-[30px] max-h-auto w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-bold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 text-4xl"
                    placeholder=" ">
                </textarea>
                <label
                    className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-slate-700">
                    Title
                </label>
            </div>
            <div className="relative w-full min-w-[200px]">
                <textarea onChange={e => setBlog(
                    prev => ({
                        ...prev,
                        content: e.target.value
                    })
                )}
                    className="peer h-full min-h-[300px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 text-slate-800"
                    placeholder=" ">
                </textarea>
                <label
                    className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-slate-700">
                    Tell us your story...
                </label>
            </div>
        </div>
    )
}
