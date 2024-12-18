import axios from 'axios'

const apiDB = axios.create({
  baseURL: 'http://localhost:5014/api',
})

export default apiDB