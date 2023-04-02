import { CookieSerializeOptions } from "cookie";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

const cookiesSettingsDefault: CookieSerializeOptions = {
    maxAge: 1200,
    path: '/',
    sameSite: 'lax'
}

const setCookie = (response: NextResponse, name: string, value: string, options?: CookieSerializeOptions) => {
    response.cookies.set(name, value,
        {
            ...cookiesSettingsDefault,
            ...options
        })
}

export {
    setCookie
}