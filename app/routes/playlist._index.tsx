import { Group, Text, Title } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from 'react-router'
import { useMatches } from 'react-router'
import PlayListCard from '~/components/atoms/PlayListCard'
import Splash from '~/components/organisms/splash'
import { truncate } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  let keywords: string[] = []
  data?.matches[1]?.data?.playListData?.items.map((item: any) => {
    keywords.push(item?.snippet?.title || '')
  })
  return [
    { title: 'Youtube Video Playlists | FE-Engineer' },
    {
      name: 'description',
      content: truncate(
        `Playlists of videos for FE-Engineer channel on Youtube.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
        157
      ),
    },
    {
      name: 'keywords',
      content: `${
        keywords.length > 0
          ? keywords
          : "Youtube Videos, How-to, AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, FE Engineer, FE Engineer Playlists Youtube"
      }`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Playlist() {
  const matches: any = useMatches()
  const displayText = {
    title: '@FE-Engineer video playlists on Youtube',
  }

  return (
    <>
      <Title ta="center" order={1} mt={64} pb={48}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'ytRed', to: 'blue' }}
        >
          {displayText.title}
        </Text>
      </Title>
      {matches[1]?.data?.playListData && (
        <Group justify="center" align="normal">
          {matches[1]?.data?.playListData?.items?.map(
            (item: any, index: number) => {
              return <PlayListCard data={item} key={index} />
            }
          )}
        </Group>
      )}
      {!matches[1]?.data?.playListData && <Splash />}
    </>
  )
}
