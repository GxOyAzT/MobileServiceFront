import { getSavedToken } from './auth'
import { GetApi } from './apiDomain'

export async function getRandomFlashcard(){
  var authToken = await getSavedToken()

  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/practice/getrandom`, options)

  console.log(response)

  if (response.status === 200){
    return {
      statusCode: 200,
      content: await response.json()
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
      statusCode: 404,
      content: null
    }
  }
  else{
    return {
      statusCode: response.status,
      content: await response.text()
    }
  }
}

export async function getRandomExpiredFlashcard(){
  var authToken = await getSavedToken()

  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/practice/getrandomexpired`, options)
  console.log(response.status)
  if (response.status === 200){
    return {
      statusCode: 200,
      content: await response.json()
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
      statusCode: 404,
      content: null
    }
  }
  else{
    return {
      statusCode: response.status,
      content: await response.text()
    }
  }
}

export async function updateFlashcardProgress(flashcardProgressId, flashcardProgress){
  var authToken = await getSavedToken()
  
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }
  
  var response = await fetch(`${GetApi()}/api/practice/updateflashcardprogress/${flashcardProgressId}/${flashcardProgress}`, options)
  
  if (response.status === 200){
    return 'OK';
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else{
    return null
  }
}

export async function getRandomExpiredFlashcardForChooseMode(){
  var authToken = await getSavedToken()

  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/practice/getrandomexpiredforchoose`, options)
  console.log(response.status)
  if (response.status === 200){
    return {
      statusCode: 200,
      content: await response.json()
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
      statusCode: 404,
      content: null
    }
  }
  else{
    return {
      statusCode: response.status,
      content: await response.text()
    }
  }
}