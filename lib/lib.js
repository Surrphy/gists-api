import axios from "axios"

class GistApiWrapper {
  constructor(token) {
    this.token = token
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
        // 'X-Custom-Header': this.token,
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + this.token
      }
    })
  }

  getRequest(path) {
    return this.client.get(path)
  }

  postRequest(path, payload) {
    return this.client.post(path, payload)
  }

  deleteRequest(path) {
    return this.client.delete(path)
  }

  patchRequest(path, payload) {
    return this.client.patch(path, payload)
  }

  root() {
    return this.getRequest('/')
  }

  createGist(payload) {
    return this.postRequest('/gists', payload)
  }

  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`)
  }

  getAllGists() {
    return this.getRequest('/gists')
  }

  deleteGist(gistId) {
    return this.deleteRequest(`/gists/${gistId}`)
  } 

  updateGist(gistId, payload) {
    return this.patchRequest(`/gists/${gistId}`, payload)
  }
}

function getToken(setToken) {
  const token = localStorage.getItem('token')

  if (!token) {
    console.error('You need to manually add token to local storage.')
  } else {
    setToken(token)
  }
}

export { getToken, GistApiWrapper}