import { Button, Group } from '@mantine/core'
import { Link } from 'react-router'
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
        data-disabled={!prev}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page - 1}&pageToken=${prev}`}
        onClick={(event) => (!prev ? event.preventDefault() : null)}
      >
        <IconArrowLeft />
      </Button>

      <Button
        aria-label={'Go to next page'}
        data-disabled={!next}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page + 1}&pageToken=${next}`}
        onClick={(event) => (!next ? event.preventDefault() : null)}
      >
        <IconArrowRight />
      </Button>
    </Group>
  )
}

export default Pagination
