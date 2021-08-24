import axios from "axios"

export default axios.create({
    baseURL: 'http://47.93.216.213:3344',
    timeout: 1000
})
