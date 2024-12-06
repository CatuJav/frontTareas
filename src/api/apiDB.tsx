import axios from 'axios'

const apiDB = axios.create({
  baseURL: 'http://localhost:5173/',
})

export default apiDB