import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export let loader = () => {
  return redirect('/')
}

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('google', request)
}
