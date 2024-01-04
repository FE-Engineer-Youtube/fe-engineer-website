import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getPlayLists } from '~/models/fetchYT.server'
import { cache } from '~/utils/db.server'

export const meta: MetaFunction = (data: any) => {
  return []
}

export const loader: LoaderFunction = async () => {
  let playListData

  if (cache.has('playlists')) {
    playListData = await cache.get('playlists')
  } else {
    playListData = await getPlayLists()
    cache.set('playlists', playListData, 60 * 30)
  }

  return { playListData }
}

export default function Playlist() {
  return (
    <>
      <Outlet />
    </>
  )
}
