import { createContext, useState } from "react";

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
    error: "",
    setError: () => { }
})

const ErrorBoundaryProvider = ({ ...props }: ErrorBoundaryContextProperties) => {
    const [error, setError] = useState<string>("")

    return (
        <ErrorBoundaryContext.Provider value={{
            error,
            setError
        }}>
            {props.children}
        </ErrorBoundaryContext.Provider>
    )
}

type ErrorBoundaryContextType = {
    error: string
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