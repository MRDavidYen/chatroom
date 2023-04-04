const defaultRequestInit: RequestInit = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
}

const fetchWithBody = async <T,>(url: string,
    body: T,
    requestInit?: RequestInit) => {
    return await fetch(url, {
        ...defaultRequestInit,
        ...requestInit,
        body: JSON.stringify(body)
    })
}

async function* fetchSSE<T, R>(url: string, body: T, abort: AbortController, method: string = "POST"): AsyncGenerator<R> {
    const response = await fetchWithBody(url, body, {
        method,
        signal: abort.signal
    })

    const reader = response.body?.getReader()

    if (!reader) {
        throw new Error('Could not get reader from response body')
    }

    let decoder = new TextDecoder("utf-8")
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read()

        if (done) {
            break
        }

        if (value) {
            buffer += decoder.decode(value)

            const lines = buffer.split('\n').filter(line => line.trim() !== '')

            for (const line of lines) {
                const message = line.replace(/^data: /, '')
                if (message === '[DONE]') {
                    return
                }
                try {
                    const parsed = JSON.parse(message) as R
                    yield parsed
                } catch (error) {
                    console.error('Could not JSON parse stream message', message, error)
                    return
                }
            }

            buffer = ''
        }
    }
}

export {
    fetchWithBody,
    fetchSSE
}