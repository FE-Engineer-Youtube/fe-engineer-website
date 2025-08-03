import {
  AppShell,
  Breadcrumbs,
  Card,
  ColorSchemeScript,
  Container,
  MantineProvider,
  Space,
  Title,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  LoaderFunctionArgs,
  type HeadersFunction,
  type LinksFunction,
  type LoaderFunction,
} from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useLocation,
  useMatches,
  useRouteError,
} from '@remix-run/react'
import React, { useEffect } from 'react'
import Navigation from '~/components/molecules/Navigation'
import Splash from '~/components/organisms/splash'
import type { user } from '~/models/auth/auth.server'
import { authenticator } from '~/models/auth/auth.server'
import classes from '~/styles/root.styles.module.css'
import * as gtag from '~/utils/gtags.client'
import { theme } from '~/utils/theme'
import Footer from './components/molecules/Footer'

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

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'public, max-age=1, s-maxage=300, stale-while-revalidate=43200',
})

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let user: user = await authenticator.isAuthenticated(request)
  // expose env variable to client on purpose
  const ga = process?.env?.FB_MEASURE || 'no_ga_found'
  return json(
    { ga, user },
    {
      headers: {
        'Cache-Control':
          'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
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
  const { ga, user }: { ga: string; user: user | null } =
    useLoaderData<typeof loader>()

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
              <Navigation user={user} />
            </AppShell.Header>
            <AppShell.Main>
              <Container size={1280}>
                <Breadcrumbs separator="⟩" mb="xl">
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

                <Outlet />
              </Container>
            </AppShell.Main>
          </AppShell>
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Lato:ital,wght@0,400;0,700;1,400&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
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
          <Footer />
          <Scripts />
        </MantineProvider>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap&family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </body>
    </html>
  )
}
