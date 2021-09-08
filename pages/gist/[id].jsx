import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GistApiWrapper, getToken } from "../../lib/lib";

export default function Gist() {
    const [token, setToken] = useState('')
    const [gist, setGist] = useState(null)
    
    const router = useRouter()

    const getGist = async () => {
        let wrapper = new GistApiWrapper(token)

        let response = await wrapper.getGist(router.query.id).then(res => res.data).catch(e => console.log(e))
        console.log(response)
        setGist(response)
    }

    useEffect(() => {
        getToken(setToken)
    }, [])

    return (
        <div>
            <p>Filename</p>
            <p>{gist&&gist.files[Object.keys(gist.files)[0]].filename}</p>
            <p>Content</p>
            <p>{gist&&gist.files[Object.keys(gist.files)[0]].content}</p>
            <button onClick={getGist}>reload</button>
        </div>
    )
}