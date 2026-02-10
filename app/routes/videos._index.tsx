import { Group, Text, Title } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router'
import { useLoaderData, useMatches } from 'react-router'
import PlayListItemCard from '~/components/atoms/PlayListItemCard'
import Pagination from '~/components/molecules/pagination'
import Splash from '~/components/organisms/splash'
import { getAllVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'
import { truncate } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'FE Engineer Youtube channel videos | FE-Engineer' },
    {
      name: 'description',
      content: truncate(
        `Youtube videos for FE-Engineer channel.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
        157
      ),
    },
    {
      name: 'keywords',
      content: `AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, FE Engineer Youtube, FE Engineer Youtube Videos`,
    },
  ]
}

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const url = new URL(args.request.url)
  const pageNumber = url.searchParams.get('page') || '1'
  const pageToken = url.searchParams.get('pageToken') || ''
  const page = parseInt(pageNumber ?? '1')
  let videosData
  const results = 12

  if (cache.has(`videos-${results}-${page}`)) {
    videosData = await cache.get(`videos-${results}-${page}`)
  } else {
    videosData = await getAllVideos(results, pageToken)
    cache.set(`videos-${results}-${page}`, videosData, 60 * 60 * 8)
  }
  return Response.json(
    { videosData, page },
    {
      headers: {
        'Cache-Control':
          'public, max-age=3600, s-maxage=3600, stale-while-revalidate=43200',
      },
    }
  )
}

const displayText = {
  title: `FE-Engineer Youtube Videos`,
}

export default function Playlist() {
  const { videosData, page }: any = useLoaderData()
  const nextPageToken = videosData?.nextPageToken
  const prevPageToken = videosData?.prevPageToken
  const pagination = usePagination({ total: 1, initialPage: 1 })
  const matches = useMatches()

  return (
    <>
      {videosData !== null && (
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
          <Pagination
            page={page}
            pagination={pagination}
            next={nextPageToken}
            prev={prevPageToken}
          />
          {videosData?.items.length > 0 && (
            <Group justify="center" align="normal">
              {videosData?.items?.map((item: any, index: number) => {
                return <PlayListItemCard data={item} key={index} />
              })}
            </Group>
          )}
          {videosData?.items.length <= 0 && (
            <>
              <Text>{`Youtube API is not very good, there is no reasonable way to actually ensure that we do not get a page of search results with no items in it.`}</Text>
              <Text>{`:(`}</Text>
            </>
          )}
          <Pagination
            page={page}
            pagination={pagination}
            next={nextPageToken}
            prev={prevPageToken}
          />
        </>
      )}
      {videosData === null && <Splash />}
    </>
  )
}
