import type { AppProps } from 'next/app'
import ErrorBoundary from 'src/client/components/error'
import Layout from 'src/client/components/layout'
import { ErrorBoundaryProvider } from 'src/client/contexts/error'
import 'src/styles/globals.css'
import 'highlight.js/styles/github-dark.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundaryProvider>
            <ErrorBoundary>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ErrorBoundary>
        </ErrorBoundaryProvider>
    )
}

export default MyApp