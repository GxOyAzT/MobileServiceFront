import { getSavedToken } from './auth'
import { GetApi } from './apiDomain'

export async function updateFlashcardProgress(){
  var authToken = await getSavedToken()
  
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/statistics/getuserweekstats`, options)

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

export async function getUserDailyRaport(){
  var authToken = await getSavedToken()
  
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/statistics/getuserdailystats`, options)

  if (response.status === 200){
    return {
      statusCode: response.status,
      content: await response.json()
    } 
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else if (response.status === 404){
    return {
      statusCode: response.status,
      content: 'Cannot connect to the server. Check your Internet connection.'
    }
  }
  else{
    return null
  }
}

export async function getUserNextWeekExpired(){
  var authToken = await getSavedToken()
  
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/statistics/getusernextweekexpiresstats`, options)

  if (response.status === 200){
    return {
      statusCode: response.status,
      content: await response.json()
    } 
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else if (response.status === 404){
    return {
      statusCode: response.status,
      content: 'Cannot connect to the server. Check your Internet connection and reload view.'
    }
  }
  else{
    return {
      statusCode: response.status,
      content: response.text()
    }
  }
}

export async function getUserAllFlashcardProgress(){
  var authToken = await getSavedToken()
  
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  }

  var response = await fetch(`${GetApi()}/api/statistics/getuserprogress`, options)

  if (response.status === 200){
    return {
      statusCode: response.status,
      content: await response.json()
    } 
  }
  else if (response.status === 401){
    console.log('AUTH PROBLEM')
    return null
  }
  else if (response.status === 404){
    return {
      statusCode: response.status,
      content: 'Cannot connect to the server. Check your Internet connection and reload view.'
    }
  }
  else{
    return {
      statusCode: response.status,
      content: response.text()
    }
  }
}