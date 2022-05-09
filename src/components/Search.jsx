import React from 'react'
import axios from 'axios'

const SPACE_DELIMITER = '%20'
const SEARCH_URL =
  'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2Bartist%3AMiles%2520Davis&type=track%2Cartist&market=ES&limit=10&offset=5'

// `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  }

const Search = ({ setAvailableSongs }) => {
  const [searchInput, setSearchInput] = React.useState('')

  const handleSearch = () => {
    const searchParams = searchInput.split(" ").join(SPACE_DELIMITER)
    console.log('searching...', searchParams)
    

    axios.get(`https://api.spotify.com/v1/search?q=${searchParams}&type=track%2Cartist&limit=10`, config).then(res=>{
      console.log('search results', res.data.tracks.items)
      setAvailableSongs(res.data.tracks.items)
    })
    // axios.get(`https://api.spotify.com/v1/search?q=${searchParams}&type=track%2Cartist&limit=10`).then(res=>console.log('search results', res))
  }
  return (
    <div>
      name: <input onChange={(e) => setSearchInput(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {/* {console.log(searchInput)} */}
      {/* search: {searchInput} */}
    </div>
  )
}

export default Search
