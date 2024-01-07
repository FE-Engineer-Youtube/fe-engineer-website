import { Group, Text, Title } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import PlayListCard from '~/components/atoms/PlayListCard'
import Splash from '~/components/organisms/splash'

export const meta: MetaFunction = (data: any) => {
  let keywords: string[] = []
  data?.matches[1]?.data?.playListData?.items.map((item: any) => {
    keywords.push(item?.snippet?.title || '')
  })
  return [
    { title: 'Youtube Video Playlists | FE-Engineer' },
    {
      name: 'description',
      content: `Playlists of videos for FE-Engineer channel on Youtube.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
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
  const [playListData, setPlayListData]: any = useState(null)
  const displayText = {
    title: '@FE-Engineer video playlists on Youtube',
  }

  useEffect(() => {
    setPlayListData(matches[1]?.data?.playListData)
  }, [matches[1]?.data?.playListData])

  return (
    <>
      <Title ta="center" order={1} pt={64} pb={48}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'ytRed', to: 'blue' }}
        >
          {displayText.title}
        </Text>
      </Title>
      {playListData !== null && (
        <Group justify="center" align="normal">
          {playListData.items?.map((item: any, index: number) => {
            return <PlayListCard data={item} key={index} />
          })}
        </Group>
      )}
      {playListData === null && <Splash />}
    </>
  )
}
