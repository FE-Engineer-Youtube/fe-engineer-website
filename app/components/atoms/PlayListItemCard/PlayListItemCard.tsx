import { Card, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { Link } from '@remix-run/react'
import { createSrcSet, sixteenByNine } from '~/utils/utils'
import classes from './PlayListItemCard.module.css'

const PlayListItemCard = ({ data }: any) => {
  const thumbnails = data.snippet.thumbnails
  const [ref, rect] = useResizeObserver()
  const videoId =
    data?.snippet?.resourceId?.videoId ?? data?.id?.videoId ?? null

  const displayText = {
    title: data?.snippet?.title || 'Playlist Title',
    description: data?.snippet?.description || 'Playlist description',
    lastUpdate: `Published on: ${
      new Date(data?.snippet?.publishedAt).toLocaleDateString() ||
      'Publish Date'
    }`,
    alt: `Video thumbnail image for ${
      data?.snippet?.title || 'Playlist Title'
    }`,
    sizes:
      '(max-width: 319px) 320px,(max-width: 479px) 320px,(max-width: 600px) 480px, (max-width: 768px) 640px, 1280px',
  }

  return (
    <>
      <Link className={classes.link} to={`/videos/${videoId}`}>
        <Card className={classes.card} padding="md" withBorder>
          <Card.Section>
            <img
              className={classes.image}
              ref={ref}
              style={{ height: sixteenByNine(rect.width), objectFit: 'cover' }}
              src={thumbnails.default.url}
              srcSet={createSrcSet(thumbnails)}
              sizes={displayText.sizes}
              alt={displayText.alt}
            />
          </Card.Section>
          <Title className={classes.title} order={2} ta="center" size="h3">
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'ytRed', to: 'blue' }}
            >
              {displayText.title}
            </Text>
          </Title>
          <Text ta="center" size="md" mt="md" lineClamp={3}>
            {displayText.description}
          </Text>
          <Text ta="right" size="xs" mt="xs" mb="xs">
            {displayText.lastUpdate}
          </Text>
        </Card>
      </Link>
    </>
  )
}

export default PlayListItemCard
