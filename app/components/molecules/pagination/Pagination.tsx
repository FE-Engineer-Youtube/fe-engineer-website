import { Button, Group } from '@mantine/core'
import { Link } from '@remix-run/react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

const Pagination = ({ page, prev, next }: any) => {
  return (
    <Group
      w="100%"
      justify="center"
      mb="md"
      mt="md"
      aria-label={`Pagination controls: you are currently on page ${page}`}
    >
      <Button
        aria-label={'Go to previous page'}
        disabled={!prev}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page - 1}&pageToken=${prev}`}
      >
        <IconArrowLeft />
      </Button>

      <Button
        aria-label={'Go to next page'}
        disabled={!next}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page + 1}&pageToken=${next}`}
      >
        <IconArrowRight />
      </Button>
    </Group>
  )
}

export default Pagination
