import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Splash from '~/components/organisms/splash'

export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: '404 uh oh | FE-Engineer' },
    {
      name: 'description',
      content: `${data.displayText.message}`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  const displayText = {
    message:
      'Sad day, it looks like the page you are looking for does not exist.  Maybe if you go back and try again it will be different the next time...',
  }
  return { displayText }
}

export default function fourOhFour() {
  const { displayText }: any = useLoaderData()
  return (
    <>
      <Splash message={displayText.message} />
    </>
  )
}
