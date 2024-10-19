import { ChangeEventHandler } from "react"

interface Input {
    name: string,
    type?: string,
    placeholder?: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input = ({ name, type, placeholder, onChange }: Input) => {
    return (
        <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">{ name }</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder || ""} required />
        </div>
    )
}
