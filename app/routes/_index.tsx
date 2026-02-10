import { Divider, Group, Stack, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import type { LoaderFunction, MetaFunction } from 'react-router'
import { useLoaderData } from 'react-router'
import VideoPlayer from '~/components/atoms/VideoPlayer'
import Hpabout from '~/components/molecules/HpAbout'
import Splash from '~/components/organisms/splash'
import { getChannelDetails, getHPVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'
import { truncate } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'FE-Engineer Youtube' },
    {
      name: 'description',
      content: truncate(
        'Welcome to the website for FE-Engineer on Youtube.  Learn to build software and hardware at home to use AI, automation, and web tools for just about everything!',
        157
      ),
    },
    {
      name: 'keywords',
      content: `Homelab, Software Engineering, How-to, Networking, Proxies, AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, FE Engineer, FE-Engineer, FE Engineer Youtube, FE-Engineer Youtube, FE Engineer Channel Youtube, FE-Engineer Channel Youtube`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  let channelData, activitiesData

  if (cache.has('homepage-activities')) {
    activitiesData = await cache.get('homepage-activities')
  } else {
    activitiesData = await getHPVideos()
    cache.set('homepage-activities', activitiesData, 60 * 60)
  }
  if (cache.has('channel-content')) {
    channelData = await cache.get('channel-content')
  } else {
    channelData = await getChannelDetails()
    cache.set('channel-content', channelData, 60 * 5)
  }

  return {
    channelData,
    activitiesData,
  }
}

export default function Index() {
  const { channelData, activitiesData }: any = useLoaderData()
  const { ref, width } = useElementSize()

  return (
    <>
      {channelData && <Hpabout channelData={channelData} />}
      {activitiesData && (
        <>
          <Divider mt="md" ref={ref} />
          <Title order={2} ta="center" mb="lg" mt="xl">{`Recent Videos`}</Title>
          {width >= 640 && (
            <Group align="center" justify="center" grow wrap="wrap">
              {activitiesData?.map((video: any, index: number) => {
                return <VideoPlayer key={index} data={video} />
              })}
            </Group>
          )}
          {width < 640 && (
            <Stack>
              {activitiesData?.map((video: any, index: number) => {
                return <VideoPlayer key={index} data={video} />
              })}
            </Stack>
          )}
        </>
      )}
      {!channelData && !activitiesData && (
        <Splash message="Welcome Homelabbers and Engineers!" />
      )}
    </>
  )
}
