import type { LoaderFunction, MetaFunction } from 'react-router'
import { redirect } from 'react-router'
import { Link, useLoaderData } from 'react-router'
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
        '@context': 'https://schema.org',
        '@type': ['VideoObject', 'LearningResource'],
        '@id': `https://fe-engineer.com/videos/${data?.videoData?.items?.[0]?.id}#video`,
        name: title,
        creator: { '@id': 'https://fe-engineer.com/#person' },

        // Strongly recommended: page URL where the video is described
        url: `https://fe-engineer.com/videos/${data?.videoData?.items?.[0]?.id}`,

        thumbnailUrl: thumbnails,

        uploadDate: snippet?.publishedAt,

        // Correct semantics
        embedUrl: `https://www.youtube.com/embed/${data?.videoData?.items?.[0]?.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${data?.videoData?.items?.[0]?.id}`,

        description: (
          snippet?.localized?.description ??
          snippet?.description ??
          ''
        )
          .replace(/(\r\n|\n|\r|)\s+/gm, ' ')
          .trim(),

        duration: contentDetails?.duration,
        learningResourceType: 'Problem walkthrough',
        isPartOf: { '@id': 'https://fe-engineer.com/#website' },
        mainEntityOfPage: {
          '@id': `https://fe-engineer.com/videos/${data?.videoData?.items?.[0]?.id}#webpage`,
        },

        potentialAction: {
          '@type': 'WatchAction',
          target: `https://www.youtube.com/watch?v=${data?.videoData?.items?.[0]?.id}`,
        },

        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'CommentAction' },
            userInteractionCount: Number(statistics?.commentCount ?? 0),
          },
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'WatchAction' },
            userInteractionCount: Number(statistics?.viewCount ?? 0),
          },
          {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'LikeAction' },
            userInteractionCount: Number(statistics?.likeCount ?? 0),
          },
        ],

        videoQuality: contentDetails?.definition,
      },
    },
  ]
}

export const handle = {
  breadcrumb: ({ data, params }: any) => {
    const id = params?.video
    const snippet = data?.videoData?.items?.[0]?.snippet

    const title = snippet?.localized?.title ?? snippet?.title ?? 'Video'

    return (
      <Link
        className={classes.breadcrumbLink}
        to={id ? `/videos/${id}` : '/videos'}
      >
        {title}
      </Link>
    )
  },

  schema: ({ data, params }: any) => {
    const id = params?.video
    const snippet = data?.videoData?.items?.[0]?.snippet

    const title = snippet?.localized?.title ?? snippet?.title ?? 'Video'

    const rawDesc =
      snippet?.localized?.description ?? snippet?.description ?? ''

    const description = truncate(
      rawDesc.replace(/(\r\n|\n|\r|)\s+/gm, ' ').trim(),
      157
    )

    const keywords = snippet?.tags?.join(', ') ?? ''

    return {
      name: `${title} | Video | FE-Engineer`,
      description,
      keywords,

      // Signal to root: this WebPage's main entity is the page-local VideoObject
      // Root should translate this into: { "@id": `${canonicalUrl}#video` }
      mainEntity: 'video',
    }
  },
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

  return Response.json(
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
