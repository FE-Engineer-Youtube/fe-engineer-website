import { Card, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { Link } from '@remix-run/react'
import { decode } from 'html-entities'
import { createSrcSet, sixteenByNine } from '~/utils/utils'
import classes from './PlayListCard.module.css'

const PlayListCard = ({ data }: any) => {
  const thumbnails = data.snippet.thumbnails
  const [ref, rect] = useResizeObserver()

  const displayText = {
    title: data?.snippet?.title || 'Playlist Title',
    description: data?.snippet?.description || 'Playlist description',
    itemCount: `${data.contentDetails.itemCount || '?'} videos`,
    alt: `Video Thumbnail for ${data?.snippet?.title || 'Playlist Title'}`,
    sizes:
      '(max-width: 319px) 320px,(max-width: 479px) 320px,(max-width: 600px) 480px, (max-width: 768px) 640px, 1280px',
  }

  return (
    <>
      <Link className={classes.link} to={`/playlist/${data.id}`}>
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
          <Title
            className={classes.title}
            order={2}
            ta="center"
            lineClamp={2}
            mt="md"
          >
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'ytRed', to: 'blue' }}
            >
              {decode(displayText.title)}
            </Text>
          </Title>
          <Text
            className={classes.description}
            ta="left"
            size="md"
            lineClamp={3}
          >
            {displayText.description}
          </Text>
          <Text className={classes.bottomText} ta="right" size="xs">
            {displayText.itemCount}
          </Text>
        </Card>
      </Link>
    </>
  )
}

export default PlayListCard
