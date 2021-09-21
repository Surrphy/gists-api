import Link from 'next/link'

import GistDel from "./GistDel"

export default function Gist({ gist, getAllGists }) {
    return (
        <div>
            <Link href={`/gist/${gist.id}`}>{gist.description || Object.keys(gist.files)[0]}</Link>
            <GistDel id={gist.id} getAllGists={getAllGists} />
        </div>
    )
}