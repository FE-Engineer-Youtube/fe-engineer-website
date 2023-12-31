const api_key = process.env.YT_API_KEY
const channel_id = process.env.YT_CHANNEL_ID

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
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${api_key}`
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
