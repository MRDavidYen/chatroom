type CreateMemberRequest = {
    name: string
    email: string
    password: string
}

type CreateMemberResponse = {
    success: boolean
    message: string
}

export {
    CreateMemberRequest,
    CreateMemberResponse
}