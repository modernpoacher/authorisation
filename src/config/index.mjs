import 'dotenv/config'
import nconf from 'nconf'

const CONFIG = nconf.argv().env().get()
const config = new Map(Object.entries(CONFIG))

if (!config.has('AUTHORISATION_ENDPOINT')) throw new Error('Parameter `AUTHORISATION_ENDPOINT` is required')
const AUTHORISATION_ENDPOINT = config.get('AUTHORISATION_ENDPOINT')

if (!config.has('CLIENT_ID')) throw new Error('Parameter `CLIENT_ID` is required')
const CLIENT_ID = config.get('CLIENT_ID')

if (!config.has('CLIENT_SECRET')) throw new Error('Parameter `CLIENT_SECRET` is required')
const CLIENT_SECRET = config.get('CLIENT_SECRET')

if (!config.has('AUDIENCE')) throw new Error('Parameter `AUDIENCE` is required')
const AUDIENCE = config.get('AUDIENCE')

if (!config.has('GRANT_TYPE')) throw new Error('Parameter `GRANT_TYPE` is required')
const GRANT_TYPE = config.get('GRANT_TYPE')

export {
  AUTHORISATION_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  AUDIENCE,
  GRANT_TYPE
}

export default config
