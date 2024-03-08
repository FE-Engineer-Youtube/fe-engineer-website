import {
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { CountUp } from 'use-count-up'
import { gaEvent } from '~/utils/gtags.client'
import classes from './Hpabout.module.css'

const Hpabout = ({ channelData }: any) => {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const displayText = {
    title:
      channelData?.items[0]?.brandingSettings?.channel?.title || 'FE-Engineer',
    subTitle: 'Welcome Homelabbers and Engineers!',
    description:
      channelData?.items[0]?.brandingSettings?.channel?.description ||
      'channel description',
    buttonText: '@FE-Engineer on Youtube',
    buttonLabel: 'Visit @FE-Engineer channel on Youtube',
  }

  return (
    <>
      <Title className={classes.title} ta="center" order={1} mb="xl" mt={64}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'ytRed', to: 'blue' }}
        >
          {displayText.title}
        </Text>
      </Title>
      <Text ta="center" mb="md" size="xl">
        {displayText.subTitle}
      </Text>

      <Text ta="left" component="span" size="md">
        {displayText.description}
      </Text>
      <Divider mt="md" mb="xl" />

      <Flex
        align="center"
        justify="space-between"
        direction={mobile ? 'column' : 'row'}
      >
        {Object.keys(channelData?.items[0]?.statistics).map(
          (item: any, index) => {
            if (!item.includes('hidden')) {
              return (
                <Stack key={`${item}-${index}`} gap={0} mb="lg">
                  <Title className={classes.channelStats} order={2} ta="center">
                    {item.replace(/count/i, 's')}
                  </Title>
                  <Text ta="center" size="xl" c="text">
                    <CountUp
                      isCounting
                      end={+channelData?.items[0]?.statistics[item] || 9999}
                      duration={3}
                      formatter={(value) =>
                        value.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                      }
                    />
                  </Text>
                </Stack>
              )
            }
          }
        )}
      </Flex>
      {channelData?.items[0]?.id && (
        <Stack mb="xl" align="center">
          <Button
            component="a"
            target="_blank"
            href={`//www.youtube.com/channel/${channelData?.items[0]?.id}`}
            color="ytRed"
            justify="center"
            radius="xl"
            onClick={() => {
              gaEvent({
                name: 'go to youtube channel',
                category: 'click',
                label: displayText.buttonLabel,
                value: `//www.youtube.com/channel/${channelData?.items[0]?.id}`,
              })
            }}
          >
            {displayText.buttonLabel}
          </Button>
        </Stack>
      )}
    </>
  )
}

export default Hpabout
