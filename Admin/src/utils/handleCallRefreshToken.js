// Next
import Router from 'next/router'
// Axios
import axios from 'axios'
// Helper
import { parseCookies } from 'utils/helpers'

const handleCallRefreshToken = ({ preResponse, preAxios }) => {
  const cookies = parseCookies()
  const body = {
    refreshToken: cookies?.refreshToken,
    clientId: process.env.CLIENT_ID
  }
  delete preResponse.config.headers.Authorization
  const config = { headers: preResponse.config.headers }
  return axios
    .post(
      `${process.env.BASE_URL}${process.env.USER_MANAGEMENT_PUBLIC}/user/refresh-token`,
      body,
      config
    )
    .then((response) => {
      const { refresh_token, access_token, expires_in, refresh_expires_in } = response.data
      document.cookie = `token=${access_token}; path=/; expires=${expires_in}`
      document.cookie = `refreshToken=${refresh_token}; path=/; expires=${refresh_expires_in}`
      preResponse.config.headers.Authorization = `Bearer ${response.data.access_token}`
      return preAxios(preResponse.config)
    })
    .catch(() => {
      Router.push('/login')
    })
}

export default handleCallRefreshToken
