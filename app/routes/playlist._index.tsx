import { Group, Text, Title } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import PlayListCard from '~/components/atoms/PlayListCard'
import Splash from '~/components/organisms/splash'

export const meta: MetaFunction = (data: any) => {
  console.log(data.matches[1].data.playListData.items)
  let keywords: string[] = []
  data?.matches[1]?.data?.playListData?.items.map((item: any) => {
    keywords.push(item?.snippet?.title || '')
  })
  console.log(keywords)
  return [
    { title: 'Video Playlists | FE-Engineer' },
    {
      name: 'description',
      content: `Playlists of videos for FE-Engineer channel on Youtube.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
    },
    {
      name: 'keywords',
      content: `${
        keywords.length > 0
          ? keywords
          : "Youtube Videos, How-to, AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding"
      }`,
    },
  ]
}

export const handle = {
  breadcrumb: () => <Link to="/playlist">Playlists</Link>,
}

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Playlist() {
  const matches: any = useMatches()
  const [playListData, setPlayListData]: any = useState(null)
  const displayText = {
    title: 'Video Playlists',
  }

  useEffect(() => {
    setPlayListData(matches[1]?.data?.playListData)
  }, [matches[1]?.data?.playListData])

  return (
    <>
      <Title ta="center" order={1} pt={128} pb={64}>
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
