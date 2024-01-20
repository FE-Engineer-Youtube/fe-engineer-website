import { Button, Card, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { decode } from 'html-entities'
import { useEffect, useState } from 'react'
import { gaEvent } from '~/utils/gtags.client'
import { sixteenByNine } from '~/utils/utils'
import classes from './VideoPlayer.module.css'

const VideoPlayer = ({ data }: any) => {
  const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()
  const videoId = data?.contentDetails?.upload?.videoId || ''

  useEffect(() => {
    if (rect?.width !== undefined) {
      setHeight(sixteenByNine(rect?.width))
    } else {
      setHeight(0)
    }
  }, [rect])

  const displayText = {
    accessibleTitle: `YouTube Video for: ${
      data?.snippet?.title || 'Video Title'
    }`,
    title: `${data?.snippet?.title || 'Video Title'}`,
    description: data?.snippet?.description || 'Description',
    buttonText: 'Watch this video on Youtube',
  }

  return (
    <>
      <Card className={classes.videocard} padding="md" withBorder>
        <Card.Section className={classes.ytiframe} ref={ref}>
          <iframe
            title={displayText.title}
            width="100%"
            height={height}
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder={0}
            allowFullScreen
          />
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
          href={`//www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          mt="md"
          radius={'xl'}
          color="ytRed"
          onClick={() => {
            gaEvent({
              name: 'go to youtube video',
              category: 'click',
              label: displayText.buttonText,
              value: `//www.youtube.com/watch?v=${videoId}`,
            })
          }}
        >
          {displayText.buttonText}
        </Button>
      </Card>
    </>
  )
}

export default VideoPlayer
