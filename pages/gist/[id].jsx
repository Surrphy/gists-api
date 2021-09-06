import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GistApiWrapper, getToken } from "../../lib/lib";

export default function Gist() {
    const [token, setToken] = useState('')
    const [gist, setGist] = useState([])
    
    const router = useRouter()

    const getGist = async () => {
        let wrapper = new GistApiWrapper(token)

        let response = await wrapper.getGist(router.query.id).then(res => res.data).catch(e => console.log(e))
        console.log(Object.keys(response.files))
        setGist(response)
    }

    useEffect(() => {
        getToken(setToken)
    }, [])

    return (
        <div>
            <h3>Filename</h3>
            <h4>{gist.files[Object.keys(gist.files)[0]].content}</h4>
            <button onClick={getGist}>reload</button>
        </div>
    )
}