import {
  Avatar,
  Burger,
  Button,
  Drawer,
  Flex,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure, useMediaQuery, useViewportSize } from '@mantine/hooks'
import { Form, Link, NavLink, useLocation } from '@remix-run/react'
import { useEffect } from 'react'
import type { user } from '~/models/auth/auth.server'
import classes from './navigation.module.css'

const Navigation = ({ user }: { user: user }) => {
  const displayText = {
    nav: [
      {
        text: 'Videos',
        url: '/videos',
      },
      {
        text: 'Playlists',
        url: '/playlist',
      },
    ],
  }

  const { width } = useViewportSize()
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const [opened, { open, close }] = useDisclosure()
  const location = useLocation()

  console.log(mobile)

  useEffect(() => {
    if (opened) {
      close()
    }
  }, [location.pathname])

  const menuLinks = () => {
    return (
      <Flex
        gap="md"
        align={mobile ? 'flex-start' : 'center'}
        direction={mobile ? 'column' : 'row'}
      >
        {displayText?.nav.map((item) => {
          return (
            <NavLink
              key={item.text}
              className={({ isActive, isPending }) =>
                isPending
                  ? 'navLink pending'
                  : isActive
                  ? 'navLink active'
                  : 'navLink'
              }
              to={item.url}
            >
              {item.text}
            </NavLink>
          )
        })}
        {(user === null || !user) && (
          <Form
            className={classes.loginForm}
            action="/api/google"
            method="POST"
          >
            <Button type="submit" variant="light">
              Login
            </Button>
          </Form>
        )}
        {user?.id && (
          <>
            <NavLink to={`/user/${user?.id}`} aria-label="User Profile">
              <Avatar
                size="sm"
                alt="User profile avatar"
                src={user?.photos[0]?.value}
              />
            </NavLink>

            <Form
              className={classes.loginForm}
              action="/api/logout"
              method="POST"
            >
              <Button
                type="submit"
                variant="transparent"
                color="var(--mantine-color-ytRed-6)"
              >
                Logout
              </Button>
            </Form>
          </>
        )}
      </Flex>
    )
  }

  return (
    <>
      <Group h="100%" w="100%" px="md" justify="space-between">
        <Link className={classes.logoLink} to="/">
          <Title className={classes.title} order={3}>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'ytRed', to: 'blue' }}
            >
              FE-Engineer.com
            </Text>
          </Title>
        </Link>

        {!mobile && menuLinks()}
        {mobile && (
          <>
            <Burger
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />
            <Drawer opened={opened} onClose={close} title="Navigation Menu">
              {menuLinks()}
            </Drawer>
          </>
        )}
      </Group>
    </>
  )
}

export default Navigation
