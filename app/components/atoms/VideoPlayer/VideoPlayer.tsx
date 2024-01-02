import { Card, Text } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { sixteenByNine } from '~/utils/utils'
import classes from './VideoPlayer.module.css'

const VideoPlayer = ({ data }: any) => {
  const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()

  useEffect(() => {
    if (rect?.width !== undefined) {
      setHeight(sixteenByNine(rect?.width))
    } else {
      setHeight(0)
    }
  }, [rect])

  const displayText = {
    title: `YouTube Video for: ${data?.snippet?.title || 'Video Title'}`,
    description: data?.snippet?.description || 'Description',
  }

  return (
    <>
      <Card className={classes.videocard} padding="md" withBorder>
        <Card.Section className={classes.ytiframe} ref={ref}>
          <iframe
            title={displayText.title}
            width="100%"
            height={height}
            src={`https://www.youtube.com/embed/${data.id.videoId}`}
            frameBorder={0}
            allowFullScreen
          />
        </Card.Section>
        <Text ta="center" size="lg" mt="xl">
          {displayText.description}
        </Text>
      </Card>
    </>
  )
}

export default VideoPlayer
