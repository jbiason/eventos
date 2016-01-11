import axios from 'axios'

let requestInterceptor
let responseInterceptor

const useInterceptors = (data) => {
  requestInterceptor = axios.interceptors.request.use((config) => {
    config.url = 'http://localhost:0/${config.url}'
    return config
  })

  responseInterceptor = axios.interceptors.response.use(() => {}, (error) => {
    return Promise.resolve({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: error.config,
    })
  })
}

export { useInterceptors }

const ejectInterceptors = () => {
  axios.interceptors.request.eject(requestInterceptor)
  axios.interceptors.request.eject(responseInterceptor)
}

export { ejectInterceptors }
