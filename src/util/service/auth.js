import axios from './index'

export default {
    passwordLogin(formData) {
        return axios({
            method: 'POST',
            url: '/api/v1/user/login',
            data: formData
        })
    }
}