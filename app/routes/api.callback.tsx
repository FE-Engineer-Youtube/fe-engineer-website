// app/routes/auth/google/callback.tsx
import type { LoaderFunctionArgs } from 'react-router'
import { authenticator } from '~/models/auth/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login-fail',
  })
}
