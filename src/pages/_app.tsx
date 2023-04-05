import type { AppProps } from 'next/app'
import ErrorBoundary from 'src/client/components/error'
import { ErrorBoundaryProvider } from 'src/client/contexts/error'
import 'src/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundaryProvider>
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </ErrorBoundaryProvider>
    )
}

export default MyApp