import { GistApiWrapper } from "../lib/lib";

describe("GistApiWrapper", () => {
    it("token should be accessible from outside of the class", () => {
        const token = "dzialajacy_token"
        const wrapper = new GistApiWrapper(token)

        return expect(wrapper.token).toEqual(token)
    })

    it("client should have token in headers", () => {
        const token = "dzialajacy_token"
        const wrapper = new GistApiWrapper(token)

        return expect(wrapper.client.defaults.headers.Authorization).toEqual(`token ${token}`)
    })
});
