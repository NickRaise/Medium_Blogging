
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { User } from "../types"

export const Signin = () => {

    return (
        <div className="grid grid-col1 lg:grid-cols-2">
            <Auth page="login" />
            <Quote />
        </div>
    )
}
