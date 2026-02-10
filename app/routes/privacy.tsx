import { Card, Text, Title } from '@mantine/core'
import type { LoaderFunction, MetaFunction } from 'react-router'
import { truncate } from '~/utils/utils'

export const meta: MetaFunction = (data: any) => {
  return [
    { title: 'Privacy Policy | FE-Engineer Youtube' },
    {
      name: 'description',
      content: truncate('Privacy Policy details', 157),
    },
    {
      name: 'keywords',
      content: `Privacy policy, FE Engineer, FE-Engineer, FE Engineer Youtube, FE-Engineer Youtube, FE Engineer Channel Youtube, FE-Engineer Channel Youtube`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Index() {
  // const { channelData, activitiesData }: any = useLoaderData()
  // const { ref, width } = useElementSize()

  return (
    <>
      <Title order={1}>Privacy Policy</Title>
      <Text>
        FE-Engineer takes data and privacy seriously. I do not store or keep any
        records of any users personal information from this site. If you choose
        to login through google, some of your personal information will be used
        to provide a better user experience, however none of this information
        will be retained or stored in any way.
      </Text>
      <Card mt="lg">
        <Title order={2}>How we use your data</Title>

        <Title order={3}>Personal Information</Title>
        <Text>
          We do not collect or store any personal information. Logging in with
          Google will allow us to use some personal information to improve the
          user experience, however we never collect or store any of this data.
        </Text>
        <Title order={3}>Cookies</Title>
        <Text>
          Cookies are used to authenticate users. No data is collected or stored
          beyond a user session. Some third party cookies may be used for
          tracking and analytics.
        </Text>
      </Card>
      <Card mt="lg">
        <Title order={2}>How we use your data</Title>
        <Text>
          If you choose to login through Google some profile data may be used to
          provide a better user experience, and to enable some extra features on
          the website. Other than that, your data is not stored or retained, or
          used for any other purpose. Under no circumstance will your data ever
          be sold.
        </Text>
      </Card>
      <Card mt="lg">
        <Title order={2}>How we use your data</Title>
        <Text>
          If you choose to login through Google some profile data may be used to
          provide a better user experience, and to enable some extra features on
          the website. Other than that, your data is not stored or retained, or
          used for any other purpose. Under no circumstance will your data ever
          be sold.
        </Text>
      </Card>
    </>
  )
}
