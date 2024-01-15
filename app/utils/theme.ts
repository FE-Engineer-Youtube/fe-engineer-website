import type { MantineColorsTuple } from '@mantine/core'
import { createTheme } from '@mantine/core'

const ytRed: MantineColorsTuple = [
  '#ffe8e8',
  '#ffcfcf',
  '#ff9b9c',
  '#ff6464',
  '#fe3837',
  '#fe1b19',
  '#ff0909',
  '#e40000',
  '#cb0000',
  '#b10000',
]

export const theme = createTheme({
  colors: {
    ytRed,
  },
  fontFamily: 'Open Sans, sans-serif',
  fontFamilyMonospace: 'Inconsolata, monospace',
  headings: {
    fontFamily: 'Roboto, serif',
  },
})
