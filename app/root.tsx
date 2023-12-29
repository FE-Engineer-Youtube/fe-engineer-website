import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: 'stylesheet', href: cssBundleHref },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://yt3.ggpht.com/s8Zhr1JBbxpqhHUhn6hmADJCQRgChgJFm7f3gzM28CFeC4IpZEEyeVvnBFlZUOsgk3ROoPFq5sc=s88-c-k-c0x00ffffff-no-rj',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'https://yt3.ggpht.com/s8Zhr1JBbxpqhHUhn6hmADJCQRgChgJFm7f3gzM28CFeC4IpZEEyeVvnBFlZUOsgk3ROoPFq5sc=s88-c-k-c0x00ffffff-no-rj',
        },
      ]
    : [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://yt3.ggpht.com/s8Zhr1JBbxpqhHUhn6hmADJCQRgChgJFm7f3gzM28CFeC4IpZEEyeVvnBFlZUOsgk3ROoPFq5sc=s88-c-k-c0x00ffffff-no-rj',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'https://yt3.ggpht.com/s8Zhr1JBbxpqhHUhn6hmADJCQRgChgJFm7f3gzM28CFeC4IpZEEyeVvnBFlZUOsgk3ROoPFq5sc=s88-c-k-c0x00ffffff-no-rj',
        },
      ]),
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  )
}
