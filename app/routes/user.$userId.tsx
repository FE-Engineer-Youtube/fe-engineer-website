import {
  Avatar,
  Card,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { user } from '~/models/auth/auth.server'
import { authenticator } from '~/models/auth/auth.server'
import classes from '~/styles/root.styles.module.css'

export const meta: MetaFunction = () => {
  return []
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let user: user = await authenticator.isAuthenticated(request)

  return { user }
}

export const handle = {
  breadcrumb: () => <Text className={classes.breadcrumbLink}>Profile</Text>,
}

export default function Profile() {
  const { user } = useLoaderData<{ user: user }>()
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  return (
    <>
      <Title order={1} mt="lg" mb="xl">
        User Profile Page
      </Title>
      <Group
        w="100%"
        wrap={mobile ? 'wrap' : 'nowrap'}
        justify="center"
        align="flex-start"
      >
        <Card w={280}>
          <Stack align="center">
            <Avatar size="160" src={user?.photos[0]?.value} />
            <Title order={2}>{user?.displayName}</Title>
            <div>
              <Group w="100%" justify="space-between">
                <Text>Email:</Text>
                <Text>{user?.emails[0].value}</Text>
              </Group>
              <Group w="100%" justify="space-between">
                <Text>Provider:</Text>
                <Text> {user?.provider}</Text>
              </Group>
            </div>
          </Stack>
        </Card>
        <Card w={mobile ? '100%' : 'calc(100% - 280px)'}>
          <Title mb="lg" order={2}>
            Settings:
          </Title>
          <Group w="100%" justify="space-between">
            <Text>Setting X:</Text>
            <Text>value</Text>
          </Group>

          <Text>For use later</Text>
        </Card>
      </Group>
    </>
  )
}
