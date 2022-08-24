import axios from 'axios'
axios.defaults.baseURL = '/api';
export function getWXSignature(url) {
    return axios.get('/getSignature',
        {
            params:{
                'url':url
            }
        });
}

export function jinchuScan(params){
    return axios.post('/place/IsPlaceExist',params);
}

export function auth(code){
    return axios.get("/weixin/auth",{
        params:{
            'code':code
        }
    })
}

export function IsPhoneBound(openid){
    return axios.get("/user/isPhoneBound",{
        params:{
            'openid':openid
        }
    })
}

export function validPhone(params){
    return axios.post('/phone/receivePhone',params);
}

export function validToken(accesstoken,openid){
    return axios.get("/weixin/validToken",
        {
            params:{
                'access_token':accesstoken,
                'openid':openid
            }
        })
}
export  function getPhoneCode(phone){
    return axios.get("/phone/getPhoneCode",
        {
            params:{
                'phone':phone
            }
        })
}


export function validCode(phone,code){
    return axios.get("/phone/validCode",
        {
            params:{
                'phone':phone,
                'code':code
            }
        })
}

export function getTrueInfo(openid){
    return axios.get("/shu/getUserInfo",
        {
            params:{
               'openid':openid
            }
        })
}

export function getAccessRecord(curPage,pageSize,phone,address){
    return axios.get("/access/getAccessRecord",
        {
            params:{
                'curPage':curPage,
                'pageSize':pageSize,
                'phone':phone,
                'address':address
            }
        })

}

export  function  getPlaces(){
    return axios.get("/place/getPlaces")
}


export function addAccess(params){
    return axios.post('/access/addAccess',params);
}

export function deleteAccess(id){
    return axios.get("/access/deleteAccess",
        {
            params:{
                'id':id
            }
        })
}


export function editAccess(params){
    return axios.post('/access/editAccess',params);
}


export function getPass(params){
    return axios.post('/suishenban/IsPlaceExist',params);
}

export function getUserInfoByPhone(phone){
    return axios.get("/suishenban/getUserInfoByPhone",
        {
            params:{
                'Phone':phone
            }
        })

}

export function getUserInfoByToken(usertoken){
    return axios.get("/suishenban/getUserInfoByToken",{
        params:{
            'accesstoken':usertoken
        }
    })
}












