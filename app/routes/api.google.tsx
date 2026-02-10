import type { ActionFunctionArgs } from 'react-router'
import { redirect } from 'react-router'
import { authenticator } from '~/models/auth/auth.server'

export let loader = () => {
  return redirect('/')
}

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('google', request)
}
