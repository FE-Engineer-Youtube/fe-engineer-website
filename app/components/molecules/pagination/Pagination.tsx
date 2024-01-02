import { Button, Group, Text } from '@mantine/core'
import { Link } from '@remix-run/react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

const Pagination = ({ pagination, page, videosData, paginationTotal }: any) => {
  return (
    <Group
      w="100%"
      justify="center"
      mb="md"
      mt="md"
      aria-label={`Pagination controls: currently on page ${page} of ${paginationTotal}`}
    >
      <Button
        aria-label={'Previous'}
        disabled={page === 1}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page - 1}&pageToken=${videosData?.prevPageToken}`}
      >
        <IconArrowLeft />
      </Button>
      {pagination.range.length > 0 &&
        pagination.range.map((item: any, index: number) => {
          if (typeof item === 'number') {
            return (
              <Button
                aria-label={`pagination indicator for page ${item}`}
                key={`${item}-${index}`}
                size={page === item ? 'sm' : 'xs'}
                disabled
                style={{
                  color: page === item ? 'var(--mantine-color-ytRed-text)' : '',
                }}
              >
                {item}
              </Button>
            )
          }
          if (typeof item === 'string') {
            return (
              <Text
                aria-label={
                  'pagination indicator showing there are more pages than are currently being shown.'
                }
              >
                {'. . .'}
              </Text>
            )
          }
        })}
      <Button
        aria-label={'Next'}
        disabled={page === paginationTotal}
        color="ytRed"
        size="xs"
        component={Link}
        to={`/videos?page=${page + 1}&pageToken=${videosData?.nextPageToken}`}
      >
        <IconArrowRight />
      </Button>
    </Group>
  )
}

export default Pagination
