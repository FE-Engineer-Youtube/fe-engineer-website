export const sixteenByNine = (width: number) => {
  return (width / 16) * 9
}

export const createSrcSet = (thumbnails: any) => {
  let srcSet: string[] = []
  Object.keys(thumbnails).forEach((item: any) => {
    srcSet.push(`${thumbnails[item].url} ${thumbnails[item].width}w`)
  })
  return srcSet.join()
}

// function for finding the position of an element in an array by the value of elements inside the array
export const findIndex = (data: any, idStr: string) => {
  return data.findIndex((item: any) => item.id === idStr)
}
