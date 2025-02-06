import { useState } from "react"
import axios from "axios"
import { User } from "../types"
import { Input } from "./Input"
import { Button } from "./Button"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

interface AuthUser {
    page: "login" | "signup",
}

export const Auth = ({ page }: AuthUser) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<User>({
        name: "",
        email: "",
        password: ""
    })
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const sendUserDetails = async () => {
        console.log("sending req")
        setErrorMsg("")
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${page === "signup" ? "signup" : "signin"}`, userData)
            setLoading(false)
            console.log(response)
            const token = response.data.jwt
            localStorage.setItem("token", `Bearer ${token}`)
            navigate("/blog")
        } catch (err) {
            console.log("SOme error occurred", err)
            if (axios.isAxiosError(err)) {
                console.log("this is axios error")
                setErrorMsg(err.response?.data.error || "An unknown error occurred from our server!")
            }
            else {
                setErrorMsg("An unknown error occurred!")
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-2 px-5 min-w-[70%]">
                <h1 className="text-3xl font-bold text-center">
                    {page == "signup" ? "Create an account" : "Login to your account"}
                </h1>
                <p className="text-center text-slate-600">
                    {page == "signup" ? "Already have an account? " : "Don't have an account? "}
                    <Link to={page == "signup" ? "/signin" : "/signup"} className="underline">
                        {page == "signup" ? "Login" : "Create"}
                    </Link>
                </p>
                {page == "signup" &&
                    <Input name="Name" placeholder="Enter your name" onChange={
                        e => setUserData(
                            prev => ({ ...prev, name: e.target.value })
                        )
                    } />}
                <Input name="Email" type="email" placeholder="Enter your email" onChange={
                    e => setUserData(
                        prev => ({ ...prev, email: e.target.value })
                    )
                } />
                <Input name="Password" type="password" onChange={
                    e => setUserData(
                        prev => ({ ...prev, password: e.target.value })
                    )
                } />
                {errorMsg !== "" &&
                    <p className="text-red-600 text-sm font-semibold">
                        {errorMsg}
                    </p>}
                <Button loading={loading} onClick={sendUserDetails} text={page == "signup" ? "Signup" : "Login"} />
            </div>
        </div>
    )
}
