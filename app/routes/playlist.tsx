import { Group, Title } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PlayListCard from '~/components/atoms/PlayListCard'
import { getPlayLists } from '~/models/fetchYT.server'
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
  let PlayListData

  if (cache.has('playlists')) {
    PlayListData = await cache.get('playlists')
  } else {
    PlayListData = await getPlayLists()
    cache.set('playlists', PlayListData, 60 * 10)
  }

  // let data = { YTVideoData }
  return { PlayListData }
}

export default function Index() {
  const { PlayListData }: any = useLoaderData()
  // console.log(PlayListData)
  return (
    <>
      <Title ta="center" order={1} pt={128} pb={64}>
        Content Playlists
      </Title>
      {PlayListData !== undefined && (
        <Group justify="center">
          {PlayListData.items.map((item: any, index: number) => {
            return <PlayListCard data={item} key={index} />
          })}
        </Group>
      )}
    </>
  )
}
