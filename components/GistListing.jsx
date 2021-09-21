import { useState, useEffect } from "react";

import { getToken, GistApiWrapper } from "../lib/lib";
import Gist from "./Gist";

const gistsPerPage = 2

export default function GistListing() {
    const [token, setToken] = useState('')
    const [gists, setGists] = useState([])
    const [filter, setFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        getToken((token) => {
            getAllGists(token)
            setToken(token)
        })
    }, [])

    useEffect(() => {
        setCurrentPage(0)
    }, [filter])

    const getAllGists = async (token) => {
        let wrapper = new GistApiWrapper(token)
        getToken(setToken)

        let response = await wrapper.getAllGists().then((res) => res.data).catch((e) => console.error(e))
        setGists(response)
    }

    const filteredGists = gists?.filter((gist) => {
        if (filter.length==0 || gist.description.toLowerCase().includes(filter.toLowerCase())) {
            return true
        }
        return Object.keys(gist.files).some((key) => {
            return gist.files[key].filename.toLowerCase().includes(filter.toLowerCase())
        })
    })

    return (
        <div>
            <label>Filter by description</label>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            {filteredGists?.slice(currentPage * gistsPerPage, currentPage * gistsPerPage + gistsPerPage).map((gist, i) => <Gist gist={gist} key={i} getAllGists={getAllGists} />)}
            {[...Array(Math.ceil((filteredGists?.length || 0) / gistsPerPage))].map((_, i) => (
                <button disabled={i==currentPage} onClick={() => setCurrentPage(i)}>{i+1}</button>
            ))}
            <button onClick={() => getAllGists(token)}>Reload</button>
        </div>
    )
}