import { Card, Text } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { sixteenByNine } from '~/utils/utils'
import classes from './VideoPlayer.module.css'

const VideoPlayer = ({ data }: any) => {
  const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()

  useEffect(() => {
    if (rect.width !== undefined) {
      setHeight(sixteenByNine(rect.width))
    } else {
      setHeight(0)
    }
  }, [rect])

  return (
    <>
      <Card className={classes.videocard} p={32}>
        <div className={classes.ytiframe} ref={ref}>
          <iframe
            title={`YouTube Video for: ${data?.snippet?.title}`}
            width="100%"
            height={height}
            src={`https://www.youtube.com/embed/${data.id.videoId}`}
            frameBorder={0}
            allowFullScreen
          />
        </div>
        <Text ta="center" size="lg" maw={580} mx="auto" mt="xl">
          {data?.snippet?.description}
        </Text>
      </Card>
    </>
  )
}

export default VideoPlayer
