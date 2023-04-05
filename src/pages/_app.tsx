import type { AppProps } from 'next/app'
import ErrorBoundary from 'src/components/error'
import 'src/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    )
}

export default MyApp