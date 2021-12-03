import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then((response) => response.data)

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data)

const update = (id, object) =>
  axios.put(`${baseUrl}/${id}`, object).then((response) => response.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const exportObject = { getAll, create, update, remove }

export default exportObject
