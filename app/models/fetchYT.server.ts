const api_key = process.env.YT_API_KEY
const channel_id = process.env.YT_CHANNEL_ID

export async function getRecentVideos(number: number) {
  try {
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel_id}&maxResults=${number}&order=date&type=video&key=${api_key}`
    )
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
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2Csnippet&channelId=${channel_id}&maxResults=100&key=${api_key}`
    )
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getPlayListItems(playlistId: string) {
  try {
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${api_key}`
    )
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}
