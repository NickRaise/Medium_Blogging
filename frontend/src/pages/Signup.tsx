import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {

    return (
        <div className="grid grid-col1 lg:grid-cols-2">
            <Auth page="signup" />
            <Quote />
        </div>
    )
}
