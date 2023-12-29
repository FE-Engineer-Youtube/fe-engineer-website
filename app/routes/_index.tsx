import { Group } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import VideoPlayer from '~/components/atoms/VideoPlayer'
import Splash from '~/components/organisms/splash'
import { getRecentVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'FE-Engineer' },
    {
      name: 'description',
      content:
        'Welcome to the website for FE-Engineer on Youtube.  Learn to build software and hardware at home to use AI, automation, and web tools to improve your life!',
    },
  ]
}

// export const links: LinksFunction = () => [...linkStyles()]

export const loader: LoaderFunction = async () => {
  let YTVideoData

  if (cache.has('homepage-videos')) {
    YTVideoData = await cache.get('homepage-videos')
  } else {
    YTVideoData = await getRecentVideos(2)
    cache.set('homepage-videos', YTVideoData, 60 * 10)
  }

  // let data = { YTVideoData }
  return { YTVideoData }
}

export default function Index() {
  const { YTVideoData }: any = useLoaderData()
  return (
    <div className="index">
      <Splash />
      <Group align="center" justify="center">
        {YTVideoData !== undefined &&
          YTVideoData.items.map((video: any, index: any) => {
            return <VideoPlayer key={index} data={video} />
          })}
      </Group>
    </div>
  )
}
