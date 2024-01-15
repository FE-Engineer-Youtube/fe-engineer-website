import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import LargeVideoPlayer from '~/components/atoms/LargeVideoPlayer'
import Splash from '~/components/organisms/splash'
import { getVideo } from '~/models/fetchYT.server'
import classes from '~/styles/root.styles.module.css'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = ({ data }: any) => {
  const title = `${
    data?.videoData?.items[0]?.snippet?.title || 'Video Title'
  }`
  const description =
    data?.videoData?.items[0]?.snippet?.description
      .replace(/(\r\n|\n|\r|)\s+/gm, ' ')
      .slice(0, 200) + '. . .' || 'Video Description'
  const keywords =
    data?.videoData?.items[0]?.snippet?.tags.join(', ') || 'Video keywords'
  return [
    { title: `${title} | Youtube Video | FE-Engineer` },
    {
      name: 'description',
      content: `${description}`,
    },
    {
      name: 'keywords',
      content: `${keywords}`,
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

  return { videoData }
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
