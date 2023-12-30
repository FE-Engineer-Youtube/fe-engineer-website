import { Card, Text, Title } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { sixteenByNine } from '~/utils/utils'
import classes from './PlayListCard.module.css'

const PlayListCard = ({ data }: any) => {
  const thumbnails = data.snippet.thumbnails
  // const [height, setHeight] = useState(0)
  const [ref, rect] = useResizeObserver()

  // useEffect(() => {
  //   if (rect.width !== undefined) {
  //     setHeight((rect.width / 16) * 9)
  //   } else {
  //     setHeight(0)
  //   }
  // }, [rect])

  return (
    <>
      <Card className={classes.card} p={32}>
        {/* <Link className={classes.link} to={`/playlist/${data.id}`}> */}
        <Title className={classes.title} order={2} ta="center" mb="xl">
          {data?.snippet?.title || 'Playlist Title'}
        </Title>

        <img
          className={classes.image}
          ref={ref}
          style={{ height: sixteenByNine(rect.width), objectFit: 'cover' }}
          src={thumbnails.default.url}
          srcSet={`${thumbnails.medium.url} 480w, ${thumbnails.standard.url} 640w`}
          alt=""
        />
        <Text ta="center" size="md" mx="auto" mt="xl">
          {data?.snippet?.description || 'Playlist description'}
        </Text>
        {`id = ${data?.id}`}
        {/* </Link> */}
      </Card>
    </>
  )
}

export default PlayListCard
