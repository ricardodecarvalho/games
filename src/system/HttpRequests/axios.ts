import axios from 'axios'

const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER

class Axios {
  request(params: any) {
    const headers = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    const instance = axios.create({
      baseURL: BASE_URL_SERVER,
      timeout: 5000,
      headers: headers,
    })

    return instance({
      method: params.method || 'get',
      url: params.endpoint,
      headers: headers,
      data: JSON.stringify(params.data),
    })
  }
}

export default new Axios()
