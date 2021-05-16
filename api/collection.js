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

  console.log(`getCollectionsAsync() status: ${response.status}`)

  return {
    statusCode: response.status,
    content: await response.json()
  }
}

export async function createCollectionsAsync(name){
  var authToken = await getSavedToken()

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name: name
    })
  }

  var response = await fetch(`${GetApi()}/api/collection/insert`, options)

  if (response.status === 200){
    return {
      statusCode: 200,
      content: response.json()
    }
  }
  else if (response.status === 401){
    return {
      statusCode: 401,
      content: 'There is a problem with authentication. Please log out and log in.'
    }
  }
  else if (response.status === 404){
    return {
      statusCode: response.status,
      content: 'Cannot connect to the server. Check your Internet connection and try again.'
    }
  }
  else{
    return {
      statusCode: response.status,
      content: await response.text()
    }
  }
}

export async function getCollectionAsync(collectionId){
  var authToken = await getSavedToken()

  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  }

  var response = await fetch(`${GetApi()}/api/collection/get/${collectionId}`, options)

  console.log(`getCollectionAsync() status: ${response.status}`)

  return {
    statusCode: response.status,
    content: await response.json()
  }
}

export async function deleteCollectionAsync(collectionId){
  var authToken = await getSavedToken()

  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  }
  console.log(`COLLECTION ID ${collectionId}`)
  var response = await fetch(`${GetApi()}/api/collection/delete/${collectionId}`, options)

  if (response.status === 200){
    return 'OK'
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else{
    console.log(`RESPONSE STATUS CODE: ${response.status}`)
    return null
  }
}

export async function updateCollectionsAsync(collectionModel){
  var authToken = await getSavedToken()

  console.log(`getCollectionsAsync() : ${authToken}`)

  var options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      id: collectionModel.id,
      name: collectionModel.name
    })
  }

  var response = await fetch(`${GetApi()}/api/collection/update`, options)

  console.log(response)

  if (response.status === 200){
    return 'OK';
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else{
    return 'ERROR'
  }
}