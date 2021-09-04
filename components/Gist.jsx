import GistDel from "./GistDel"

export default function Gist({url, description, id, getAllGists}) {
    return (
        <div>
            <a href={url}>{description}</a>
            <GistDel id={id} getAllGists={getAllGists} />
        </div>
    )
}