import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { CountUp } from 'use-count-up'

const Hpabout = ({ channelData }: any) => {
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
      <Divider mt="md" />
      <Group justify="space-between" mt="md">
        <Stack gap={0}>
          <Text ta="center" size="xl">
            <CountUp
              isCounting
              end={+channelData?.items[0]?.statistics?.videoCount || 9999}
              duration={3}
              formatter={(value) =>
                value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              }
            />
          </Text>
          <Title order={2} ta="center" c="ytRed.9">
            Videos
          </Title>
        </Stack>
        <Stack gap={0}>
          <Text ta="center" size="xl">
            <CountUp
              isCounting
              end={+channelData?.items[0]?.statistics?.viewCount || 9999}
              duration={3}
              formatter={(value) =>
                value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              }
            />
          </Text>
          <Title order={2} ta="center" c="ytRed.9">
            Views
          </Title>
        </Stack>
        <Stack gap={0}>
          <Text ta="center" size="xl">
            <CountUp
              isCounting
              end={+channelData?.items[0]?.statistics?.subscriberCount || 9999}
              duration={3}
              formatter={(value) =>
                value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              }
            />
          </Text>
          <Title order={2} ta="center" c="ytRed.9">
            Subscribers
          </Title>
        </Stack>
      </Group>
    </>
  )
}

export default Hpabout
