import { useEffect, useRef, useState } from "react";
import { getToken, GistApiWrapper } from "../lib/lib";

export default function GistEdit({gist}) {
    const [token, setToken] = useState('')
    const [newGist, setNewGist] = useState({filename: '', content: '', descritpion: '', public: false})

    const filenameRef = useRef(null)

    useEffect(() => {
        getToken(setToken)
    }, [])

    const updateGist = () => {
        let wrapper = new GistApiWrapper(token)
        setNewGist({ ...newGist, filename: filenameRef})
    }



    return (
        <div>
            <form >
                <label>Filename</label>
                <select ref={filenameRef}>
                    {gist ? Object.keys(gist.files).map((e, i) => (<option value={e} key={i}>{e}</option>)) : ''}
                </select>
                
            </form>
        </div>
    )
}