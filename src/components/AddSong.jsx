import React, { useState } from 'react'
import Search from './Search'
import axios from 'axios'

const SongItem = ({ song, handleAddSong }) => {
  return (
    <li>
      <div>{song.name}</div>
      <div>
        <button onClick={() => handleAddSong(song)}>
          Add Song to Playlist
        </button>
      </div>
    </li>
  )
}

const AddSong = ({ playlistId, setAddSongDialog }) => {
  const [selectedSong, setSelectedSong] = useState(null)
  const [availableSongs, setAvailableSongs] = useState([])

  const handleAddSong = (song) => {
    console.log('playlist id', playlistId)
    console.log('song uri', song.uri)
    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        uris: `${song.uri}`,
      }),
    }
    // console.log(
    //   'post uri',
    //   `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${song.uri}`
    // )
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${song.uri}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log('add results', res)
    })
  }

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'lightcyan',
        left: '25%',
        top: '25%',
        width: '50vw',
        height: '50vh',
        border: '3px solid purple',
        borderRadius: '5px',
        // padding: "50px"
        display: 'grid',
        gridTemplateRows: '10% 10% 80% 10%',
        justifyContent: 'center',
        // alignItems: 'center'
        overflowY: 'scroll',
      }}
    >
      <div>
        <Search setAvailableSongs={setAvailableSongs} />
      </div>
      <div>
        Results
        {/* <SongItem handleAddSong={handleAddSong} /> */}
      </div>
      <div>
        {availableSongs.length > 0 &&
          availableSongs?.map((song) => (
            <SongItem song={song} handleAddSong={handleAddSong} />
          ))}
      </div>
      <div>
        <button onClick={() => setAddSongDialog(false)}>cancel</button>
      </div>
    </div>
  )
}

export default AddSong
