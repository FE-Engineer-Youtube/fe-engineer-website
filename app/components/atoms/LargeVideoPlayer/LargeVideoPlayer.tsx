import { Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { decode } from 'html-entities'
import { useEffect, useState } from 'react'
import { CountUp } from 'use-count-up'
import { gaEvent } from '~/utils/gtags.client'
import { sixteenByNine } from '~/utils/utils'
import classes from './LargeVideoPlayer.module.css'

const LargeVideoPlayer = ({ data }: any) => {
  const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()
  const [date, setDate] = useState('')

  useEffect(() => {
    if (rect.width !== undefined) {
      setHeight(sixteenByNine(rect.width))
    } else {
      setHeight(0)
    }
  }, [rect])

  let displayText = {
    title: `${data?.items[0].snippet?.title || 'Video Title'}`,
    description: data?.items[0]?.snippet.description || 'Description',
    tags: 'Tags: ',
    views: 'Views: ',
    likes: 'Likes: ',
    published: `Published on: ${date}`,
    buttonLabel: `Watch ${decode(
      data?.items[0].snippet?.title || 'Video Title'
    )} on Youtube`,
    buttonText: 'Watch video on Youtube',
  }

  useEffect(() => {
    setDate(new Date(data?.items[0].snippet?.publishedAt).toLocaleDateString())
  }, [])

  return (
    <>
      <Card className={classes.videocard} padding="md" withBorder mt={64}>
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
        <Title ta="center" order={1} mb="lg" c="blue">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'ytRed', to: 'blue' }}
          >
            {decode(displayText.title)}
          </Text>
        </Title>
        <Group justify="space-between">
          <Text>{displayText.published}</Text>
          <Text>
            {displayText.views}
            <CountUp
              isCounting
              end={+data?.items[0].statistics?.viewCount || 9999}
              duration={3}
              formatter={(value) =>
                value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              }
            />
          </Text>
          <Text>
            {displayText.likes}
            <CountUp
              isCounting
              end={+data?.items[0].statistics?.likeCount || 99}
              duration={3}
              formatter={(value) =>
                value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              }
            />
          </Text>
        </Group>
        {data?.items[0]?.snippet?.tags?.length > 0 && (
          <>
            <Group align="center" mt="md">
              <Text fw={700}>{displayText.tags}</Text>
              {data?.items[0]?.snippet?.tags.map((item: any, index: number) => {
                return (
                  <Badge
                    key={`${item}-${index}`}
                    color="ytRed"
                    className={classes.badge}
                    size="sm"
                  >
                    {item}
                  </Badge>
                )
              })}
            </Group>
          </>
        )}
        <Button
          component="a"
          target="_blank"
          color="ytRed"
          radius="xl"
          href={`//www.youtube.com/watch?v=${data?.items[0]?.id}`}
          mt="sm"
          aria-label={`Watch ${decode(displayText.title)} on Youtube`}
          onClick={() => {
            gaEvent({
              name: 'go to youtube video',
              category: 'click',
              label: displayText.buttonLabel,
              value: `//www.youtube.com/playlist?list=${data?.id}`,
            })
          }}
        >
          {displayText.buttonText}
        </Button>
        <Text className={classes.description} ta="left" size="md" mt="lg">
          {displayText.description}
        </Text>
      </Card>
    </>
  )
}

export default LargeVideoPlayer
