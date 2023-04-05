import { createContext, useState } from "react";
import { generateRandomId } from "src/client/libs/text";

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
    error: {
        message: "",
        identifier: ""
    },
    setError: () => { }
})

const ErrorBoundaryProvider = ({ ...props }: ErrorBoundaryContextProperties) => {
    const [error, setError] = useState<ErrorProperties>({
        message: "",
        identifier: ""
    })

    const setErrorWrapper = (message: string) => {
        setError({
            message,
            identifier: generateRandomId()
        })
    }

    return (
        <ErrorBoundaryContext.Provider value={{
            error,
            setError: setErrorWrapper
        }}>
            {props.children}
        </ErrorBoundaryContext.Provider>
    )
}

type ErrorProperties = {
    message: string
    identifier: string
}

type ErrorBoundaryContextType = {
    error: ErrorProperties
    setError: (error: string) => void
}

type ErrorBoundaryContextProperties = {
    children: JSX.Element
}

export type {
    ErrorBoundaryContextType,
    ErrorBoundaryContextProperties
}

export {
    ErrorBoundaryProvider,
    ErrorBoundaryContext
}