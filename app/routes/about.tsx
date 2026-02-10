import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  List,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core'
import {
  IconBrandYoutube,
  IconCode,
  IconExternalLink,
  IconList,
  IconServer,
  IconTool,
  IconVideo,
} from '@tabler/icons-react'
import type { LoaderFunction, MetaFunction } from 'react-router'
import { Link } from 'react-router'
import classes from '~/styles/root.styles.module.css'
import aboutClasses from '~/styles/about.module.css'
import { truncate } from '~/utils/utils'

export const meta: MetaFunction = () => {
  return [
    { title: 'About | FE-Engineer' },
    {
      name: 'description',
      content: truncate(
        'About FE-Engineer: practical frontend engineering, homelab infrastructure, and real-world guides for building reliable systems and useful tools.',
        157
      ),
    },
    {
      name: 'keywords',
      content: `About, FE Engineer, FE-Engineer, frontend engineering, homelab, infrastructure, React, practical guides`,
    },
  ]
}

export const loader: LoaderFunction = async () => {
  return {}
}

export const handle = {
  breadcrumb: () => (
    <Link className={classes.breadcrumbLink} to="/about">
      About
    </Link>
  ),
  schema: {
    about: 'person',
    mainEntity: 'person',
    name: 'About FE-Engineer',
  },
}

const displayText = {
  title: 'About FE-Engineer',
  intro:
    'FE-Engineer is a practical engineering channel and site focused on building reliable systems at home and shipping useful software in the real world.',
  whatForTitle: 'What fe-engineer.com is for',
  whatFor:
    "This site is where I collect the work that supports the channel: notes, walkthroughs, and projects that sit at the intersection of frontend engineering, infrastructure, and \"make it work\" problem-solving. The goal is to share approaches that are understandable, repeatable, and grounded in what I'm actually running.",
  findHereTitle: "What you'll find here",
  frontendBullet:
    'Frontend engineering: UI and application patterns with React, routing/data-loading patterns, and the kinds of tradeoffs you run into on production apps.',
  homelabBullet:
    'Homelab + infrastructure: self-hosted services, monitoring, networking basics, and AI/hardware-focused builds (especially AMD + ROCm workflows).',
  toolingBullet:
    'Practical tooling: automation and systems that reduce manual work and make day-to-day coordination easier.',
  aboutAuthorTitle: 'About FE-Engineer',
  aboutAuthor:
    "I'm a software engineer with 13+ years of experience. My background is primarily frontend, but I work full-stack and have helped build and launch large-scale products and complex applications (including as a founding engineer at a startup). I also served in the U.S. Air Force for six years.",
  productWorkTitle: 'Product work: ComingUp Today',
  bridgeSentence:
    'That same mindset shows up in the products I choose to build.',
  comingUpLead:
    "One example of the kind of practical problem-solving I like to build is ComingUp Today. It started as a household need: a calm, shared view of what's coming up for multiple people across multiple calendars—without the constant \"what's on your schedule?\" back-and-forth.",
  comingUpNotReplacement:
    "ComingUp Today is not a replacement for Google Calendar. It's a read-only, unified view that helps households and small groups coordinate by seeing upcoming events across people and calendars in one place, with explicit visibility controls.",
  comingUpTighten:
    "It's especially useful in situations where multiple people need awareness of upcoming events without introducing the coordination problems that come with shared editing.",
  comingUpCta:
    "If you're curious, you can read more about it at ",
  comingUpLinkText: 'comingup.today',
  comingUpUrl: 'https://www.comingup.today/',
  comingUpClose:
    "If you want the technical and infrastructure side of how I approach building systems and products, that's what fe-engineer.com and the channel are for.",
  elsewhereTitle: 'Where to follow',
  youtubeLabel: 'YouTube',
  youtubeUrl: 'https://www.youtube.com/@FE-Engineer',
  handle: '@FE-Engineer',
}

const featureCards = [
  {
    icon: IconCode,
    title: 'Frontend engineering',
    description: displayText.frontendBullet,
  },
  {
    icon: IconServer,
    title: 'Homelab + infrastructure',
    description: displayText.homelabBullet,
  },
  {
    icon: IconTool,
    title: 'Practical tooling',
    description: displayText.toolingBullet,
  },
]

export default function About() {
  return (
    <Stack gap="xl" mt={64} pb="xl">
        <Title order={1}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'ytRed', to: 'blue' }}
          >
            {displayText.title}
          </Text>
        </Title>

        {/* Hero */}
        <Paper withBorder radius="lg" p="xl">
          <Group gap="xs" mb="md">
            <Badge variant="light" size="sm">
              Homelab
            </Badge>
            <Badge variant="light" size="sm">
              Software engineering
            </Badge>
            <Badge variant="light" size="sm">
              Local AI
            </Badge>
            <Badge variant="light" size="sm">
              AMD/ROCm
            </Badge>
          </Group>
          <Text fz="lg" c="dimmed" maw={720} mb="lg">
            {displayText.intro}
          </Text>
          <Group wrap="wrap" gap="sm">
            <Button
              component={Link}
              to="/videos"
              variant="filled"
              color="ytRed"
              leftSection={<IconVideo size={18} />}
            >
              Videos
            </Button>
            <Button
              component={Link}
              to="/playlist"
              variant="light"
              leftSection={<IconList size={18} />}
            >
              Playlists
            </Button>
            <Button
              component="a"
              href={displayText.comingUpUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              leftSection={<IconExternalLink size={18} />}
            >
              ComingUp Today
            </Button>
          </Group>
        </Paper>

        <Divider my="xl" />

        {/* What fe-engineer.com is for */}
        <Title order={2}>{displayText.whatForTitle}</Title>
        <Text size="md">{displayText.whatFor}</Text>

        <Divider my="xl" />

        {/* Feature cards */}
        <Title order={2}>{displayText.findHereTitle}</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <UnstyledButton
              key={title}
              className={aboutClasses.featureCardWrap}
            >
              <Card
                withBorder
                radius="lg"
                p="lg"
                className={aboutClasses.featureCard}
              >
                <ThemeIcon variant="light" radius="md" size="lg" mb="sm">
                  <Icon size={20} />
                </ThemeIcon>
                <Text fw={600} mb="xs">
                  {title}
                </Text>
                <Text
                  size="sm"
                  c="dimmed"
                  className={aboutClasses.featureCardDescription}
                >
                  {description}
                </Text>
              </Card>
            </UnstyledButton>
          ))}
        </SimpleGrid>

        <Divider my="xl" />

        {/* Profile block */}
        <Title order={2}>{displayText.aboutAuthorTitle}</Title>
        <Card withBorder radius="lg" p="xl">
          <Group align="flex-start" wrap="nowrap" gap="lg" mb="md">
            <Avatar
              src="/images/fe-engineer.png"
              radius="xl"
              size="xl"
              alt="FE-Engineer"
            >
              FE
            </Avatar>
            <div>
              <Text fw={600} size="lg">
                FE-Engineer
              </Text>
              <Text size="sm" c="dimmed">
                Software engineer · homelab · infrastructure
              </Text>
              <Group gap="xs" mt="xs">
                <Badge variant="light" size="sm">
                  13+ years
                </Badge>
                <Badge variant="light" size="sm">
                  Full-stack
                </Badge>
                <Badge variant="light" size="sm">
                  USAF (6 yrs)
                </Badge>
              </Group>
            </div>
          </Group>
          <List size="sm" spacing="xs" mb="md">
            <List.Item
              icon={
                <ThemeIcon variant="light" radius="sm" size="sm">
                  <IconCode size={14} />
                </ThemeIcon>
              }
            >
              Frontend-first, full-stack experience
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon variant="light" radius="sm" size="sm">
                  <IconServer size={14} />
                </ThemeIcon>
              }
            >
              Founding engineer at startup
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon variant="light" radius="sm" size="sm">
                  <IconTool size={14} />
                </ThemeIcon>
              }
            >
              U.S. Air Force, 6 years
            </List.Item>
          </List>
          <Text size="md" maw={720}>
            {displayText.aboutAuthor}
          </Text>
        </Card>

        <Divider my="xl" />

        {/* ComingUp Today panel */}
        <Title order={2}>{displayText.productWorkTitle}</Title>
        <Text size="md" maw={720} mb="md">
          {displayText.bridgeSentence}
        </Text>
        <Paper withBorder radius="lg" p="xl" variant="subtle">
          <Group justify="space-between" wrap="wrap" mb="md">
            <Text fw={600} size="lg">
              ComingUp Today
            </Text>
            <Group gap="xs">
              <Badge variant="light" size="sm">
                Product
              </Badge>
              <Button
                component="a"
                href={displayText.comingUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="xs"
                rightSection={<IconExternalLink size={14} />}
              >
                Visit
              </Button>
            </Group>
          </Group>
          <List size="sm" spacing="xs" mb="md">
            <List.Item>Read-only, unified view across calendars</List.Item>
            <List.Item>
              Visibility controls for households and small groups
            </List.Item>
            <List.Item>
              Coordination without shared-editing complexity
            </List.Item>
          </List>
          <Text size="md" mb="md">
            {displayText.comingUpCta}
            <Anchor
              href={displayText.comingUpUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="ytRed"
            >
              {displayText.comingUpLinkText}
            </Anchor>
            .
          </Text>
          <Spoiler
            maxHeight={0}
            showLabel="Read more"
            hideLabel="Show less"
            styles={{ control: { marginTop: 8 } }}
          >
            <Text size="md" mb="xs">
              {displayText.comingUpLead}
            </Text>
            <Text size="md" mb="xs">
              {displayText.comingUpNotReplacement} {displayText.comingUpTighten}
            </Text>
            <Text size="md">{displayText.comingUpClose}</Text>
          </Spoiler>
        </Paper>

        <Divider my="xl" />

        {/* Follow strip */}
        <Paper withBorder radius="lg" p="md">
          <Group justify="space-between" wrap="wrap" gap="md">
            <div>
              <Title order={3} mb={4}>
                {displayText.elsewhereTitle}
              </Title>
              <Text size="sm" c="dimmed">
                {displayText.handle}
              </Text>
            </div>
            <Group gap="sm">
              <Button
                component="a"
                href={displayText.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="ytRed"
                leftSection={<IconBrandYoutube size={18} />}
              >
                {displayText.youtubeLabel}
              </Button>
              <Button
                component={Link}
                to="/videos"
                variant="subtle"
                size="sm"
                leftSection={<IconVideo size={16} />}
              >
                Videos
              </Button>
              <Button
                component={Link}
                to="/playlist"
                variant="subtle"
                size="sm"
                leftSection={<IconList size={16} />}
              >
                Playlists
              </Button>
            </Group>
          </Group>
        </Paper>
      </Stack>
  )
}
