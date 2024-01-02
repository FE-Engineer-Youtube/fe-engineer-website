import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { CountUp } from 'use-count-up'
import classes from './Hpabout.module.css'

const Hpabout = ({ channelData }: any) => {
  const { ref, width } = useElementSize()
  console.log(width)
  console.log(channelData?.items[0]?.statistics)
  return (
    <>
      <Title className={'classes.title'} ta="center" order={1} mb="xl">
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'ytRed', to: 'blue' }}
        >
          {channelData?.items[0]?.brandingSettings?.channel?.title ||
            'FE-Engineer'}
        </Text>
      </Title>
      <Text
        ta="center"
        mb="md"
        size="xl"
      >{`Welcome Homelabbers and Engineers!`}</Text>

      <Text ta="left" component="span" size="md">
        {channelData?.items[0]?.brandingSettings?.channel?.description ||
          'channel description'}
      </Text>
      <Divider mt="md" ref={ref} />
      {width > 450 && (
        <Group align="center" justify="space-between" mt="md">
          {Object.keys(channelData?.items[0]?.statistics).map(
            (item: any, index) => {
              if (!item.includes('hidden')) {
                return (
                  <Stack gap={0}>
                    <Text ta="center" size="xl">
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
                    <Title
                      className={classes.channelStats}
                      order={2}
                      ta="center"
                      c="ytRed.9"
                    >
                      {item.replace(/count/i, 's')}
                    </Title>
                  </Stack>
                )
              }
            }
          )}
        </Group>
      )}
      {width <= 450 && (
        <>
          {Object.keys(channelData?.items[0]?.statistics).map(
            (item: any, index) => {
              if (!item.includes('hidden')) {
                return (
                  <Stack gap={0} mt="md">
                    <Text ta="center" size="xl">
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
                    <Title
                      className={classes.channelStats}
                      order={2}
                      ta="center"
                      c="ytRed.9"
                    >
                      {item.replace(/count/i, 's')}
                    </Title>
                  </Stack>
                )
              }
            }
          )}
        </>
      )}
    </>
  )
}

export default Hpabout
