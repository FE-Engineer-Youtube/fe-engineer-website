import { Button, Card, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { Link } from 'react-router'
import { decode } from 'html-entities'
import { gaEvent } from '~/utils/gtags.client'
import { createSrcSet, sixteenByNine } from '~/utils/utils'
import classes from './PlayListItemCard.module.css'

const PlayListItemCard = ({ data }: any) => {
  const thumbnails = data.snippet.thumbnails
  const [ref, rect] = useResizeObserver()
  const videoId =
    data?.snippet?.resourceId?.videoId ?? data?.id?.videoId ?? null
  const date = new Date(data?.snippet?.publishedAt).toLocaleDateString()

  const displayText = {
    title: data?.snippet?.title || 'Playlist Title',
    description: data?.snippet?.description || 'Playlist description',
    lastUpdate: `Published on: ${date || 'Publish Date'}`,
    alt: `Video thumbnail image for ${
      data?.snippet?.title || 'Playlist Title'
    }`,
    sizes:
      '(max-width: 319px) 320px,(max-width: 479px) 320px,(max-width: 600px) 480px, (max-width: 768px) 640px, 1280px',
    buttonText: 'Watch Video on Youtube',
  }

  return (
    <>
      <Card className={classes.card} padding="md" withBorder>
        <Card.Section>
          <Link className={classes.link} to={`/videos/${videoId}`}>
            <img
              className={classes.image}
              ref={ref}
              style={{ height: sixteenByNine(rect.width), objectFit: 'cover' }}
              src={thumbnails?.default?.url}
              srcSet={createSrcSet(thumbnails)}
              sizes={displayText.sizes}
              alt={displayText?.alt}
            />
          </Link>
        </Card.Section>
        <Title
          className={classes.title}
          order={2}
          ta="center"
          size="h3"
          mt="md"
        >
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'ytRed', to: 'blue' }}
            lineClamp={3}
          >
            {decode(displayText?.title)}
          </Text>
        </Title>
        <Text className={classes.description} ta="left" size="md" lineClamp={3}>
          {displayText?.description}
        </Text>
        <Button
          component="a"
          target="_blank"
          color="ytRed"
          radius="xl"
          href={`//www.youtube.com/watch?v=${
            data?.snippet?.resourceId?.videoId || data?.id?.videoId
          }${
            data?.snippet?.playlistId && '&list=' + data?.snippet?.playlistId
          }`}
          mt="sm"
          onClick={() => {
            gaEvent({
              name: 'go to youtube video with playlist',
              category: 'click',
              label: displayText.buttonText,
              value: `//www.youtube.com/watch?v=${
                data?.snippet?.resourceId?.videoId || data?.id?.videoId
              }${
                data?.snippet?.playlistId &&
                '&list=' + data?.snippet?.playlistId
              }`,
            })
          }}
        >
          {displayText.buttonText}
        </Button>
        <Text ta="right" size="xs" mt="sm">
          {displayText?.lastUpdate}
        </Text>
      </Card>
    </>
  )
}

export default PlayListItemCard
