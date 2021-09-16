import { useEffect, useRef, useState } from "react";
import { getToken, GistApiWrapper } from "../lib/lib";

export default function GistEdit({gist}) {
    const [token, setToken] = useState('')
    const [file, setFile] = useState('')
    const [newGist, setNewGist] = useState({filename: '', content: '', description: ''})

    useEffect(() => {
        getToken(setToken)
    }, [])

    const updateGist = (e) => {
        e?.preventDefault()

        let wrapper = new GistApiWrapper(token)

        let payload = {
            files: {
                [file]: {
                    'content': newGist.content
                }
            },
            'description': newGist.description,
        }

        wrapper.updateGist(gist.id, payload).catch((e) => console.log(e))

        setNewGist({filename: '', content: '', description: ''})
    }

    const deleteFile = () => {
        setNewGist({...newGist, description: gist.description})
        updateGist()
    }

    return (
        <div>
            <form onSubmit={(e) => updateGist(e)}>
                <label>Filename</label>
                <select value={file} onChange={(e) => setFile(e.target.value)}>
                    {gist ? Object.keys(gist.files).map((e, i) => (<option value={e} key={i}>{e}</option>)) : ''}
                </select>
                <label>Content</label>
                <input type="text" value={newGist.content} onChange={(e) => setNewGist({...newGist, content: e.target.value})}/>
                <label>Description</label>
                <input type="text" value={newGist.description} onChange={(e) => setNewGist({...newGist, description: e.target.value})}/>
                <input type="submit" />
                <button onClick={deleteFile}>Delete File</button>
            </form>
        </div>
    )
}