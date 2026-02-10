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
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  useRouteError,
} from 'react-router'
import React, { type ReactNode, useEffect } from 'react'
import Navigation from '~/components/molecules/Navigation'
import Splash from '~/components/organisms/splash'
import type { user } from '~/models/auth/auth.server'
import { authenticator } from '~/models/auth/auth.server'
import classes from '~/styles/root.styles.module.css'
import * as gtag from '~/utils/gtags.client'
import { theme } from '~/utils/theme'
import Footer from './components/molecules/Footer'

const SITE_NAME = 'FE-Engineer'
const SITE_FALLBACK_ORIGIN = 'https://fe-engineer.com'
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@FE-Engineer'
const COMING_UP_URL = 'https://www.comingup.today/'
const GITHUB_PROFILE_URL = 'https://github.com/FE-Engineer-Youtube'
const DEFAULT_SOCIAL_IMAGE = `${SITE_FALLBACK_ORIGIN}/images/fe-engineer.png`

export const links: LinksFunction = () => [
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

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'public, max-age=1, s-maxage=300, stale-while-revalidate=43200',
})

export const meta: MetaFunction = () => {
  const description =
    'Practical software engineering, homelab infrastructure, local AI workflows, and real-world build guides from FE-Engineer.'

  return [
    { title: SITE_NAME },
    { name: 'description', content: description },

    // Optional but recommended canonicalization helpers
    // If you have a known origin constant, use that.
    { property: 'og:url', content: 'https://fe-engineer.com/' },
    { property: 'og:site_name', content: SITE_NAME },

    // Author meta is okay, but not a standard SEO signal.
    { name: 'author', content: SITE_NAME },

    { property: 'og:title', content: SITE_NAME },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_US' },

    // Use a stable absolute URL here
    { property: 'og:image', content: DEFAULT_SOCIAL_IMAGE },

    // Make alt match what the image actually is (usually an OG banner)
    { property: 'og:image:alt', content: `${SITE_NAME} — Practical engineering and homelab builds` },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: SITE_NAME },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_SOCIAL_IMAGE },

    // Optional canonical tag if your framework supports it via MetaFunction
    // Some setups use { rel: 'canonical', href: '...' } instead—depends on your meta handling.
    // { tagName: 'link', rel: 'canonical', href: 'https://fe-engineer.com/' },
  ]
}


export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let user: user = await authenticator.isAuthenticated(request)
  // expose env variable to client on purpose
  const ga = process?.env?.FB_MEASURE || 'no_ga_found'
  const origin = new URL(request.url).origin
  return Response.json(
    { ga, origin, user },
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

function extractBreadcrumbText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return ''
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractBreadcrumbText).join(' ').trim()
  }

  if (React.isValidElement(node)) {
    return extractBreadcrumbText((node as any).props?.children)
  }

  return ''
}

function fallbackBreadcrumbLabel(pathname: string) {
  if (!pathname || pathname === '/') {
    return 'Home'
  }

  const segment = pathname.split('/').filter(Boolean).pop() || ''
  return decodeURIComponent(segment)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function toAbsoluteUrl(origin: string, pathname: string) {
  return `${origin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

function normalizeOrigin(origin: string) {
  return origin.replace('://www.', '://')
}

export default function App() {
  const location = useLocation()
  const matches = useMatches()
  const loaderData = useLoaderData() as
    | { ga: string; origin: string; user: user | null }
    | undefined
  const ga = loaderData?.ga || 'no_ga_found'
  const origin = normalizeOrigin(loaderData?.origin || SITE_FALLBACK_ORIGIN)
  const user = loaderData?.user ?? null
  const canonicalUrl = toAbsoluteUrl(origin, location.pathname)

  const breadcrumbItems = matches
    .filter((match: any) => match?.handle?.breadcrumb)
    .map((match: any) => {
      const breadcrumbNode = match.handle.breadcrumb(match)
      const label =
        extractBreadcrumbText(breadcrumbNode) ||
        fallbackBreadcrumbLabel(match.pathname)

      return {
        path: match.pathname || '/',
        label,
        node: breadcrumbNode,
      }
    })

  const breadcrumbSchema =
    breadcrumbItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: toAbsoluteUrl(origin, item.path),
          })),
        }
      : null

      const personId = `${origin}/#person`
      const websiteId = `${origin}/#website`
      
      // ComingUp Today entities (modeled, but NOT in sameAs)
      const comingUpWebsiteId = `${COMING_UP_URL}#website`
      const comingUpAppId = `${COMING_UP_URL}#app`
      
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': personId,
            name: SITE_NAME,
            url: `${origin}/about`,
            image: DEFAULT_SOCIAL_IMAGE,
      
            // sameAs should be identity profiles, not a product site
            sameAs: [YOUTUBE_CHANNEL_URL, GITHUB_PROFILE_URL],
      
            jobTitle: 'Software Engineer',
            knowsAbout: [
              'Software engineering',
              'Homelab infrastructure',
              'Local AI',
              'AMD ROCm',
              'Automation',
              'Web development',
            ],
      
            // Safer than owns; indicates the person is the subject/creator of this thing
            subjectOf: [{ '@id': comingUpWebsiteId }, { '@id': comingUpAppId }],
          },
      
          {
            '@type': 'WebSite',
            '@id': websiteId,
            name: SITE_NAME,
            url: origin,
            description:
              'Practical software engineering, homelab infrastructure, local AI workflows, and real-world build guides.',
            inLanguage: 'en',
            author: { '@id': personId },
            creator: { '@id': personId },
          },
      
          {
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: SITE_NAME,
            description:
              'Practical software engineering, homelab infrastructure, local AI workflows, and real-world build guides.',
            isPartOf: { '@id': websiteId },
            author: { '@id': personId },
      
            // Homepage isn't "about" the person; avoid about -> person here
            // about: { '@id': personId },
          },
      
          // ComingUp Today modeled explicitly (helps relationship clarity)
          {
            '@type': 'WebSite',
            '@id': comingUpWebsiteId,
            name: 'ComingUp Today',
            url: COMING_UP_URL,
          },
          {
            '@type': 'SoftwareApplication',
            '@id': comingUpAppId,
            name: 'ComingUp Today',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web',
            url: COMING_UP_URL,
            creator: { '@id': personId },
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
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <Links />
        <ColorSchemeScript defaultColorScheme="auto" />
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
        {breadcrumbSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
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
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={`${item.path}-${index}`}>
                      {item.node}
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
        <ColorSchemeScript defaultColorScheme="auto" />
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
