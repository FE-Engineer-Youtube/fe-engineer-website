import { Group, Text, Title } from '@mantine/core'
import {
  redirect,
  type LoaderFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Link, useLoaderData, useMatches } from '@remix-run/react'
import PlayListItemCard from '~/components/atoms/PlayListItemCard'
import Splash from '~/components/organisms/splash'
import { getPlayListItems } from '~/models/fetchYT.server'
import classes from '~/styles/root.styles.module.css'
import { cache } from '~/utils/db.server'
import { findIndex, truncate } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  const title = `${
    data?.matches[1]?.data?.playListData?.items[
      findIndex(
        data?.matches[1]?.data?.playListData?.items,
        data?.matches[2]?.params?.playlist
      )
    ]?.snippet?.title || 'Playlist Title'
  }`

  const description =
    data?.matches[1]?.data?.playListData?.items[
      findIndex(
        data?.matches[1]?.data?.playListData?.items,
        data?.matches[2]?.params?.playlist
      )
    ]?.snippet?.description || 'Playlist Description'

  return [
    { title: truncate(`${title} | Youtube Playlist | FE-Engineer`, 67) },
    {
      name: 'description',
      content: truncate(`${description}`, 157),
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
  breadcrumb: (data: any) => {
    return (
      <Link className={classes.breadcrumbLink} to="/">
        {`${
          data?.data?.playListItemsData?.items[
            findIndex(
              data?.data?.playListItemsData?.items,
              data?.params?.playlist,
              'playlistId',
              true
            )
          ]?.snippet?.title || 'Playlist Title'
        }`}
      </Link>
    )
  },
}

export default function PlayListItemPage() {
  const matches: any = useMatches()
  const title =
    matches[1]?.data?.playListData?.items[
      findIndex(
        matches[1]?.data?.playListData?.items,
        matches[2]?.params?.playlist
      )
    ]?.snippet?.title || 'Playlist Title'
  const { playListItemsData }: any = useLoaderData()

  const displayText = {
    title: title || 'Playlist Title',
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
