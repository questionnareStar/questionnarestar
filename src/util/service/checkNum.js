import axios from './index'

export default{
  getAnswerNum(id){
    console.log(id)
    return axios({
      headers:{
        contentType: 'application/x-www-form-urlencoded'
      },
      method:'GET',
      url:'/api/v1/questionnaire/find/answer/'+id,
      data:id
    })
  }
}
