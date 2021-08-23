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
    }
}