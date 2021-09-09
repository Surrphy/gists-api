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
            <h4>Filename</h4>
            <p>{gist?.files[Object.keys(gist.files)[0]].filename}</p>
            <h4>Description</h4>
            <p>{gist?.description}</p>
            <h4>Content</h4>
            <p>{gist?.files[Object.keys(gist.files)[0]].content}</p>
            <h4>Public?</h4>
            <p>{gist?.public ? 'Yes' : 'No'}</p>
            <p><a href={gist?.html_url}>Go to gist</a></p>
            <button onClick={getGist}>reload</button>
        </div>
    )
}