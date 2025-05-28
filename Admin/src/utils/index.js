import Router from 'next/router'

export const redirect = (res, target) => {
  if (res) {
    res.writeHead(302, { Location: target })
    res.end()
  } else {
    Router.push(target)
  }
}
