import { Group, Text, Title } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PlayListItemCard from '~/components/atoms/PlayListItemCard'
import Pagination from '~/components/molecules/pagination'
import Splash from '~/components/organisms/splash'
import { getAllVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'FE Engineer Youtube channel videos | FE-Engineer' },
    {
      name: 'description',
      content: `Youtube videos for FE-Engineer channel.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
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
  return { videosData, page }
}

const displayText = {
  title: `FE-Engineer Youtube Videos`,
}

export default function Playlist() {
  const { videosData, page }: any = useLoaderData()
  const paginationTotal = Math.floor(
    videosData?.pageInfo?.totalResults / videosData?.pageInfo?.resultsPerPage
  )
  const pagination = usePagination({ total: paginationTotal, initialPage: 1 })

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
      {videosData !== null && (
        <>
          <Pagination
            page={page}
            videosData={videosData}
            pagination={pagination}
            paginationTotal={paginationTotal}
          />
          {videosData?.items.length > 0 && (
            <Group justify="center" align="normal">
              {videosData?.items?.map((item: any, index: number) => {
                return <PlayListItemCard data={item} key={index} />
              })}
            </Group>
          )}
          <Pagination
            page={page}
            videoData={videosData}
            pagination={pagination}
            paginationTotal={paginationTotal}
          />
        </>
      )}
      {videosData === null && <Splash />}
    </>
  )
}
