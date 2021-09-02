export default function Gist({url, description}) {
    return (
        <div>
            <a href={url}>{description}</a>
        </div>
    )
}