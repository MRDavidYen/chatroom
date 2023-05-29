import { CookieSerializeOptions, serialize } from 'cookie'
import { NextApiResponse } from 'next'

const cookiesSettingsDefault: CookieSerializeOptions = {
  maxAge: 1200,
  path: '/',
  sameSite: 'lax',
  httpOnly: true,
}

const setCookie = (
  response: NextApiResponse,
  name: string,
  value: string,
  options?: CookieSerializeOptions
) => {
  response.setHeader(
    'Set-Cookie',
    serialize(name, value, {
      ...cookiesSettingsDefault,
      ...options,
    })
  )
}

const deleteCookie = (response: NextApiResponse, name: string) => {
  response.setHeader(
    'Set-Cookie',
    serialize(name, '', {
      maxAge: -1,
    })
  )
}

export { setCookie, deleteCookie }
