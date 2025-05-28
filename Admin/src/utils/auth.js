import Router from 'next/router'
import nextCookie from 'next-cookies'

const redirect = async (ctx, pathname, paths = []) => {
  if (ctx.req && ![...[pathname, '/_error', '/'], ...paths]?.includes(ctx.pathname)) {
    await ctx.res.writeHead(302, { Location: pathname })
    await ctx.res.end()
    return
  }
  if (![...[pathname, '/_error', '/'], ...paths]?.includes(ctx.pathname)) {
    Router.push(pathname)
  }
}
export const auth = async (ctx) => {
  const { token, lang } = nextCookie(ctx)

  if (token) {
    // const res = await request
    //   .post(
    //     "users/profile",
    //     {},
    //     {
    //       headers: { Authorization: `Bearer ${token || ""}` }
    //     }
    //   )
    //   .catch((_) => {
    //     console.log(_);
    //     redirect(ctx, "/auth");
    //   });
    // const client = new Client({
    //   success: (res) => {},
    //   error: (err) => {
    //     document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    //     document.cookie = 'token=auth; path=/'
    //     redirect(ctx, '/login')
    //   }
    // })
    // const makeRequest = new GetCaptchaRequestBuilder().build();
    // const makeRequest = {
    //   method: 'GET',
    //   url: `${process.env.USER_MANAGEMENT}/users`,
    //   data: {},
    //   config: {
    //     headers: { Authorization: `Bearer ${token || ''}` }
    //   }
    // }
    // const response = await client.execute(makeRequest);
  } else {
    redirect(ctx, '/login')
  }

  return { token, lang }
}
