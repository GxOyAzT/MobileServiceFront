import { GetApi } from './apiDomain'
import { AsyncStorage } from 'react-native'

export async function login(username, password){
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  }

  var response = await fetch(`${GetApi()}/api/user/login`, options)

  if (response.status === 200){
    console.log('ok')
    return {
      isSuccess: true,
      token: (await response.json()).token
    }
  }

  return {
    isSuccess: false
  }
}

export async function checkToken(token){
  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  var response = await fetch(`${GetApi()}/api/user/getuserid`, options)

  if (response.status === 200){
    console.log('ok')
    return {
      isSuccess: true
    }
  }

  return {
    isSuccess: false
  }
}

export async function getSavedToken(){
  try{
    const value = await AsyncStorage.getItem('login_token')
    console.log(`getSavedToken() : ${value}`)
    return value
  }
  catch (e){
    return ''
  }
}