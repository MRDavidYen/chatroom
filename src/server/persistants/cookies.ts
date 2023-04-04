import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiResponse } from "next";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

const cookiesSettingsDefault: CookieSerializeOptions = {
    maxAge: 1200,
    path: '/',
    sameSite: 'lax'
}

const setCookie = (response: NextApiResponse, name: string, value: string, options?: CookieSerializeOptions) => {
    response.setHeader('Set-Cookie', serialize(name, value, {
        ...cookiesSettingsDefault,
        ...options
    }))
}

const deleteCookie = (response: NextApiResponse, name: string) => {
    response.setHeader('Set-Cookie', serialize(name, '', {
        maxAge: -1
    }))
}

export {
    setCookie,
    deleteCookie
}