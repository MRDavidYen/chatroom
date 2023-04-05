import { useEffect, useRef, useState } from "react"

const ErrorBadge = ({ ...props }: ErrorBadgeProps) => {
    const [show, setShow] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        clearTimeout(timeoutRef.current!)

        setShow(true)

        timeoutRef.current = setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [props.message])

    return (
        show ?
            <div className="fixed bottom-4 right-4 bg-red-600 text-red-50">
                <span className="font-bold">{props.message}</span>
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