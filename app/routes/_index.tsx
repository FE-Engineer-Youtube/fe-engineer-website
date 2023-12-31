import { Group } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import VideoPlayer from '~/components/atoms/VideoPlayer'
import Splash from '~/components/organisms/splash'
import { getRecentVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'FE-Engineer' },
    {
      name: 'description',
      content:
        'Welcome to the website for FE-Engineer on Youtube.  Learn to build software and hardware at home to use AI, automation, and web tools for just about everything!',
    },
  ]
}

export const handle = {
  breadcrumb: () => <Link to="/">Home</Link>,
}

export const loader: LoaderFunction = async () => {
  let YTVideoData

  if (cache.has('homepage-videos')) {
    YTVideoData = await cache.get('homepage-videos')
  } else {
    YTVideoData = await getRecentVideos(2)
    cache.set('homepage-videos', YTVideoData, 60 * 60 * 60)
  }

  // let data = { YTVideoData }
  return { YTVideoData }
}

export default function Index() {
  const { YTVideoData }: any = useLoaderData()
  return (
    <>
      <Splash message="Welcome Homelabbers and Engineers!" />
      {YTVideoData !== null && (
        <Group align="center" justify="center">
          {YTVideoData.items.map((video: any, index: number) => {
            return <VideoPlayer key={index} data={video} />
          })}
        </Group>
      )}
      {YTVideoData === null && <Splash />}
    </>
  )
}
