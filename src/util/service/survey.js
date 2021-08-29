import axios from './index'

export default {
    getQuestionnare(code) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: '/api/v1/questionnaire/detail/' + code,
            timeout: 2000
        })
    },
    submitSurvey(id, data) {
        return axios({
            method: 'POST',
            url: '/api/v1/questionnaire/fillIn/' + id,
            data: data
        })
    },
    validateAuthority(id, code) {
        return axios({
            method: 'POST',
            url: '/api/v1/questionnaire/fillIn/flag/' + id + '?code=' + code
        })
    },
    createBlank(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "post",
            url: "/api/v1/topic/create/fill/blank",
            data: data
        })
    },
    updateBlank(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'PUT',
            url: '/api/v1/topic/update/fill/blank',
            data: data
        })
    },
    createMark(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "post",
            url: "/api/v1/topic/create/mark",
            data: data
          })
    },
    updateMark(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "PUT",
            url: "/api/v1/topic/update/mark",
            data: data
          })
    },
    createMulti(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "post",
            url: "/api/v1/topic/create/multi/choice",
            data: data
        })
    },
    updateMulti(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "PUT",
            url: "/api/v1/topic/update/multi/choice",
            data: data
        })
    },
    createSingle(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "post",
            url: "/api/v1/topic/create/single/choice",
            data: data
        })
    },
    updateSingle(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: "PUT",
            url: "/api/v1/topic/update/single/choice",
            data: data
        })
    },
    createQuestionnare(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/questionnaire/create',
            data: data
        })
    },
   createQuestionnareLogin(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/questionnaire/create/login',
            data: data
        })
    },
    updateQuestionnare(data) {
        return axios({
            headers: {
                token: JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'PUT',
            url: '/api/v1/questionnaire/update',
            data: data
        })
    }
}
