import { useState, useEffect } from "react";

import { getToken, GistApiWrapper } from "../lib/lib";

export default function GistAdd() {
    const firstFile = { filename: '', content: '' }
    const [token, setToken] = useState('')
    const [files, setFiles] = useState([firstFile])
    const [gist, setGist] = useState({description: '', public: ''})

    const addGist = (e) => {
        e.preventDefault()

        getToken(setToken)
        let wrapper = new GistApiWrapper(token)
        let newFiles = {}

        files.forEach((file) => {
            newFiles[file.filename] = {content: file.content}
        })

        let payload = {
            'files': newFiles,
            'description': gist.descritpion,
            'public': gist.public
        }

        wrapper.createGist(payload).catch((e) => console.log(e))

        setFiles([firstFile])
        setGist({description: '', public: ''})
    }

    const filenameHandler = (value, i) => {
        setFiles((files) => 
            files.map((item, index) => 
                index === i ? { ...item, filename: value } : item
            )
        )
    }

    const contentHandler = (value, i) => {
        setFiles((files) => 
            files.map((item, index) => 
                index === i ? { ...item, content: value } : item
            )
        )
    }

    const addFile = () => {
        setFiles(files.concat(firstFile))
    }

    const removeFile = (i) => {
        setFiles(files.filter((value, index) => {
            if (index !== i) {
                return value
            }
        }))
    }

    useEffect (() => {
        getToken(setToken)
    }, [])

    return (
        <div>
            {files?.map((file, i) => {
                return (
                    <div key={i}>
                        <label>Filename</label>
                        <input type="text" value={file.filename} onChange={(event) => filenameHandler(event.target.value, i)} />
                        <label>Content</label>
                        <input type="text" value={file.content} onChange={(e) => contentHandler(e.target.value, i)} />
                        <button onClick={() => removeFile(i)}>X</button>
                    </div>
                )
            })}
            <label>Description</label>
            <input type="text" value={gist.descritpion} onChange={(e) => setGist({...gist, descritpion: e.target.value})} />
            <label>Set as public?</label>
            <input type="checkbox" checked={gist.public} onChange={(e) => setGist({...gist, public: e.target.checked})} />
            <button onClick={addGist}>Send Gist</button>
            <button onClick={addFile}>Add file</button>
        </div>
    )
}