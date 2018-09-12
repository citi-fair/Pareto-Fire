import qs from 'querystring'
import fetch from 'node-fetch'
import { CitiClientId, CitiClientRedirect, CitiClientSecret } from '../src/common/constants'

const API_ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/us/gcb'

exports.handler = async (event, context, callback) => {
  let headers = {
    accept: 'application/json',
    authorization: Buffer.from(`Basic ${CitiClientId}:${CitiClientSecret}`).toString('base64'),
    contentType: 'application/x-www-form-urlencoded',
  }
  let body = {
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    redirect_uri: encodeURIComponent(CitiClientRedirect),
  }
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: headers,
    body: qs.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        }
      } else {
        return {
          statusCode: 423,
          body: {
            params: JSON.stringify({ headers, body }),
            upstream: JSON.stringify(data),
          },
        }
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}