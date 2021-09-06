import { GistApiWrapper } from "../lib/lib";
import token from './token.private'

test('GistApiWrapper get request', async () => {
    let wrapper = new GistApiWrapper(token())
    let res = await wrapper.getAllGists()

    expect(res.status).toBe(true)
})