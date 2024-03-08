// app/services/auth.server.ts
import dotenv from 'dotenv'
import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { sessionStorage } from '~/models/auth/session.server'

dotenv.config()

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export type user = {
  provider: string
  displayName: string
  id: string
  photos: [{ value: string }]
  emails: [{ value: string }]
  name: { familyName: string; givenName: string }
} | null

export let authenticator = new Authenticator<user>(sessionStorage, {
  sessionKey: 'access_token', // keep in sync
  sessionErrorKey: 'session_error', // keep in sync
})

let googleStrategy = new GoogleStrategy(
  {
    clientID:
      process.env.AUTH_CLIENTID || '',
    clientSecret: process.env.AUTH_SECRET || '',
    callbackURL: process.env.AUTH_CALLBACK || '',
    scope: '',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // console.log('accesstoken', accessToken)
    // console.log('refreshtoken', refreshToken)
    // console.log('profile', profile)
    // Get the user data from your DB or API using the tokens and profile
    return profile
  }
)

authenticator.use(googleStrategy)
