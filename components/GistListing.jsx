import { useState, useEffect } from "react";

import { getToken, GistApiWrapper } from "../lib/lib";
import Gist from "./Gist";

export default function GistListing() {
    const [token, setToken] = useState('')
    const [gists, setGists] = useState([])

    useEffect(() => {
        getToken(setToken)
    }, [])

    const getAllGists = async () => {
        let wrapper = new GistApiWrapper(token)

        let response = await wrapper.getAllGists().then((res) => res.data).catch((e) => console.error(e))
        setGists(response)
    }

    return (
        <div>
            {gists.map((gist) => (<Gist url={gist.html_url} key={gist.id} description={gist.description} />))}
            <button onClick={getAllGists}>Reload</button>
        </div>
    )
}