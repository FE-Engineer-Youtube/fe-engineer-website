import { Card, Text } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import classes from './VideoPlayer.module.css'

const VideoPlayer = ({ data }: any) => {
  const ref = useRef<HTMLInputElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current?.offsetWidth !== undefined) {
      setHeight((ref?.current?.offsetWidth / 16) * 9)
    } else {
      setHeight(0)
    }
  }, [])

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
