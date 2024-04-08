import axios from 'axios'

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/getAll`)
    return res.data
}