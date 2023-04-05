import { useContext, useEffect, useRef, useState } from "react"
import { ErrorBoundaryContext } from "src/client/contexts/error"

const ErrorBadge = ({ ...props }: ErrorBadgeProps) => {
    const errorBoundaryContext = useContext(ErrorBoundaryContext)

    const [show, setShow] = useState(false)
    const [error, setError] = useState<string>()

    const timeoutRef = useRef<NodeJS.Timeout>()

    const receivedError = (error: string) => {
        clearTimeout(timeoutRef.current!)
        setShow(true)
        setError(error)

        timeoutRef.current = setTimeout(() => {
            setShow(false)
            setError("")
        }, 3000)
    }

    useEffect(() => {
        if (props.message) {
            receivedError(props.message)
        }
    }, [props.message])

    useEffect(() => {
        receivedError(errorBoundaryContext.error.message)
    }, [errorBoundaryContext.error])

    return (
        show ?
            <div className="fixed bottom-4 right-4 bg-red-600 text-red-50 py-2 px-4 rounded-md max-w-[50vw]">
                <span className="font-bold">{error}</span>
            </div>
            : <></>
    )
}

type ErrorBadgeProps = {
    message: string
}

export type {
    ErrorBadgeProps
}

export default ErrorBadge