import React, { useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('access_token')

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1)
  const paramsInUrl = stringAfterHashtag.split('&')
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=')
    accumulator[key] = value
    return accumulator
  }, {})
  return paramsSplitUp
}

function App() {

  const [isLoading, setIsLoading ] = React.useState(true)
  useEffect(() => {
    if (window.location.hash) {
      console.log('here')
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.clear()
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('tokenType', token_type)
      localStorage.setItem('expires_in', expires_in)
      setIsLoading(false)
    }
  }, [])

  return !isLoading ? <Dashboard /> : <Login />
}

export default App
