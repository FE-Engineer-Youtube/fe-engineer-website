import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Splash from '~/components/organisms/splash'

export const meta: MetaFunction = (data: any) => {
  console.log(data)
  return [
    { title: '404 uh oh | FE-Engineer' },
    {
      name: 'description',
      content: `${data.message}`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  const message =
    'Sad day, it looks like the page you are looking for does not exist.  Maybe if you go back and try again it will be different the next time...'
  return { message }
}

export default function fourOhFour() {
  const { message }: any = useLoaderData()
  return (
    <>
      <Splash message={message} />
    </>
  )
}
