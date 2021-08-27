import axios from './index'

export default {
    getQuestionnare(id) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: '/api/v1/questionnaire/detail/' + id,
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
            method: "post",
            url: "/api/v1/topic/create/fill/blank",
            data: data
        })
    },
    createMark(data) {
        return axios({
            method: "post",
            url: "/api/v1/topic/create/mark",
            data: data
          })
    },
    createMulti(data) {
        return axios({
            method: "post",
            url: "/api/v1/topic/create/multi/choice",
            data: data
        })
    },
    createSingle(data) {
        return axios({
            method: "post",
            url: "/api/v1/topic/create/single/choice",
            data: data
        })
    },
    createQuestionnare(data) {
        return axios({
            method: 'POST',
            url: '/api/v1/questionnaire/create',
            data: data
        })
    }
}