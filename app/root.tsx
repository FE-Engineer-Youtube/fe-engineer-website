import {
  AppShell,
  Breadcrumbs,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Text,
  Title,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
} from '@remix-run/react'
import React, { useEffect } from 'react'
import classes from '~/styles/root.styles.module.css'
import * as gtag from '~/utils/gtags.client'
import { theme } from './utils/theme'

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: 'stylesheet', href: cssBundleHref },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/images/fe-engineer.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/fe-engineer.png',
        },
        {
          rel: 'favicon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/fe-engineer.png',
        },
      ]
    : [
        {
          rel: 'favicon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/fe-engineer.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/images/fe-engineer.png',
        },
      ]),
]

export async function loader() {
  // expose env variable to client on purpose
  const ga = process?.env?.GA || 'no_ga_found'
  return { ga }
}

export const handle = {
  breadcrumb: () => (
    <Link className={classes.breadcrumbLink} to="/">
      Home
    </Link>
  ),
}

export default function App() {
  const location = useLocation()
  const matches = useMatches()
  const { ga }: any = useLoaderData<typeof loader>()
  const displayText = {
    nav: [
      {
        text: 'Videos',
        url: '/videos',
      },
      {
        text: 'Playlists',
        url: '/playlist',
      },
    ],
  }

  useEffect(() => {
    if (ga.length) {
      gtag.pageview(location.pathname, ga)
    }
  }, [location, ga])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
        ></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}')`,
          }}
          id="ga4"
        ></script>
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AppShell
            header={{ height: 60 }}
            transitionDuration={350}
            transitionTimingFunction="ease"
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" w="100%" px="md" justify="space-between">
                <Link className={classes.logoLink} to="/">
                  <Title className={classes.title} order={3}>
                    <Text
                      inherit
                      variant="gradient"
                      component="span"
                      gradient={{ from: 'ytRed', to: 'blue' }}
                    >
                      FE-Engineer.com
                    </Text>
                  </Title>
                </Link>
                {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
                <nav>
                  {displayText.nav.map((item) => {
                    return (
                      <NavLink
                        key={item.text}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? 'navLink pending'
                            : isActive
                            ? 'navLink active'
                            : 'navLink'
                        }
                        to={item.url}
                      >
                        {item.text}
                      </NavLink>
                    )
                  })}
                </nav>
              </Group>
            </AppShell.Header>
            <AppShell.Main>
              <Breadcrumbs>
                {matches
                  .filter(
                    (match: any) => match.handle && match.handle?.breadcrumb
                  )
                  .map((match: any, index) => (
                    <React.Fragment key={index}>
                      {match.handle.breadcrumb(match)}
                    </React.Fragment>
                  ))}
              </Breadcrumbs>

              <Container size={1280}>
                <Outlet />
              </Container>
            </AppShell.Main>
          </AppShell>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  )
}
