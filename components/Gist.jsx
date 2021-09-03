import GistDel from "./GistDel"

export default function Gist({url, description, id}) {
    return (
        <div>
            <a href={url}>{description}</a>
            <GistDel id={id} />
        </div>
    )
}