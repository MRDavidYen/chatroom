const fetchWithBody = async <T,>(url: string, body: T, method: string = "POST") => {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export {
    fetchWithBody
}