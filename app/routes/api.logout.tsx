import {
  redirect,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunction,
} from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export const loader: LoaderFunction = () => {
  return redirect('/')
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: '/' })
}
