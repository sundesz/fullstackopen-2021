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

const createComment = async (id, newObject) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    newObject,
    headerRequest()
  )
  return response.data
}

const update = async (id, object) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
  } catch (err) {
    return err.response.data
  }
}

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, headerRequest())
    return response.data
  } catch (err) {
    return err.response.data
  }
}

const exportObject = { getAll, create, update, remove, createComment }

export default exportObject
