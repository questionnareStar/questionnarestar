import axios from './index'

export default {
    passwordLogin(data) {
        return axios({
            method: 'POST',
            url: '/api/v1/user/login',
            data: data
        })
    },
    codeLogin(data) {
        return axios({
            method: 'POST',
            url: '/api/v1/user/mail/login',
            data: data
        })
    },
    register(data) {
        return axios({
            method: 'POST',
            url: '/api/v1/user/mail/register',
            data: data
        })
    },
    fetchCodeForLogin(mail) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: '/api/v1/user/mail/send/code/login/' + mail,
            timeout: 10000
        })
    },
    fetchCodeForRegister(mail) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: '/api/v1/user/mail/send/code/register/' + mail,
            timeout: 5000
        })
    }
}