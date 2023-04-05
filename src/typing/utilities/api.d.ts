type ApiEndpointProps = {
    method: string = "GET"
    path: string
    request?: RequestInit
}

export {
    ApiEndpointProps
}