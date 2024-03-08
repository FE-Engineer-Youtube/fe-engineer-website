// app/routes/auth/google/callback.tsx
import type { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login-fail',
  })
}
