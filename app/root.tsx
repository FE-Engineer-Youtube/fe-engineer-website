import {
  AppShell,
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
} from '@remix-run/react'
import dotenv from 'dotenv'
import classes from '~/styles/root.styles.module.css'
import { theme } from './utils/theme'

dotenv.config()

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

export default function App() {
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
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.GA})`,
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
