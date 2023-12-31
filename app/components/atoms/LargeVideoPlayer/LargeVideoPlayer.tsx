import { Badge, Card, Group, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { sixteenByNine } from '~/utils/utils'
import classes from './LargeVideoPlayer.module.css'

const LargeVideoPlayer = ({ data }: any) => {
  const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()

  useEffect(() => {
    if (rect.width !== undefined) {
      setHeight(sixteenByNine(rect.width))
    } else {
      setHeight(0)
    }
  }, [rect])

  const displayText = {
    title: `${data?.items[0].snippet?.title || 'Video Title'}`,
    description: data?.items[0]?.snippet.description || 'Description',
    tags: 'Tags: ',
    views: `Views: ${data?.items[0].statistics?.viewCount || 'unknown'}`,
    likes: `Likes: ${data?.items[0].statistics?.likeCount || 'unknown'}`,
    published: `Published on: ${new Date(
      data?.items[0].snippet?.publishedAt
    ).toLocaleDateString()}`,
  }

  console.log(data)
  return (
    <>
      <Card className={classes.videocard} padding="md" withBorder>
        <Card.Section className={classes.ytiframe} ref={ref}>
          <iframe
            className={classes.iframe}
            title={displayText.title}
            width="100%"
            height={height}
            src={`https://www.youtube.com/embed/${data.items[0].id}`}
            allowFullScreen
          />
        </Card.Section>
        <Title ta="center" order={2} mb="lg" c="blue">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'ytRed', to: 'blue' }}
          >
            {displayText.title}
          </Text>
        </Title>
        <Group justify="space-between">
          <Text>{displayText.published}</Text>
          <Text>{displayText.views}</Text>
          <Text>{displayText.likes}</Text>
        </Group>
        {data?.items[0]?.snippet.tags.length > 0 && (
          <>
            <Group align="center" mt="md">
              <Text fw={700}>{displayText.tags}</Text>
              {data?.items[0]?.snippet.tags.map((item: any) => {
                return (
                  <Badge
                    color="ytRed"
                    className={classes.badge}
                    size="sm"
                    mr="xs"
                  >
                    {item}
                  </Badge>
                )
              })}
            </Group>
          </>
        )}
        <Text className={classes.description} ta="left" size="md" mt="lg">
          {displayText.description}
        </Text>
      </Card>
    </>
  )
}

export default LargeVideoPlayer
