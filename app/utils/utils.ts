export const sixteenByNine = (width: number) => {
  return (width / 16) * 9
}

export const createSrcSet = (thumbnails: any) => {
  let srcSet: string[] = []
  Object.keys(thumbnails).forEach((item: any) => {
    if (thumbnails[item].width < 700) {
      srcSet.push(`${thumbnails[item].url} ${thumbnails[item].width}w`)
    }
  })
  return srcSet.join()
}

// function for finding the position of an element in an array by the value of elements inside the array
export const findIndex = (
  data: any,
  idStr: string,
  key?: string,
  searchSnippet?: boolean
) => {
  return data.findIndex((item: any) => {
    if (!searchSnippet && !key) {
      return item.id === idStr
    } else if (key && searchSnippet) {
      return item.snippet[key] === idStr
    } else if (key) {
      return item[key] === idStr
    }
  })
}

export const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  }
  return str
}

export const truncateTitleLength = (str: string) => {
  return 70 - str.length
}
