import axios from 'axios'
import axiosRetry from 'axios-retry'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosRetry(apiClient, {
  retries: 3, // Number of retries
  retryDelay: axiosRetry.exponentialDelay, // Exponential back-off strategy
  onRetry: (error, retryCount, requestConfig) => {
    console.log(
      `Retrying request ${requestConfig.url} for the ${retryCount}th time. Error: ${error.message}`
    )
  }
})

apiClient.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request)

    const token = localStorage.getItem('authToken')

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response)

    return response
  },
  (error) => {
    console.error('Response Error:', error)

    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
    }

    return Promise.reject(error)
  }
)

const apiCancelToken = axios.CancelToken.source()

apiClient.defaults.onDownloadProgress = (progressEvent) => {
  console.log(
    'Download progress: ',
    Math.round((progressEvent.loaded * 100) / progressEvent.total)
  )
}

apiClient.defaults.onUploadProgress = (progressEvent) => {
  console.log(
    'Upload progress: ',
    Math.round((progressEvent.loaded * 100) / progressEvent.total)
  )
}

export { apiClient, apiCancelToken }
