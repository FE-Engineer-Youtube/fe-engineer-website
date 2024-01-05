import dotenv from 'dotenv'

dotenv.config()

const api_key = process?.env?.YT_API_KEY || 'api-key'
const channel_id = process?.env?.YT_CHANNEL_ID || 'channel-id'

const transformActivitiesData = (activities: any) => {
  let data: any = []
  activities?.items?.map((item: any) => {
    // console.log('inside activities loop')
    // console.log(item?.contentDetails?.upload?.videoId)
    if (item?.contentDetails?.upload?.videoId && data.length < 2) {
      // console.log('inside if with item:', item)
      data.push(item)
    }
  })
  return data
}
export async function getHPVideos() {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${channel_id}&maxResults=10&key=${api_key}`
    console.log('hitting api getHPVideos at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()

    // transform to remove any activities that are not uploads
    const trimmedData = transformActivitiesData(data)
    console.log(trimmedData)
    return trimmedData
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getRecentVideos(number: number) {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel_id}&maxResults=${number}&order=date&type=video&key=${api_key}`
    console.log('hitting api getRecentVideos at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getPlayLists() {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2Csnippet&channelId=${channel_id}&maxResults=100&key=${api_key}`
    console.log('hitting api getPlayLists at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getPlayListItems(playlistId: string) {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${api_key}`
    console.log('hitting api getPlayListItems at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getVideo(videoId: string) {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`
    console.log('hitting api getVideo at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getAllVideos(results: number, pageToken?: string | null) {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel_id}&${
      pageToken ? `pageToken=${pageToken}&` : ''
    }order=date&maxResults=${results}&type=video&key=${api_key}`
    console.log('hitting api getAllVideos at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getChannelDetails() {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings%2CtopicDetails&id=${channel_id}&key=${api_key}`
    console.log('hitting api getChannelDetails at: ', url)
    let res = await fetch(url)
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}
