import type { LoaderFunction, MetaFunction } from 'react-router'
import { Link, Outlet } from 'react-router'
import classes from '~/styles/root.styles.module.css'

export const meta: MetaFunction = () => {
  return []
}

export const loader: LoaderFunction = async () => {
  return {}
}

export const handle = {
  breadcrumb: () => (
    <Link className={classes.breadcrumbLink} to="/videos">
      Videos
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
