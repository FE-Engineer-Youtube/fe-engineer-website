import { Stack, Text, Title } from '@mantine/core'
import classes from './splash.module.css'

const Splash = ({ title, message }: { title?: string; message?: string }) => {
  const displayText = {
    site: title ?? 'FE-Engineer.com',
    message: message ?? 'Wow, such empty...less empty than before though...',
  }
  return (
    <>
      <Stack align="center" justify="center" p="lg" pt={64} pb={128}>
        <Title order={1} className={classes.title} ta="center">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'ytRed', to: 'blue' }}
          >
            {displayText.site}
          </Text>
        </Title>
        <Text ta="center" size="lg" mt={32}>
          {displayText.message}
        </Text>
      </Stack>
    </>
  )
}

export default Splash
