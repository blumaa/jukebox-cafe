import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddSong from './components/AddSong'

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  // const [jukeboxPlaylistId, setJukeboxPlaylistId] = useState(null)
  const [hasCheckedForExistingPlaylist, setHasCheckedForExistingPlaylist] =
    useState(false)
  const [userId, setUserId] = useState(null)
  const [playlistAlreadyExists, setPlaylistAlreadyExists] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState(null)
  const [ addSongDialog, setAddSongDialog] = useState(true)

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  }

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me', config)
      .then((res) => setUserId(res.data.id))
  }, [])

  useEffect(() => {
    if (!hasCheckedForExistingPlaylist && userId) {
      axios.get(PLAYLISTS_ENDPOINT, config).then((res) => {
        // console.log('playlist check axios res', res)
        // console.log(
        //   'found playlist?',
        //   res.data.items.filter((pl) => pl.name === 'JukeboxCafePlaylist')
        //     .length > 0
        // )
        if (
          res.data.items.filter((pl) => pl.name === 'JukeboxCafePlaylist')
            .length > 0
        ) {
          const pl = res.data.items.filter(
            (pl) => pl.name === 'JukeboxCafePlaylist'
          )
          setPlaylistAlreadyExists(true)
          setCurrentPlaylist(pl[0])
          setIsLoading(false)
        } else {
          setHasCheckedForExistingPlaylist(true)
        }
      })
    }
  }, [userId, hasCheckedForExistingPlaylist])

  useEffect(() => {
    // console.log('userId', userId)
    // console.log('currentPlaylist', currentPlaylist)
    // console.log('playlist Already exists?', playlistAlreadyExists)
    // console.log('hasCheckedForExistingPlaylist', hasCheckedForExistingPlaylist)
    // console.log(
    //   'able to create playlist?',
    //   !playlistAlreadyExists && hasCheckedForExistingPlaylist
    // )

    if (!playlistAlreadyExists && hasCheckedForExistingPlaylist && userId) {
      // console.log('creating playlist')
      axios('https://api.spotify.com/v1/users/' + userId + '/playlists', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          name: 'JukeboxCafePlaylist',
          description: 'this is a playlist to which users can add songs',
        }),
      }).then((res) => {
        // console.log('posted playlist res', res)
        setCurrentPlaylist(res.data)
        setIsLoading(false)
      })
    }
  }, [userId, hasCheckedForExistingPlaylist])

  return !isLoading ? (
    <div
      style={{
        display: 'grid',
        height: '100vh',
        zIndex: 0,
        position: 'relative',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // border: '1px solid yellow',
        gridTemplateRows: '20% 70% 10%',
      }}
    >
      {console.log('current playlist', currentPlaylist)}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>current playing song</div>
        <div>{currentPlaylist?.name}</div>
      </div>
      <div
        style={
          {
            border: '1px solid red',
          }
        }
      >
        playlist tracks
      </div>
      <div>
        <button onClick={()=>setAddSongDialog(!addSongDialog)}>add song</button>
      </div>
      {addSongDialog && (<AddSong setAddSongDialog={setAddSongDialog} playlistId={currentPlaylist.id}/>)}
    </div>
  ) : (
    <div>loading...</div>
  )
}
export default Dashboard
