'use strict';
const key_token = 'userToken'

const readToken = function (){
    return window.localStorage.getItem(key_token)
}

const setToken = function (token){
    window.localStorage.setItem(key_token,token)
}

export default{
    readToken: readToken,
    setToken: setToken
}