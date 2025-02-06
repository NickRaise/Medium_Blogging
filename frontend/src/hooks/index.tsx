import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate, useParams } from "react-router-dom"

interface blogType {
    "id": string,
    "title": string,
    "content": string,
    "author": {
        "name": string
    }
}

export const useBlogs = (): [boolean, blogType[]] => {
    const [loading, setLoading] = useState(true)
    const [allBlogs, setAllBlogs] = useState<blogType[]>([])
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res)
                setAllBlogs(res.data.posts)
                setLoading(false)
            })
        }
        else {
            navigate("/signin")
        }
    }, [])

    return [loading, allBlogs]
}

export const useBlog = (): [boolean, blogType] => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<blogType>({
        id: "",
        title: "",
        content: "",
        author: {
            name: ""
        }
    })
    const { id } = useParams()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res)
                setBlog(res.data.post)
                setLoading(false)
            })
        }
        else {
            navigate("/signin")
        }
    }, [id])


    return [loading, blog]
}