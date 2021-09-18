import { useEffect, useRef, useState } from "react";
import { getToken, GistApiWrapper } from "../lib/lib";

export default function GistEdit({gist}) {
    const [token, setToken] = useState('')
    const [newFile, setNewFile] = useState(false)
    const [file, setFile] = useState('')
    const [newGist, setNewGist] = useState({content: '', description: ''})

    useEffect(() => {
        getToken(setToken)
        setFile(Object.keys(gist.files)[0])
    }, [])

    const updateGist = (e) => {
        e?.preventDefault()

        if (newFile && !newGist.content)
            alert("You need to add content for new files")
        else {
            let wrapper = new GistApiWrapper(token)

            let payload = {
                files: {
                    [file]: {
                        'content': newGist.content ? newGist.content : gist[file]?.content
                    }
                },
                'description': newGist.description ? newGist.description : gist.description,
            }

            wrapper.updateGist(gist.id, payload).catch((e) => console.log(e))

            setNewGist({content: '', description: ''})
        }
    }

    const deleteFile = () => {
        // setNewGist({...newGist, description: gist.description, content: gist.files[file].content})
        updateGist()
    }

    return (
        <div>
            <form onSubmit={(e) => updateGist(e)}>
                <label>New File?</label>
                <input type="checkbox" checked={newFile} onChange={(e) => setNewFile(e.target.checked)} />
                    {newFile ? <input type="text" value={file} onChange={(e) => setFile(e.target.value)} />
                    :
                    <select value={file} onChange={(e) => setFile(e.target.value)}>
                        {gist ? Object.keys(gist.files).map((e, i) => (<option value={e} key={i}>{e}</option>)) : ''}
                    </select> }
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