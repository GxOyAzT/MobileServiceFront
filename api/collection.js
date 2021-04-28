import { getSavedToken } from './auth'
import { GetApi } from './apiDomain'

export async function getCollectionsAsync(){
  var authToken = await getSavedToken()

  console.log(`getCollectionsAsync() : ${authToken}`)

  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  }

  var response = await fetch(`${GetApi()}/api/collection/get`, options)

  console.log(response)

  if (response.status === 200){
    return await response.json();
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else{
    return null
  }
}