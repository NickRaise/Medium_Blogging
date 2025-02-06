
import { useEffect } from "react"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {    
            navigate("/blog")
        }
    }, [])

    return (
        <div className="grid grid-col1 lg:grid-cols-2">
            <Auth page="login" />
            <Quote />
        </div>
    )
}
