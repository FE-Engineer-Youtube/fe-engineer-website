import type { LoaderFunction } from 'react-router'
import { getPlayLists, getRecentVideos } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const loader: LoaderFunction = async () => {
  // move to env or something at some point
  const baseURL = 'https://fe-engineer.com/'
  const makeXML = (location: string, priority: number, date?: string) => {
    return `<url>
    <loc>${baseURL}${location}</loc>
    ${date ? `<lastmod>${date}</lastmod>` : ''}
    <changefreq>${priority === 1 ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
    </url>`
  }

  // get playlist data
  let playListData
  if (cache.has('playlists')) {
    playListData = await cache.get('playlists')
  } else {
    playListData = await getPlayLists()
    cache.set('playlists', playListData, 60 * 30)
  }

  // get 50 most recent videos data
  let recentvideos
  if (cache.has('50recentvideos')) {
    recentvideos = await cache.get('50recentvideos')
  } else {
    recentvideos = await getRecentVideos(50)
    cache.set('50recentvideos', recentvideos, 60 * 60 * 24)
  }

  // turn playlists into xml
  const playListPages = playListData?.items.map((playlist: any) => {
    return makeXML(
      `playlist/${playlist?.id}`,
      0.9,
      playlist?.snippet?.publishedAt
    )
  })

  // turn videos into xml
  const videosPages = recentvideos?.items.map((video: any) => {
    return makeXML(
      `videos/${video?.id?.videoId}`,
      0.9,
      video?.snippet?.publishedAt
    )
  })

  // The overall XML content to return, including dynamic data
  const content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${makeXML('', 1)}
      ${makeXML('playlist', 1)}
      ${playListPages.join('')}
      ${makeXML('videos', 1)}
      ${videosPages.join('')}
      </urlset>`

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  })
}
