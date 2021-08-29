import axios from './index'

export default {
    createQu(data) {
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/questionnaire/create',
            data: data
        })
    },
    getlist(data) {
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/questionnaire/find/me/all',
            data: data
        })
    },
    deleteQu(data) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'DELETE',
            url: '/api/v1/questionnaire/' + data,
            timeout: 5000
        })
    },
    getwaste(data) {
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/questionnaire/find/me/old',
            data: data
        })
    },
    recovery(data){
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'PUT',
            url: '/api/v1/questionnaire/restore/'+data,
        })
    },
    deleteDeath(data){
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'DELETE',
            url: '/api/v1/questionnaire/death/'+data,
            timeout: 5000
        })
    },
    copy(data) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'GET',
            url: '/api/v1/questionnaire/copy/' + data,
            timeout: 10000
        })
    },
    openQu(data) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'GET',
            url: '/api/v1/questionnaire/open/' + data,
            timeout: 10000
        })
    },
    closeQu(data) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'GET',
            url: '/api/v1/questionnaire/close/' + data,
            timeout: 10000
        })
    },
    getStatistics(data) {
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/statics/get'+"?questionnaireId="+data,
            questionnaireId: data
        })
    },
    getStatisticsWhole(data) {
        return axios({
            headers: {
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/statics/answer/number'+"?questionnaireId="+"data",
            questionnaireId: data
        })
    },
    getStatisticsDetail(data1,data2){
        return axios({
            method: 'POST',
            url: '/api/v1/statics/answer/detail'+"?questionnaireId="+data1+"&recordId="+data2,
            data:data1
        })
    },
    getStatisticsDetail(data1,data2){
        return axios({
            method: 'POST',
            url: '/api/v1/statics/answer/detail'+"?questionnaireId="+data1+"&recordId="+data2,
            data:data1
        })
    },
    getQuID(data) {
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'GET',
            url: '/api/v1/apply/questionnaire/detail/' + data,
            timeout: 10000
        })
    },
    getcross(data1,data2,data3,data4,data5){
        return axios({
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                "token": JSON.parse(localStorage.getItem('userInfo')).token
            },
            method: 'POST',
            url: '/api/v1/statics/cross/analysis'+"?questionnaireId="+data1+"&type1="+data2+"&question1Id="+data3+"&type2="+data4+"&question2Id="+data5,
            timeout: 10000
        })
    }
}
