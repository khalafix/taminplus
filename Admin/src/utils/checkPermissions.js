import { parseCookies } from 'utils/helpers'

const CheckPermissions = ({ children, permissions }) => {
  /// list permissionsUser
  const permissionsUser = [...['DEFAULT'], ...(parseCookies()?.permissions?.split(',') || [])]

  if (permissions?.length > 0) {
    if (permissionsUser?.filter((x) => permissions.includes(x)).length !== 0) {
      return children
    } else {
      return null
    }
  } else {
    return children
  }
}
export default CheckPermissions
