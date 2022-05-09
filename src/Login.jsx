import React from 'react'

// 'https://accounts.spotify.com/authorize?client_id=3a0c4990d7914b19aee1e53dcf474535&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
// http://localhost:3000/#access_token=BQDCXIRtnURMcaESwmivGuRVVS4zAFENGzLogyioE_udsdYDQxyqKk4FpV-N-Q6FqtqYFOiIiZdot2T_OzjP8Ku96X-xHtoonMYGphD9J87l3Urzdbyr4d1E7prU6YwPDIxIeHwM95yu8pmXAozFQny_0aNIGLVlpwTgQLoZSYkYaRC9Qz4TwEwO3TiG3jJel3NH87MquQZfLxyUVg&token_type=Bearer&expires_in=3600

const CLIENT_ID = '3a0c4990d7914b19aee1e53dcf474535'
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000'
const SPACE_DELIMITER = '%20'
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'playlist-modify-public',
]
// const SCOPES = [ 'playlist-modify-public']
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

export default function Login() {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={handleLogin}>Login to spotify</button>
    </div>
  )
}
