import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import { getPlayLists } from '~/models/fetchYT.server'
import classes from '~/styles/root.styles.module.css'
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

export const handle = {
  breadcrumb: () => (
    <Link className={classes.breadcrumbLink} to="/playlist">
      Playlists
    </Link>
  ),
}

export default function Playlist() {
  return (
    <>
      <Outlet />
    </>
  )
}
