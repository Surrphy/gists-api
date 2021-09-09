import { useState } from "react"

export default function AddToken() {
    const [token, setToken] = useState('')

    const addToken = (e) => {
        e.preventDefault()

        localStorage.setItem('token', token)
        setToken('')
    }

    return (
        <form onSubmit={(e) => addToken(e)}>
            <input type="password" value={token} onChange={(e) => {setToken(e.target.value)}} />
            <input type="submit" value="Add Token" />
        </form>
    )
}