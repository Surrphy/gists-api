import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { GistApiWrapper, getToken } from "../../lib/lib";
import GistEdit from "../../components/GistEdit";

export default function Gist() {
    const [token, setToken] = useState('')
    const [gist, setGist] = useState(null)
    
    const router = useRouter()

    const filenameRef = useRef(null)

    const getGist = async () => {
        let wrapper = new GistApiWrapper(token)

        let response = await wrapper.getGist(router.query.id).then(res => res.data).catch(e => console.log(e))
        setGist(response)
        console.log(gist)
    }

    useEffect(() => {
        getToken(setToken)
    }, [])

    return (
        <div>
            <h4>Filename</h4>
            <select ref={filenameRef}>
                {gist ? Object.keys(gist.files).map((e, i) => (<option value={e} key={i}>{e}</option>)) : ''}
            </select>
            <h4>Description</h4>
            <p>{gist?.description}</p>
            <h4>Content</h4>
            <p>{gist?.files[filenameRef]?.content}</p>
            <h4>Public?</h4>
            <p>{gist?.public ? 'Yes' : 'No'}</p>
            <p><a href={gist?.html_url}>Go to gist</a></p>
            <button onClick={getGist}>reload</button>
            <GistEdit gist={gist} />
        </div>
    )
}