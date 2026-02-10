import type { LoaderFunction } from 'react-router'

export const loader: LoaderFunction = async () => {
  throw new Response('404 Not Found', { status: 404 })
}

export default function fourOhFour() {
  return null
}
