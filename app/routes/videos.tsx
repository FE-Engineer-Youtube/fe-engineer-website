import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return []
}

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Playlist() {
  return (
    <>
      <Outlet />
    </>
  )
}
