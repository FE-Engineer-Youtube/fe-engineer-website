import { Group, Text, Title } from '@mantine/core'
import {
  redirect,
  type LoaderFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Link, useLoaderData, useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import PlayListItemCard from '~/components/atoms/PlayListItemCard'
import Splash from '~/components/organisms/splash'
import { getPlayListItems } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'
import { findIndex } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  const title = `${
    data?.matches[1]?.data?.playListData?.items[
      findIndex(
        data?.matches[1]?.data?.playListData?.items,
        data?.matches[2]?.params?.playlist
      )
    ]?.snippet?.title || 'Playlist Title'
  } | Youtube Playlist | FE-Engineer`

  const description =
    data?.matches[1]?.data?.playListData?.items[
      findIndex(
        data?.matches[1]?.data?.playListData?.items,
        data?.matches[2]?.params?.playlist
      )
    ]?.snippet?.description || 'Playlist Description'

  return [
    { title: `${title} | FE-Engineer` },
    {
      name: 'description',
      content: `${description}`,
    },
  ]
}

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const playListId = args.params.playlist
  let playListItemsData = null

  if (!playListId || playListId.length < 25) {
    return redirect('/playlist')
  }

  if (cache.has(`playlist-${playListId}`)) {
    playListItemsData = await cache.get(`playlist-${playListId}`)
  } else {
    playListItemsData = await getPlayListItems(playListId)
    cache.set(`playlist-${playListId}`, playListItemsData, 60 * 30)
  }

  return { playListItemsData }
}

export const handle = {
  breadcrumb: () => <Link to="/">Home</Link>,
}

export default function PlayListItemPage() {
  const matches: any = useMatches()
  const [matchesData, setMatches]: any = useState(null)
  const title =
    matchesData &&
    matchesData[1]?.data?.playListData?.items[
      findIndex(
        matchesData[1]?.data?.playListData?.items,
        matchesData[2]?.params?.playlist
      )
    ]?.snippet?.title
  const { playListItemsData }: any = useLoaderData()

  const displayText = {
    title: title || 'Playlist Title',
  }

  useEffect(() => {
    setMatches(matches)
  }, [matches])

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
      {playListItemsData !== undefined && (
        <Group justify="center" align="normal">
          {playListItemsData.items.map((item: any, index: number) => {
            return <PlayListItemCard data={item} key={index} />
          })}
        </Group>
      )}
      {playListItemsData === null && <Splash />}
    </>
  )
}
