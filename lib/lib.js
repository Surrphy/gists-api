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
}

function getToken(setToken) {
  const token = localStorage.getItem('token')

  if (!token) {
    console.log('You need to manually add token to local storage.')
  } else {
    setToken(token)
  }
}

// function getWrapper(token) {
//   if (!token) {
//     console.log('You need to manually add token to local storage.')
//   } else {
//     return new GistApiWrapper(token)
//   }
// }

export { getToken, GistApiWrapper}