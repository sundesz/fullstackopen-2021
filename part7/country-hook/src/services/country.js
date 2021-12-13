import axios from 'axios'

const baseUrl = 'https://restcountries.com/v2'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getByName = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

const exportConst = {
  getAll,
  getByName,
}

export default exportConst
