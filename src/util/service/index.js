import axios from "axios"

export default axios.create({
    baseURL: 'https://question.xk857.club',
    timeout: 1000
})