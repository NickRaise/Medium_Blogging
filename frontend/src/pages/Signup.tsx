import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
export const Signup = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/blog")
        }
    }, [])

    return (
        <div className="grid grid-col1 lg:grid-cols-2">
            <Auth page="signup" />
            <Quote />
        </div>
    )
}
