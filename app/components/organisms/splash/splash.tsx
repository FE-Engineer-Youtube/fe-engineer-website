import { Stack, Text, Title } from '@mantine/core'
import classes from './splash.module.css'

const Splash = () => {
  return (
    <>
      <Stack align="center" justify="center" p="lg" pt={64} pb={128}>
        <Title className={classes.title} ta="center">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'green', to: 'blue' }}
          >
            FE-Engineer.com
          </Text>
        </Title>
        <Text ta="center" size="lg" mt={32}>
          Wow, such empty...less empty than yesterday though...
        </Text>
      </Stack>
    </>
  )
}

export default Splash
