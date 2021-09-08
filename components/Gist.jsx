import Link from 'next/link'

import GistDel from "./GistDel"

export default function Gist({ description, id, getAllGists }) {
    return (
        <div>
            <Link href={`/gist/${id}`}>{description}</Link>
            <GistDel id={id} getAllGists={getAllGists} />
        </div>
    )
}