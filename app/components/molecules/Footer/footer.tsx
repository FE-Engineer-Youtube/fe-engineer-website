import {
  Anchor,
  Container,
  Divider,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconBrandDiscord, IconBrandYoutube } from '@tabler/icons-react'
import classes from './footer.module.css'

const Footer = () => {
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

  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  return (
    <>
      <Divider mt="xl" pb="lg" />
      <footer>
        <Container pb="lg" size={1280}>
          <Group justify="space-between">
            <div></div>
            <Group>
              <Anchor
                className={classes.socialIcon}
                href="//www.youtube.com/@FE-Engineer"
                target="_blank"
                aria-label={
                  'FE-Engineer Youtube Channel - Link opens in new tab'
                }
              >
                <IconBrandYoutube color={'var(--mantine-color-dimmed)'} />
              </Anchor>
              <Anchor
                className={classes.socialIcon}
                href="//discord.gg/7Y7y7kYvdQ"
                target="_blank"
                aria-label={'FE-Engineer Discord - Link opens in new tab'}
              >
                <IconBrandDiscord />
              </Anchor>
            </Group>
          </Group>
          <Text
            c="dimmed"
            size="sm"
            mt="md"
            ta="center"
          >{`© ${new Date().getFullYear()} FE-Engineer All Rights Reserved.`}</Text>
        </Container>
      </footer>
    </>
  )
}

export default Footer
