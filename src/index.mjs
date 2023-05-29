import {
  AUTHORISATION_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  AUDIENCE,
  GRANT_TYPE
} from './config/index.mjs'

let AUTHORISATION = {}
let AUTHORISED_AT = 0

function isExpired ({ expires_in: expiresIn = 0 } = {}) {
  /*
   *  `expiresIn` is a number of SECONDS
   *  `authorisedAt` is a number representing a date in MILLISECONDS
   */
  return (
    AUTHORISED_AT + (expiresIn * 1000)
  ) < Date.now()
}

function isAuthorised ({ access_token: accessToken } = {}) {
  /**
   *  `accessToken` is a required field in the authorisation response
   *  so its absence means we are not authorised and should halt
   */
  return (
    Boolean(accessToken)
  )
}

// https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production
async function getAuthorisationFromAuthorisationEndpoint () {
  const response = await fetch(AUTHORISATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: AUDIENCE,
      grant_type: GRANT_TYPE
    })
  })

  return await response.json()
}

async function getAuthorisation () {
  if (isExpired(AUTHORISATION)) {
    AUTHORISATION = await getAuthorisationFromAuthorisationEndpoint()
    if (!isAuthorised(AUTHORISATION)) throw new Error('NOT_AUTHORISED')
    AUTHORISED_AT = Date.now()
  }

  return AUTHORISATION
}

export async function getExpiresIn () {
  const {
    expires_in: expiresIn
  } = await getAuthorisation()

  return expiresIn
}

export async function getTokenType () {
  const {
    token_type: tokenType
  } = await getAuthorisation()

  return tokenType
}

export async function getScope () {
  const {
    scope
  } = await getAuthorisation()

  return scope
}

export async function getAccessToken () {
  const {
    access_token: accessToken
  } = await getAuthorisation()

  return accessToken
}
