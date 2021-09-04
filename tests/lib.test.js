import { GistApiWrapper } from "../lib/lib";

test('GistApiWrapper request with wrong token', () => {
    let wrapper = new GistApiWrapper('test')

    expect(wrapper.getAllGists).toBe('401')
})