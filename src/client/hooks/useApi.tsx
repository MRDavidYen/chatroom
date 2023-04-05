import { useCallback, useContext, useState } from "react";
import { ApiEndpointProps } from "src/typing/utilities/api";
import { ErrorBoundaryContext } from "../contexts/error";
import { fetchWithBody } from "../endpoints";

const useApi = (): UseApiReturnType => {
    const [fetchInProgress, setFetchInProgress] = useState(0)
    const errorBoundaryContext = useContext(ErrorBoundaryContext)

    const onProgress = fetchInProgress > 0

    const fetchApi = useCallback(async <TParam, TResult>(endpoint: ApiEndpointProps, body?: TParam): Promise<TResult | undefined> => {
        setFetchInProgress((prev) => prev + 1)

        const response = await fetchWithBody(endpoint.path, body, {
            method: endpoint.method,
            ...endpoint.request
        })

        setFetchInProgress((prev) => prev - 1)

        try {
            if (!response.ok) {
                const error = await response.json()

                if (error && error.message)
                    errorBoundaryContext.setError(error.message)

                return Promise.reject(error)
            }

            return await response.json()
        } catch (error: any) {
            errorBoundaryContext.setError(error.message)

            return Promise.reject(error)
        }
    }, [])

    return {
        fetchApi,
        onProgress
    }
}

type UseApiReturnType = {
    fetchApi: <TParam, TResult>(endpoint: ApiEndpointProps, body?: TParam) => Promise<TResult | undefined>
    onProgress: boolean
}

export type {
    UseApiReturnType
}

export default useApi