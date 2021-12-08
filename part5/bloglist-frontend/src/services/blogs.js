import axios from 'axios'
const baseUrl = '/api/blogs'

const headerRequest = () => {
  const userInfo = window.localStorage.getItem('userinfo')

  if (userInfo) {
    const token = JSON.parse(userInfo).token

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return {}
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, headerRequest())
  return response.data
}

const exportObject = { getAll, create }

export default exportObject
