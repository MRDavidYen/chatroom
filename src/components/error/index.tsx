import React from "react";
import ErrorBadge from "./badge";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error: error })
    }

    render() {
        return (
            <>
                {this.props.children}
                <ErrorBadge message={this.state.error} />
            </>
        )
    }
}

type ErrorBoundaryProps = {
    children: React.ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
    error: any
}

export type {
    ErrorBoundaryProps,
    ErrorBoundaryState
}

export default ErrorBoundary