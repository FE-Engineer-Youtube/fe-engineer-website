import { Divider, Group, Stack, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import VideoPlayer from '~/components/atoms/VideoPlayer'
import Hpabout from '~/components/molecules/HpAbout'
import Splash from '~/components/organisms/splash'
import { getChannelDetails, getRecentVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'FE-Engineer' },
    {
      name: 'description',
      content:
        'Welcome to the website for FE-Engineer on Youtube.  Learn to build software and hardware at home to use AI, automation, and web tools for just about everything!',
    },
    {
      name: 'keywords',
      content: `Homelab, Software Engineering, How-to, Networking, Proxies, AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding`,
    },
  ]
}

export const handle = {
  breadcrumb: () => <Link to="/">Home</Link>,
}

export const loader: LoaderFunction = async () => {
  let YTVideoData, channelData

  if (cache.has('homepage-videos')) {
    YTVideoData = await cache.get('homepage-videos')
  } else {
    YTVideoData = await getRecentVideos(2)
    cache.set('homepage-videos', YTVideoData, 60 * 60 * 8)
  }
  if (cache.has('channel-content')) {
    channelData = await cache.get('channel-content')
  } else {
    channelData = await getChannelDetails()
    cache.set('channel-content', channelData, 60 * 5)
  }

  return { YTVideoData: YTVideoData, channelData: channelData }
}

export default function Index() {
  const { YTVideoData, channelData }: any = useLoaderData()
  const { ref, width, height } = useElementSize()
  return (
    <>
      {channelData && <Hpabout channelData={channelData} />}
      {YTVideoData !== null && (
        <>
          <Divider mt="md" ref={ref} />
          <Title order={2} ta="center" mb="lg" mt="xl">{`Recent Videos`}</Title>
          {width >= 640 && (
            <Group align="center" justify="center" grow wrap="wrap">
              {YTVideoData?.items?.map((video: any, index: number) => {
                return <VideoPlayer key={index} data={video} />
              })}
            </Group>
          )}
          {width < 640 && (
            <Stack>
              {YTVideoData?.items?.map((video: any, index: number) => {
                return <VideoPlayer key={index} data={video} />
              })}
            </Stack>
          )}
        </>
      )}
      {channelData === null && YTVideoData === null && (
        <Splash message="Welcome Homelabbers and Engineers!" />
      )}
    </>
  )
}
