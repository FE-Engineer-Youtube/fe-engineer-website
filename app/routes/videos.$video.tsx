import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import LargeVideoPlayer from '~/components/atoms/LargeVideoPlayer'
import Splash from '~/components/organisms/splash'
import { getVideo } from '~/models/fetchYT.server'
import classes from '~/styles/root.styles.module.css'
import { cache } from '~/utils/db.server'
import { truncate, truncateTitleLength } from '~/utils/utils'

export const meta: MetaFunction = ({ data }: any) => {
  const snippet = data?.videoData?.items[0]?.snippet
  const contentDetails = data?.videoData?.items[0]?.contentDetails
  const statistics = data?.videoData?.items[0]?.statistics

  const title = `${snippet?.localized?.title || 'Video Title'}`
  const description =
    snippet?.localized?.description.replace(/(\r\n|\n|\r|)\s+/gm, ' ') ||
    'Video Description'
  const keywords = snippet?.tags?.join(', ') || 'Video keywords'
  const thumbnails = [
    snippet?.thumbnails?.default?.url || '',
    snippet?.thumbnails?.high?.url || '',
    snippet?.thumbnails?.maxres?.url || '',
    snippet?.thumbnails?.medium?.url || '',
    snippet?.thumbnails?.standard?.url || '',
  ]
  const titleEnd = ' | Video | FE-Engineer'

  return [
    { title: `${truncate(title, truncateTitleLength(titleEnd))}${titleEnd}` },
    {
      name: 'description',
      content: truncate(`${description}`, 157),
    },
    {
      name: 'keywords',
      content: `video, ${keywords}`,
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org/',
        '@type': ['VideoObject', 'LearningResource'],
        name: title,
        thumbnailUrl: thumbnails,
        uploadDate: snippet?.publishedAt,
        contentUrl: `https://www.youtube.com/embed/${data?.videoData?.items[0]?.id}`,
        description: description,
        duration: contentDetails?.duration,
        learningResourceType: 'Problem walkthrough',
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'CommentAction' },
            userInteractionCount: +statistics?.commentCount,
          },
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'WatchAction' },
            userInteractionCount: +statistics?.viewCount,
          },
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'LikeAction' },
            userInteractionCount: +statistics?.likeCount,
          },
        ],
        videoQuality: contentDetails?.definition,
      },
    },
  ]
}

export const handle = {
  breadcrumb: ({ data }: any) => (
    <Link className={classes.breadcrumbLink} to={`/videos/${'videoid'}`}>
      {data?.videoData?.items[0]?.snippet?.title}
    </Link>
  ),
}

export const loader: LoaderFunction = async (args: any) => {
  let videoData

  if (
    !args?.params?.video ||
    args?.params?.video.length < 9 ||
    args?.params?.video.length > 13
  ) {
    return redirect('/videos')
  }

  if (cache.has(`video-${args?.params?.video}`)) {
    videoData = await cache.get(`video-${args?.params?.video}`)
  } else {
    videoData = await getVideo(args?.params?.video)
    cache.set(`video-${args?.params?.video}`, videoData, 60 * 60 * 8)
  }

  return json(
    { videoData },
    {
      headers: {
        'Cache-Control':
          'public, max-age=43200, s-maxage=43200, stale-while-revalidate=604800',
        'Cache-Tag': `video:id:${args?.params?.video}`,
      },
    }
  )
}

export default function Index() {
  const { videoData }: any = useLoaderData()
  return (
    <>
      {videoData !== null && <LargeVideoPlayer data={videoData} />}
      {videoData === null && <Splash />}
    </>
  )
}
