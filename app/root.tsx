import {
  AppShell,
  Breadcrumbs,
  Burger,
  Card,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Space,
  Text,
  Title,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { useDisclosure } from '@mantine/hooks'
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
  useRouteError,
} from '@remix-run/react'
import React, { useEffect } from 'react'
import classes from '~/styles/root.styles.module.css'
import * as gtag from '~/utils/gtags.client'
import Splash from './components/organisms/splash'
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
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure()
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
            navbar={{
              width: 120,
              breakpoint: 'sm',
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
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
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                  aria-label="Toggle navigation panel open/close"
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                  aria-label="Toggle navigation panel open/close"
                />
              </Group>
              <AppShell.Navbar p="md">
                {displayText?.nav.map((item) => {
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
              </AppShell.Navbar>
            </AppShell.Header>
            <AppShell.Main>
              <Breadcrumbs separator="⟩">
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Open+Sans&family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error: any = useRouteError()
  const displayText = {
    title:
      error?.data === '404 Not Found'
        ? 'four oh four... :('
        : `Error, gotta catch 'em all`,
    message:
      error?.data === '404 Not Found'
        ? 'Sad day, it looks like the page you are looking for does not exist.  Maybe if you go back and try again it will be different the next time...'
        : 'Well, there went my saturday...looks like something broke... :-/',
  }
  return (
    <html>
      <head>
        <title>{displayText?.title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Container size={1280}>
            <Splash title={displayText?.title} message={displayText?.message} />
            <Card>
              <Title order={2} mt="sm" fw="normal" size={20}>
                Error Text:
              </Title>
              <pre>
                <code>
                  {error?.stack ??
                    error?.message ??
                    error?.data ??
                    'Unknown Error'}
                </code>
              </pre>
            </Card>
            <Space h={64} />
            <Card>
              <Title order={2} mt="sm" fw="normal" size={20}>
                Error
              </Title>
              <pre>
                <code>{JSON.stringify(error, null, 2)}</code>
              </pre>
            </Card>
          </Container>

          <Scripts />
        </MantineProvider>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Open+Sans&family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </body>
    </html>
  )
}
