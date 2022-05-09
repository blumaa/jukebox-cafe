import React from 'react'
import axios from 'axios'

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/4Z0MX9JsNSPci1MTuVo2xs'

const SpotifyGetPlaylist = () => {
  const [token, setToken] = React.useState('')
  const [data, setData] = React.useState({})
  const [title, setTitle] = React.useState(null)

  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'))
    }
  }, [])

  const handleGetPlaylists = () => {
    // console.log('token', token)
    // console.log('Bearer ' + token)
    axios
      .get(PLAYLIST_ENDPOINT, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('res', res.data)
        // setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='GetPlaylistWrapper'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={handleGetPlaylists}>Get Playlist</button>
      </div>
      {/* <div> */}
      {/*   {console.log('data', data)} */}
      {/* </div> */}
      <ul>
        {data?.items && data.items.map((item) => <li>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default SpotifyGetPlaylist
