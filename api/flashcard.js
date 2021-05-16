import { getSavedToken } from './auth'
import { GetApi } from './apiDomain'

export async function getflashcardsListByCollectionId(collectionId){
  var authToken = await getSavedToken()

  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  }

  var response = await fetch(`${GetApi()}/api/flashcard/getlistbycollectionid/${collectionId}`, options)

  return {
    statusCode: response.status,
    content: await response.json()
  }

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

export async function insertFlashcard(flashcard){
  console.log(`insert model: ${flashcard}`)

  var authToken = await getSavedToken()

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(flashcard)
  }

  var response = await fetch(`${GetApi()}/api/flashcard/insert`, options)

  if (response.status === 200){
    return {
      statusCode: 200,
      content: 'Added successfully.'
    }
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else if (response.status === 404){
    return {
      statusCode: 404,
      content: 'Cannot connect to the server. Check your Internet connection.'
    }
  }
  else{
    return {
      statusCode: response.status,
      content: await response.text()
    }
  }
}

export async function deleteFlashcard(flashcardId){
  var authToken = await getSavedToken()

  var options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  }

  var response = await fetch(`${GetApi()}/api/flashcard/delete/${flashcardId}`, options)

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

export async function updateFlashcard(flashcard){
  console.log(`insert model: ${flashcard}`)

  var authToken = await getSavedToken()

  var options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(flashcard)
  }

  var response = await fetch(`${GetApi()}/api/flashcard/update`, options)

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