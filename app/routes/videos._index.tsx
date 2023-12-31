import { Button, Group, Text } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import PlayListItemCard from '~/components/atoms/PlayListItemCard'
import Splash from '~/components/organisms/splash'
import { getAllVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'Videos | FE-Engineer' },
    {
      name: 'description',
      content: `Youtube videos for FE-Engineer channel.  Videos cover a wide variety of topics including: AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding, and more!`,
    },
    {
      name: 'keywords',
      content: `AI, AMD GPU's, Ubuntu, Linux, Windows, Servers, Proxmox, Apache, Nextcloud, React Coding`,
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
    cache.set(`videos-${results}-${page}`, videosData, 60 * 60 * 60)
  }
  return { videosData, page }
}

export const handle = {
  breadcrumb: () => <Link to="/videos">Videos</Link>,
}

export default function Playlist() {
  const { videosData, page }: any = useLoaderData()
  const paginationTotal = Math.floor(
    videosData?.pageInfo?.totalResults / videosData?.pageInfo?.resultsPerPage
  )
  const pagination = usePagination({ total: paginationTotal, initialPage: 1 })

  return (
    <>
      {videosData !== null && (
        <>
          <Group w="100%" justify="center" mb="md">
            <Button
              disabled={page === 1}
              color="ytRed"
              size="xs"
              component={Link}
              to={`/videos?page=${page - 1}&pageToken=${
                videosData?.prevPageToken
              }`}
            >
              <IconArrowLeft />
            </Button>
            {pagination.range.length > 0 &&
              pagination.range.map((item, index) => {
                if (typeof item === 'number') {
                  return (
                    <Button
                      key={`${item}-${index}`}
                      size={page === item ? 'sm' : 'xs'}
                      disabled
                      style={{
                        color:
                          page === item
                            ? 'var(--mantine-color-ytRed-text)'
                            : '',
                      }}
                    >
                      {item}
                    </Button>
                  )
                }
                if (typeof item === 'string') {
                  return <Text>{'. . .'}</Text>
                }
              })}
            <Button
              disabled={page === paginationTotal}
              color="ytRed"
              size="xs"
              component={Link}
              to={`/videos?page=${page + 1}&pageToken=${
                videosData?.nextPageToken
              }`}
            >
              <IconArrowRight />
            </Button>
          </Group>
          {videosData?.items.length > 0 && (
            <Group justify="center" align="normal">
              {videosData?.items?.map((item: any, index: number) => {
                return <PlayListItemCard data={item} key={index} />
              })}
            </Group>
          )}
        </>
      )}
      {videosData === null && <Splash />}
    </>
  )
}
