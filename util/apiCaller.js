import fetch from 'isomorphic-fetch';
import getConfig from 'next/config'
import { getCookie } from './cookies'

const { publicRuntimeConfig } = getConfig()
const API_URL = publicRuntimeConfig.API_URL

export function callApiRaw(endpoint, method = 'get', body) {
  let headers = {
    'content-type': 'application/json',
  };
  const token = getCookie('token');
  if (token && token != '' && endpoint != 'user/login' && endpoint != 'user/verify') {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
}

export function callApi(endpoint, method = 'get', body) {
  return callApiRaw(endpoint, method, body)
    .then(response => {
      return response.json().then(json => {
        return { json, response };
      });
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        let err = new Error();
        if (typeof json == 'string') {
          err.message = json;
        } else if (typeof json == 'object') {
          Object.assign(err, json, { status: response.status });
        } else {
          console.log('typeof json', typeof json);
        }
        return Promise.reject(err);
      }
      return json;
    });
  // .then(
  // response => response,
  // error => error
  // );
}

const TRIVIA_BASE_URL = `https://opentdb.com/api.php?`
export function callTrivia(amount = 1, category = null, difficulty = null, type = null) {
  const params = []
  if (amount) params.push(`amount=${amount}`)
  if (category) params.push(`category=${category}`)
  if (difficulty) params.push(`difficulty=${difficulty}`)
  if (type) params.push(`type=${type}`)

  return fetch(`${TRIVIA_BASE_URL}${params.join('&')}`)
    .then(res => res.json())

}
