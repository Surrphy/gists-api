import { useState, useEffect } from "react";

import { getToken, GistApiWrapper } from "../lib/lib";
import Gist from "./Gist";

export default function GistAdd() {
    const [token, setToken] = useState('')
    const [newGist, setNewGist] = useState({filename: '', content: '', descritpion: '', public: false})

    const addNewGist = (e) => {
        e.preventDefault()
        let wrapper = new GistApiWrapper(token)

        let payload = {
            'files': {
                [newGist.filename]: {
                    'content': newGist.content
                }
            },
            'description': newGist.descritpion,
            public: newGist.public
        }

        wrapper.createGist(payload).catch((e) => console.log(e))
        setNewGist({filename: '', content: '', descritpion: '', public: false})
    }

    useEffect (() => {
        getToken(setToken)
    }, [])

    return (
        <div>
            <form onSubmit={(e) => addNewGist(e)}>
                <label>Filename</label>
                <input type="text" value={newGist.filename} onChange={(e) => setNewGist({...newGist, filename: e.target.value})} />
                <label>Content</label>
                <input type="text" value={newGist.content} onChange={(e) => setNewGist({...newGist, content: e.target.value})} />
                <label>Description</label>
                <input type="text" value={newGist.descritpion} onChange={(e) => setNewGist({...newGist, descritpion: e.target.value})} />
                <label>Set as public?</label>
                <input type="checkbox" checked={newGist.public} onChange={(e) => setNewGist({...newGist, public: e.target.checked})} />
                <input type="submit" value="Add new gist" />
            </form>
        </div>
    )
}