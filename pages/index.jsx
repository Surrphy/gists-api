import GistListing from "../components/GistListing"
import GistAdd from "../components/GistAdd"
import AddToken from "../components/AddToken"

export default function Home() {
  return (
    <div>
      <GistListing />
      <GistAdd />
      <AddToken />
    </div>
  )
}
