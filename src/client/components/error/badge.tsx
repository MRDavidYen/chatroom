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
        if (errorBoundaryContext.error) {
            receivedError(errorBoundaryContext.error)
        }
    }, [errorBoundaryContext.error])

    return (
        show ?
            <div className="fixed bottom-4 right-4 bg-red-600 text-red-50">
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