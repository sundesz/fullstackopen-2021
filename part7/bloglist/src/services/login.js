import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (err) {
    return err.response.data
  }
}

const exportObject = { login }

export default exportObject
