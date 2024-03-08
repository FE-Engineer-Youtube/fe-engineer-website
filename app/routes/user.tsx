import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
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

export default function user() {
  return (
    <>
      <Outlet />
    </>
  )
}
