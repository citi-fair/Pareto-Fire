import querystring from 'querystring'

exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { identity, user } = context.clientContext
    const { uri } = event.queryStringParameters
    const body = querystring.parse(event.body)

    return {
      statusCode: 200,
      uri: uri,
      user: user,
      identity: identity,
      body: body,
    }
  } catch (ex) {
    console.log('error:', ex)
    console.error(ex)

    return {
      statusCode: 422,
      body: ex,
    }
  }
}