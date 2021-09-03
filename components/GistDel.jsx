import { useState, useEffect } from "react";

import { GistApiWrapper, getToken } from "../lib/lib";

export default function GistDel(props) {
    const [token, setToken] = useState('')

    const deleteGist = (e, id) => {
        e.preventDefault()

        let wrapper = new GistApiWrapper(token)

        wrapper.deleteGist(id).catch((e) => console.log(e))
    }

    useEffect(() => {
        getToken(setToken)
    }, [])

    return (
        <button onClick={(e) => deleteGist(e, props.id)}>X</button>
    )
}